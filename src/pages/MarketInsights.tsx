import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, Loader2, Sparkles, AlertCircle } from "lucide-react";
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

    // Mock fetch functions
    const { data: marketPrices = [] } = useQuery<MarketPrice[]>({
        queryKey: ["market-prices"],
        queryFn: async () => [
            { date: "2025-11-01", millet_type: "foxtail_millet", price_per_quintal: 2500, market_name: "Bokaro" },
            { date: "2025-11-02", millet_type: "pearl_millet", price_per_quintal: 2200, market_name: "Patna" },
            { date: "2025-11-03", millet_type: "finger_millet", price_per_quintal: 2100, market_name: "Ranchi" },
            { date: "2025-11-04", millet_type: "little_millet", price_per_quintal: 2300, market_name: "Gaya" },
            // Added extra data points for chart visualization
            { date: "2025-11-05", millet_type: "foxtail_millet", price_per_quintal: 2550, market_name: "Bokaro" },
            { date: "2025-11-06", millet_type: "pearl_millet", price_per_quintal: 2250, market_name: "Patna" },
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
            await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate AI delay
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
                    overall_trend: "Prices expected to rise steadily over next 3 months due to export demands.",
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

    const chartData = filteredPrices.slice(0, 30).map(p => ({
        date: new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        price: p.price_per_quintal,
    }));

    const avgPrice = filteredPrices.length > 0
        ? (filteredPrices.reduce((sum, p) => sum + p.price_per_quintal, 0) / filteredPrices.length).toFixed(0)
        : 0;

    return (
        <div className="min-h-screen bg-shree-cream p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section - Shree Anna Theme */}
                <div className="mb-10 text-center md:text-left">
                    <Badge className="bg-shree-gold text-shree-brown font-bold mb-3 hover:bg-shree-gold">
                        Market Intelligence
                    </Badge>
                    <h1 className="text-4xl font-serif font-bold text-shree-brown mb-2">Market Insights & Price Predictions</h1>
                    <p className="text-gray-600 font-sans max-w-2xl">
                        AI-powered market analysis and price forecasting based on Mandi data.
                    </p>
                </div>

                {/* Controls & Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Controls */}
                    <Card className="lg:col-span-2 border-none shadow-md bg-white">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-4 items-end">
                                <div className="flex-1 w-full">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                        Select Millet Type
                                    </label>
                                    <Select value={selectedMillet} onValueChange={setSelectedMillet}>
                                        <SelectTrigger className="h-12 border-gray-200 bg-gray-50 focus:ring-shree-green">
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
                                    className="h-12 px-6 bg-shree-rust hover:bg-orange-800 text-white font-medium w-full md:w-auto"
                                >
                                    {isGeneratingPrediction ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4 mr-2" /> Generate Future Prediction
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Card - Styled with Theme */}
                    <Card className="bg-shree-green text-white border-none shadow-md">
                        <CardContent className="p-6 flex flex-col justify-center h-full">
                            <div className="flex items-center gap-2 mb-2 opacity-90">
                                <BarChart3 className="w-5 h-5" />
                                <span className="text-sm font-medium">Average Price (Quintal)</span>
                            </div>
                            <p className="text-4xl font-serif font-bold">₹{avgPrice}</p>
                            <div className="flex items-center gap-1 mt-2 text-green-100 text-sm">
                                <TrendingUp className="w-4 h-4" />
                                <span>+8.5% vs last month</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Price Chart - Styled for FSSAI/Report look */}
                <Card className="mb-8 border-none shadow-lg bg-white">
                    <CardHeader className="border-b border-gray-100 pb-4">
                        <CardTitle className="font-serif text-xl text-shree-brown">
                            Price History <span className="text-gray-400 font-sans text-sm font-normal ml-2">(Last 30 Days)</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis 
                                        dataKey="date" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#5D4037', fontSize: 12 }} 
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#5D4037', fontSize: 12 }} 
                                        tickFormatter={(value) => `₹${value}`}
                                    />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: '#FDFBF7', 
                                            borderColor: '#D69E2E', 
                                            borderRadius: '8px',
                                            color: '#5D4037',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }} 
                                    />
                                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                    <Line 
                                        type="monotone" 
                                        dataKey="price" 
                                        name="Price (₹/quintal)"
                                        stroke="hsl(var(--shree-green))" // Theme Green
                                        strokeWidth={3} 
                                        dot={{ fill: 'hsl(var(--shree-green))', r: 4, strokeWidth: 0 }}
                                        activeDot={{ r: 8, fill: 'hsl(var(--shree-rust))' }} // Theme Rust Highlight
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* AI Predictions Section */}
                {prediction && (
                    <div className="animate-fade-in">
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="w-6 h-6 text-shree-gold" />
                            <h2 className="text-2xl font-serif font-bold text-shree-brown">AI Forecast Report</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {prediction.predictions?.map((pred, index) => (
                                <Card key={index} className="border-none shadow-md overflow-hidden bg-white">
                                    <div className="bg-shree-brown p-3 flex justify-between items-center">
                                        <h3 className="text-white font-serif font-bold pl-2">
                                            {pred.millet_type.replace(/_/g, " ").toUpperCase()}
                                        </h3>
                                        <Badge className={`border-0 ${pred.trend === "upward" ? "bg-shree-green text-white" : "bg-red-500 text-white"}`}>
                                            {pred.trend.toUpperCase()}
                                        </Badge>
                                    </div>
                                    <CardContent className="p-5">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-3">
                                                <span className="text-gray-500 text-sm">Current Price</span>
                                                <span className="font-bold text-lg text-gray-800">₹{pred.current_price}</span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2 text-center">
                                                <div>
                                                    <p className="text-xs text-gray-400 mb-1">30 Days</p>
                                                    <p className="font-bold text-shree-green">₹{pred.predicted_price_30days}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400 mb-1">60 Days</p>
                                                    <p className="font-bold text-shree-rust">₹{pred.predicted_price_60days}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400 mb-1">90 Days</p>
                                                    <p className="font-bold text-shree-brown">₹{pred.predicted_price_90days}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <Card className="border-none shadow-lg bg-white">
                            <CardHeader className="bg-shree-cream/50 border-b border-gray-100">
                                <CardTitle className="text-lg font-serif text-shree-brown">Market Analysis & Recommendations</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-bold text-gray-500 uppercase text-xs tracking-wider mb-2">Overall Trend</h3>
                                        <p className="text-lg text-shree-rust font-medium leading-relaxed font-serif">
                                            "{prediction.market_analysis?.overall_trend}"
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-gray-500 uppercase text-xs tracking-wider mb-2">Key Drivers</h3>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {prediction.market_analysis?.key_factors?.map((factor, i) => (
                                                <li key={i} className="text-gray-700 flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                                                    <span className="text-shree-gold text-xl">•</span>
                                                    <span>{factor}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 pt-4">
                                        <div className="bg-green-50/50 p-5 rounded-xl border border-green-100">
                                            <h3 className="font-bold mb-3 text-shree-green flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4" /> For Farmers
                                            </h3>
                                            <ul className="space-y-2">
                                                {prediction.market_analysis?.farmer_recommendations?.map((rec, i) => (
                                                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                                        <span className="text-shree-green font-bold">✓</span>
                                                        <span>{rec}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                                            <h3 className="font-bold mb-3 text-blue-700 flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4" /> For Buyers
                                            </h3>
                                            <ul className="space-y-2">
                                                {prediction.market_analysis?.buyer_recommendations?.map((rec, i) => (
                                                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                                        <span className="text-blue-600 font-bold">✓</span>
                                                        <span>{rec}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}