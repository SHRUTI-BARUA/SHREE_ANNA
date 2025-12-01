import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    MapPin,
    Calendar,
    Package,
    Truck,
    Award,
    Shield,
    CheckCircle,
    QrCode,
} from "lucide-react";
import { format } from "date-fns";

// Type definitions
interface Product {
    id: string;
    traceability_code?: string;
    title: string;
    description?: string;
    millet_type?: string;
    product_form?: string;
    organic_certified?: boolean;
    quality_grade?: string;
    seller_name?: string;
    location_district?: string;
    location_state?: string;
    harvest_date?: string;
    created_date?: string;
    available_quantity_kg?: number;
}

interface Certificate {
    id: string;
    product_id: string;
    certificate_number?: string;
    testing_date?: string;
    testing_agency?: string;
    grade_assigned?: string;
    blockchain_hash?: string;
}

interface JourneyStage {
    stage: string;
    stageHi: string;
    icon: React.ElementType;
    date?: string;
    location?: string;
    details?: string;
    verified: boolean;
}

interface SelectedTrace {
    product: Product;
    certificate?: Certificate;
    journey: JourneyStage[];
}

// Mock Data
const productsMock: Product[] = [
    {
        id: "p1",
        title: "Foxtail Millet",
        millet_type: "FOXTAL_MILLET",
        product_form: "GRAINS",
        organic_certified: true,
        location_district: "Bokaro",
        location_state: "Jharkhand",
        harvest_date: "2025-10-10",
        created_date: "2025-10-15",
        available_quantity_kg: 100,
        seller_name: "Ramesh Kumar",
        quality_grade: "A",
        traceability_code: "TRC12345",
    },
];

const certificatesMock: Certificate[] = [
    {
        id: "c1",
        product_id: "p1",
        certificate_number: "CERT12345",
        testing_date: "2025-10-20",
        testing_agency: "AgriLab",
        grade_assigned: "A",
        blockchain_hash: "0xABC123DEF456",
    },
];

export default function Traceability() {
    const [searchCode, setSearchCode] = useState("");
    const [selectedTrace, setSelectedTrace] = useState<SelectedTrace | null>(null);

    const { data: products = productsMock } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: async () => productsMock,
    });

    const { data: certificates = certificatesMock } = useQuery<Certificate[]>({
        queryKey: ["certificates"],
        queryFn: async () => certificatesMock,
    });
    const generateJourney = (product: Product, certificate?: Certificate): JourneyStage[] => [
        {
            stage: "Farm Origin",
            stageHi: "खेत की उत्पत्ति",
            icon: MapPin,
            date: product.harvest_date || product.created_date,
            location: `${product.location_district}, ${product.location_state}`,
            details: `Farmer: ${product.seller_name}`,
            verified: true,
        },
        {
            stage: "Quality Testing",
            stageHi: "गुणवत्ता परीक्षण",
            icon: Award,
            date: certificate?.testing_date,
            location: certificate?.testing_agency || "Quality Lab",
            details: `Grade: ${certificate?.grade_assigned || "Standard"}, Organic: ${product.organic_certified ? "Yes" : "No"
                }`,
            verified: !!certificate,
        },
        {
            stage: "Processing & Packaging",
            stageHi: "प्रसंस्करण और पैकेजिंग",
            icon: Package,
            date: product.created_date,
            location: product.location_district,
            details: `Form: ${product.product_form?.replace(/_/g, " ")}`,
            verified: true,
        },
        {
            stage: "Listed on Marketplace",
            stageHi: "बाज़ार में सूचीबद्ध",
            icon: Shield,
            date: product.created_date,
            location: "Shree Anna Connect Platform",
            details: `Available: ${product.available_quantity_kg} kg`,
            verified: true,
        },
    ];

    const handleSearch = () => {
        const product =
            products.find((p) => p.traceability_code === searchCode) ||
            products.find((p) => p.id === searchCode);

        if (!product) {
            alert("No product found with this code.");
            setSelectedTrace(null);
            return;
        }

        const cert = certificates.find((c) => c.product_id === product.id);

        setSelectedTrace({
            product,
            certificate: cert,
            journey: generateJourney(product, cert),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Farm to Fork Traceability
                            </h1>
                            <p className="text-lg text-gray-600">खेत से भोजन तक अनुरेखण</p>
                        </div>
                    </div>
                    <p className="text-gray-700">
                        Track your millet product’s journey from the farm to your table.
                    </p>
                </div>

                {/* Search Section */}
                <Card className="mb-8 shadow-lg">
                    <CardContent className="p-8">
                        <div className="text-center mb-6">
                            <QrCode className="w-16 h-16 mx-auto text-blue-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Enter Traceability Code</h3>
                            <p className="text-gray-600">Find it on your product package or QR</p>
                        </div>

                        <div className="flex gap-3 max-w-2xl mx-auto">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <Input
                                    value={searchCode}
                                    onChange={(e) => setSearchCode(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                    placeholder="Enter product code..."
                                    className="pl-10 h-12"
                                />
                            </div>

                            <Button
                                onClick={handleSearch}
                                className="h-12 bg-gradient-to-r from-blue-500 to-blue-600"
                            >
                                <Search className="w-4 h-4 mr-2" />
                                Track
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Result Section */}
                {selectedTrace && (
                    <div className="space-y-6">

                        {/* Product Info */}
                        <Card className="shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="w-6 h-6 text-green-600" />
                                    Product Information
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2 text-gray-900">
                                            {selectedTrace.product.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <Badge className="bg-amber-100 text-amber-800">
                                                {selectedTrace.product.millet_type?.replace(/_/g, " ")}
                                            </Badge>

                                            <Badge className="bg-blue-100 text-blue-800">
                                                {selectedTrace.product.product_form?.replace(/_/g, " ")}
                                            </Badge>

                                            {selectedTrace.product.organic_certified && (
                                                <Badge className="bg-green-600 text-white flex items-center gap-1">
                                                    <Award className="w-3 h-3" />
                                                    Organic Certified
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-white p-4 rounded-lg">
                                        <h4 className="font-semibold mb-3">Details:</h4>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Quality Grade:</span>
                                                <span className="font-semibold">
                                                    {selectedTrace.product.quality_grade}
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Seller:</span>
                                                <span className="font-semibold">
                                                    {selectedTrace.product.seller_name}
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Origin:</span>
                                                <span className="font-semibold">
                                                    {selectedTrace.product.location_district},{" "}
                                                    {selectedTrace.product.location_state}
                                                </span>
                                            </div>

                                            {selectedTrace.certificate && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Certificate #:</span>
                                                    <span className="font-semibold">
                                                        {selectedTrace.certificate.certificate_number}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Journey Timeline */}
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Truck className="w-6 h-6 text-blue-600" />
                                    Product Journey Timeline
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <div className="relative">
                                    {selectedTrace.journey.map((stage, index) => (
                                        <div key={index} className="flex gap-6 pb-8 relative">
                                            {index < selectedTrace.journey.length - 1 && (
                                                <div className="absolute left-6 top-12 w-0.5 h-24 bg-gradient-to-b from-blue-500 to-green-500" />
                                            )}

                                            <div
                                                className={`w-12 h-12 rounded-full flex items-center justify-center ${stage.verified
                                                        ? "bg-gradient-to-br from-green-500 to-green-600"
                                                        : "bg-gray-300"
                                                    }`}
                                            >
                                                <stage.icon className="w-6 h-6 text-white" />
                                            </div>

                                            <div className="flex-1 bg-white p-4 rounded-lg shadow">
                                                <div className="flex justify-between mb-2">
                                                    <div>
                                                        <h4 className="font-semibold text-lg">{stage.stage}</h4>
                                                        <p className="text-sm text-gray-600">{stage.stageHi}</p>
                                                    </div>

                                                    {stage.verified && (
                                                        <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                                                            <CheckCircle className="w-3 h-3" />
                                                            Verified
                                                        </Badge>
                                                    )}
                                                </div>

                                                <div className="grid md:grid-cols-3 gap-4 text-sm">
                                                    {stage.date && (
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>{format(new Date(stage.date), "MMM d, yyyy")}</span>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>{stage.location}</span>
                                                    </div>

                                                    <p className="text-gray-700">{stage.details}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Blockchain Section */}
                        {selectedTrace.certificate?.blockchain_hash && (
                            <Card className="shadow-lg bg-gradient-to-r from-purple-50 to-blue-50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Shield className="w-6 h-6 text-purple-600" />
                                        Blockchain Verification
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-gray-700 mb-3">
                                        This certificate is stored on blockchain for trusted verification.
                                    </p>

                                    <div className="bg-white p-4 rounded-lg">
                                        <p className="text-xs text-gray-600 mb-1">Transaction Hash:</p>
                                        <p className="font-mono text-sm break-all">
                                            {selectedTrace.certificate.blockchain_hash}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}

                {/* Why Traceability Matters — Always Visible */}
                <div className="bg-white p-8 mt-12 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Why Traceability Matters?</h2>

                    <div className="grid md:grid-cols-3 gap-6">

                        {/* Consumers */}
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-green-700">For Consumers</h3>
                            <ul className="text-gray-700 space-y-2">
                                <li>✔ Know your food's origin</li>
                                <li>✔ Verify quality & authenticity</li>
                                <li>✔ Support local farmers</li>
                                <li>✔ Ensure food safety</li>
                            </ul>
                        </div>

                        {/* Farmers */}
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-blue-700">For Farmers</h3>
                            <ul className="text-gray-700 space-y-2">
                                <li>✔ Build consumer trust</li>
                                <li>✔ Premium pricing opportunity</li>
                                <li>✔ Brand recognition</li>
                                <li>✔ Market differentiation</li>
                            </ul>
                        </div>

                        {/* Platform */}
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-purple-700">For the Platform</h3>
                            <ul className="text-gray-700 space-y-2">
                                <li>✔ Quality assurance</li>
                                <li>✔ Transparency</li>
                                <li>✔ Fraud prevention</li>
                                <li>✔ Compliance readiness</li>
                            </ul>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}