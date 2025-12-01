import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Landmark, Search, ExternalLink, Download, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GovernmentSchemes() {
  const [searchTerm, setSearchTerm] = useState("");

  const schemes = [
    {
      id: 1,
      name: "PM-AASHA (Pradhan Mantri Annadata Aay SanraksHan Abhiyan)",
      nameHi: "प्रधानमंत्री अन्नदाता आय संरक्षण अभियान",
      category: "Price Support",
      ministry: "Ministry of Agriculture & Farmers Welfare",
      description: "Ensures remunerative prices to farmers for their produce. Includes MSP support for millets.",
      descriptionHi: "किसानों को उनकी उपज के लिए लाभकारी मूल्य सुनिश्चित करता है। श्री अन्न के लिए MSP समर्थन शामिल है।",
      benefits: [
        "Minimum Support Price (MSP) for millets",
        "Price Deficiency Payment Scheme",
        "Private Procurement & Stockist Scheme"
      ],
      eligibility: "All farmers growing millets",
      applicationUrl: "https://agricoop.gov.in/",
      status: "Active"
    },
    {
      id: 2,
      name: "National Food Security Mission - Nutri Cereals",
      nameHi: "राष्ट्रीय खाद्य सुरक्षा मिशन - पोषक अनाज",
      category: "Production Support",
      ministry: "Ministry of Agriculture",
      description: "Increase production and productivity of nutri-cereals (millets) through cluster approach.",
      descriptionHi: "क्लस्टर दृष्टिकोण के माध्यम से पोषक अनाज (श्री अन्न) के उत्पादन और उत्पादकता में वृद्धि।",
      benefits: [
        "Seeds subsidy up to 50%",
        "Farm mechanization support",
        "Integrated Pest Management",
        "Soil Health Card distribution"
      ],
      eligibility: "Individual farmers, FPOs, SHGs",
      applicationUrl: "https://nfsm.gov.in/",
      status: "Active"
    },
    {
      id: 3,
      name: "Formation & Promotion of FPOs",
      nameHi: "FPO का गठन और संवर्धन",
      category: "Institution Building",
      ministry: "NABARD & SFAC",
      description: "Financial assistance for forming and strengthening Farmer Producer Organizations for millet cultivation.",
      descriptionHi: "श्री अन्न खेती के लिए किसान उत्पादक संगठनों के गठन और मजबूती के लिए वित्तीय सहायता।",
      benefits: [
        "₹15 lakhs equity grant per FPO",
        "Credit Guarantee Fund coverage",
        "Management & training support",
        "Marketing infrastructure support"
      ],
      eligibility: "Groups of 300+ farmers",
      applicationUrl: "https://sfacindia.com/",
      status: "Active"
    },
    {
      id: 4,
      name: "PM Formalization of Micro Food Processing Enterprises (PMFME)",
      nameHi: "प्रधानमंत्री सूक्ष्म खाद्य प्रसंस्करण उद्यम योजना",
      category: "Processing Support",
      ministry: "Ministry of Food Processing Industries",
      description: "Support for millet processing units, value addition, and branding.",
      descriptionHi: "श्री अन्न प्रसंस्करण इकाइयों, मूल्य संवर्धन और ब्रांडिंग के लिए समर्थन।",
      benefits: [
        "35% subsidy on eligible project cost",
        "Working capital support",
        "Credit-linked subsidy",
        "Common infrastructure support"
      ],
      eligibility: "Micro enterprises, SHGs, FPOs",
      applicationUrl: "https://pmfme.mofpi.gov.in/",
      status: "Active"
    },
    {
      id: 5,
      name: "Agriculture Infrastructure Fund",
      nameHi: "कृषि अवसंरचना कोष",
      category: "Infrastructure",
      ministry: "Ministry of Agriculture",
      description: "₹1 lakh crore fund for post-harvest infrastructure including millet storage and processing.",
      descriptionHi: "श्री अन्न भंडारण और प्रसंस्करण सहित फसल-कटाई के बाद के बुनियादी ढांचे के लिए ₹1 लाख करोड़ का कोष।",
      benefits: [
        "3% interest subvention",
        "Credit guarantee coverage",
        "Warehouses, cold storage support",
        "Primary processing centers"
      ],
      eligibility: "Farmers, FPOs, Startups, Processors",
      applicationUrl: "https://agriinfra.dac.gov.in/",
      status: "Active"
    },
    {
      id: 6,
      name: "Organic Certification Support",
      nameHi: "जैविक प्रमाणीकरण सहायता",
      category: "Certification",
      ministry: "APEDA & State Govts",
      description: "Financial assistance for organic certification of millet produce.",
      descriptionHi: "श्री अन्न उत्पादों के जैविक प्रमाणीकरण के लिए वित्तीय सहायता।",
      benefits: [
        "100% subsidy for certification costs",
        "Group certification for FPOs",
        "PGS-India & Third-party certification",
        "Export promotion support"
      ],
      eligibility: "All organic millet farmers",
      applicationUrl: "https://apeda.gov.in/",
      status: "Active"
    },
    {
      id: 7,
      name: "Startup India - AgriTech",
      nameHi: "स्टार्टअप इंडिया - एग्रीटेक",
      category: "Entrepreneurship",
      ministry: "DPIIT, Ministry of Commerce",
      description: "Support for millet-based startups in processing, branding, and marketing.",
      descriptionHi: "प्रसंस्करण, ब्रांडिंग और विपणन में श्री अन्न आधारित स्टार्टअप के लिए समर्थन।",
      benefits: [
        "Tax exemption for 3 years",
        "Patent filing support",
        "Fund of Funds access",
        "Incubation support"
      ],
      eligibility: "DPIIT recognized startups",
      applicationUrl: "https://www.startupindia.gov.in/",
      status: "Active"
    },
    {
      id: 8,
      name: "PM Kisan Samman Nidhi",
      nameHi: "प्रधानमंत्री किसान सम्मान निधि",
      category: "Income Support",
      ministry: "Ministry of Agriculture",
      description: "Direct income support of ₹6000/year to all farmer families.",
      descriptionHi: "सभी किसान परिवारों को ₹6000/वर्ष की प्रत्यक्ष आय सहायता।",
      benefits: [
        "₹2000 every 4 months",
        "Direct bank transfer",
        "No crop restriction",
        "Includes millet farmers"
      ],
      eligibility: "All landholding farmers",
      applicationUrl: "https://pmkisan.gov.in/",
      status: "Active"
    }
  ];

  const filteredSchemes = schemes.filter(scheme =>
    scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(schemes.map(s => s.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
              <Landmark className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Government Schemes & Subsidies
              </h1>
              <p className="text-lg text-gray-600">सरकारी योजनाएं और सब्सिडी</p>
            </div>
          </div>
          <p className="text-gray-700">
            Access financial support, subsidies, and certifications for millet entrepreneurship
          </p>
        </div>

        {/* Search */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search schemes by name, category, or benefits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-orange-600">{schemes.length}</p>
              <p className="text-sm text-gray-600">Total Schemes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{categories.length}</p>
              <p className="text-sm text-gray-600">Categories</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">₹1L Cr+</p>
              <p className="text-sm text-gray-600">Total Allocation</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-purple-600">100%</p>
              <p className="text-sm text-gray-600">Active Schemes</p>
            </CardContent>
          </Card>
        </div>

        {/* Schemes by Category */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.slice(0, 4).map(cat => (
              <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <SchemesList schemes={filteredSchemes} />
          </TabsContent>

          {categories.map(cat => (
            <TabsContent key={cat} value={cat}>
              <SchemesList schemes={filteredSchemes.filter(s => s.category === cat)} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

function SchemesList({ schemes }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {schemes.map((scheme) => (
        <Card key={scheme.id} className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg mb-2">{scheme.name}</CardTitle>
                <p className="text-sm text-gray-600 mb-2">{scheme.nameHi}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-orange-100 text-orange-800">{scheme.category}</Badge>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {scheme.status}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">{scheme.description}</p>
            <p className="text-sm text-gray-600 mb-4 italic">{scheme.descriptionHi}</p>

            <div className="mb-4">
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Key Benefits:</h4>
              <ul className="space-y-1">
                {scheme.benefits.map((benefit, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm">
                <strong>Eligibility:</strong> {scheme.eligibility}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                <strong>Ministry:</strong> {scheme.ministry}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                onClick={() => window.open(scheme.applicationUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Apply Online
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Guidelines
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}