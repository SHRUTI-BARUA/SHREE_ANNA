import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, BarChart3, Loader2, Sparkles } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Types
interface MarketPrice {
    date: string;
    millet_type: string;
    price_per_quintal: number;
    market_name: string;
}

interface Product {
    id: string;
    millet_type: string;
}

interface Prediction {
    millet_type: string;
    current_price: number;
    predicted_price_30days: number;
    predicted_price_60days: number;
    predicted_price_90days: number;
    trend: string;
}

interface MarketAnalysis {
    overall_trend: string;
    key_factors: string[];
    farmer_recommendations: string[];
    buyer_recommendations: string[];
}

interface PredictionResult {
    predictions: Prediction[];
    market_analysis: MarketAnalysis;
}

export default function MarketInsights() {
    const [selectedMillet, setSelectedMillet] = useState<string>("all");
    const [isGeneratingPrediction, setIsGeneratingPrediction] = useState<boolean>(false);
    const [prediction, setPrediction] = useState<PredictionResult | null>(null);

    // Mock fetch functions instead of base44
    const { data: marketPrices = [] } = useQuery<MarketPrice[]>({
        queryKey: ["market-prices"],
        queryFn: async () => [
            { date: "2025-11-01", millet_type: "foxtail_millet", price_per_quintal: 2500, market_name: "Bokaro" },
            { date: "2025-11-02", millet_type: "pearl_millet", price_per_quintal: 2200, market_name: "Patna" },
            { date: "2025-11-03", millet_type: "finger_millet", price_per_quintal: 2100, market_name: "Ranchi" },
            { date: "2025-11-04", millet_type: "little_millet", price_per_quintal: 2300, market_name: "Gaya" },
        ],
    });

    const { data: products = [] } = useQuery<Product[]>({
        queryKey: ["all-products"],
        queryFn: async () => [
            { id: "p1", millet_type: "foxtail_millet" },
            { id: "p2", millet_type: "pearl_millet" },
            { id: "p3", millet_type: "finger_millet" },
            { id: "p4", millet_type: "little_millet" },
        ],
    });

    const generatePricePrediction = async () => {
        setIsGeneratingPrediction(true);

        try {
            // Mock AI prediction result
            const result: PredictionResult = {
                predictions: [
                    {
                        millet_type: "foxtail_millet",
                        current_price: 2500,
                        predicted_price_30days: 2550,
                        predicted_price_60days: 2600,
                        predicted_price_90days: 2650,
                        trend: "upward",
                    },
                    {
                        millet_type: "pearl_millet",
                        current_price: 2200,
                        predicted_price_30days: 2250,
                        predicted_price_60days: 2300,
                        predicted_price_90days: 2350,
                        trend: "upward",
                    },
                ],
                market_analysis: {
                    overall_trend: "Prices expected to rise steadily over next 3 months",
                    key_factors: ["Seasonal patterns", "Government policy support", "Rising health awareness"],
                    farmer_recommendations: ["Increase storage capacity", "Monitor market demand"],
                    buyer_recommendations: ["Plan bulk purchase early", "Diversify millet types"],
                },
            };

            setPrediction(result);
        } catch (err) {
            console.error("Error generating prediction:", err);
            alert("Error generating prediction");
        } finally {
            setIsGeneratingPrediction(false);
        }
    };

    const filteredPrices = selectedMillet === "all" ? marketPrices : marketPrices.filter(p => p.millet_type === selectedMillet);

    const chartData = filteredPrices.slice(0, 30).reverse().map(p => ({
        date: new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        price: p.price_per_quintal,
    }));

    const avgPrice = filteredPrices.length > 0
        ? (filteredPrices.reduce((sum, p) => sum + p.price_per_quintal, 0) / filteredPrices.length).toFixed(2)
        : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Market Insights & Price Predictions</h1>
                    <p className="text-gray-600">AI-powered market analysis and price forecasting</p>
                </div>

                {/* Controls */}
                <Card className="mb-8 shadow-lg">
                    <CardContent className="p-6 flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-2">Select Millet Type</label>
                            <Select value={selectedMillet} onValueChange={setSelectedMillet}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Millets</SelectItem>
                                    <SelectItem value="foxtail_millet">Foxtail Millet</SelectItem>
                                    <SelectItem value="pearl_millet">Pearl Millet</SelectItem>
                                    <SelectItem value="finger_millet">Finger Millet</SelectItem>
                                    <SelectItem value="little_millet">Little Millet</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            onClick={generatePricePrediction}
                            disabled={isGeneratingPrediction}
                            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                        >
                            {isGeneratingPrediction ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4 mr-2" /> Generate AI Prediction
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Average Price</p>
                                <p className="text-2xl font-bold">₹{avgPrice}</p>
                                <p className="text-xs text-gray-500">per quintal</p>
                            </div>
                            <BarChart3 className="w-10 h-10 text-blue-500" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Market Trend</p>
                                <p className="text-2xl font-bold text-green-600">Upward</p>
                                <p className="text-xs text-gray-500">+8.5% this month</p>
                            </div>
                            <TrendingUp className="w-10 h-10 text-green-500" />
                        </CardContent>
                    </Card>
                </div>

                {/* Price Chart */}
                <Card className="mb-8 shadow-lg">
                    <CardHeader>
                        <CardTitle>Price Trends (Last 30 Days)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="price" stroke="#f59e0b" strokeWidth={2} name="Price (₹/quintal)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* AI Predictions */}
                {prediction && (
                    <>
                        <Card className="mb-8 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-purple-600" />
                                    AI Price Predictions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {prediction.predictions?.map((pred, index) => (
                                        <Card key={index}>
                                            <CardContent className="p-4">
                                                <h3 className="font-semibold mb-3">{pred.millet_type.replace(/_/g, " ")}</h3>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Current:</span>
                                                        <span className="font-bold">₹{pred.current_price}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">30 days:</span>
                                                        <span className="font-bold text-blue-600">₹{pred.predicted_price_30days}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">60 days:</span>
                                                        <span className="font-bold text-purple-600">₹{pred.predicted_price_60days}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">90 days:</span>
                                                        <span className="font-bold text-pink-600">₹{pred.predicted_price_90days}</span>
                                                    </div>
                                                    <div className="pt-2 border-t">
                                                        <span className="text-gray-600">Trend: </span>
                                                        <span className={`font-semibold ${pred.trend === "upward" ? "text-green-600" : "text-red-600"}`}>
                                                            {pred.trend}
                                                        </span>

                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>Market Analysis & Recommendations</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold mb-2">Overall Trend</h3>
                                        <p className="text-gray-700">{prediction.market_analysis?.overall_trend}</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold mb-2">Key Factors</h3>
                                        <ul className="space-y-1">
                                            {prediction.market_analysis?.key_factors?.map((factor, i) => (
                                                <li key={i} className="text-gray-700 flex items-start gap-2">
                                                    <span className="text-amber-600">•</span>
                                                    <span>{factor}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold mb-2 text-green-700">For Farmers</h3>
                                            <ul className="space-y-1">
                                                {prediction.market_analysis?.farmer_recommendations?.map((rec, i) => (
                                                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                                        <span className="text-green-600">✓</span>
                                                        <span>{rec}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold mb-2 text-blue-700">For Buyers</h3>
                                            <ul className="space-y-1">
                                                {prediction.market_analysis?.buyer_recommendations?.map((rec, i) => (
                                                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                                        <span className="text-blue-600">✓</span>
                                                        <span>{rec}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        </div>
    );
}