import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

import {
  Sparkles,
  Download,
  Heart,
  Share2,
  Award,
  TrendingUp,
  Users,
  Package,
} from "lucide-react";


export default function Branding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-green-600 text-white p-8 md:p-12 mb-8">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-12 h-12" />
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">Shree Anna Branding</h1>
                <p className="text-xl text-amber-100">श्री अन्न ब्रांडिंग</p>
              </div>
            </div>
            <p className="text-xl mb-6 max-w-3xl">
              Build your millet brand under the prestigious "Shree Anna" initiative. 
              Access marketing resources, packaging designs, and promotional materials to grow your business.
            </p>
            <div className="flex flex-wrap gap-4">
            <a
                 href="/branding/BrandKit.pdf" // file path in public/branding
                 download
                 className="inline-block"
              >
             <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
               <Download className="w-5 h-5 mr-2" />
                Download Brand Kit
            </Button>
             </a>

              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Share2 className="w-5 h-5 mr-2" />
                Share Success Story
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500/20 rounded-full blur-2xl" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Package className="w-10 h-10 mx-auto text-amber-600 mb-2" />
              <p className="text-3xl font-bold text-gray-900">500+</p>
              <p className="text-sm text-gray-600">Branded Products</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-10 h-10 mx-auto text-green-600 mb-2" />
              <p className="text-3xl font-bold text-gray-900">10,000+</p>
              <p className="text-sm text-gray-600">Brand Partners</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-10 h-10 mx-auto text-blue-600 mb-2" />
              <p className="text-3xl font-bold text-gray-900">₹50 Cr+</p>
              <p className="text-sm text-gray-600">Brand Value</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="w-10 h-10 mx-auto text-purple-600 mb-2" />
              <p className="text-3xl font-bold text-gray-900">15+</p>
              <p className="text-sm text-gray-600">Awards Won</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="guidelines" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="guidelines">Brand Guidelines</TabsTrigger>
            <TabsTrigger value="packaging">Packaging Designs</TabsTrigger>
            <TabsTrigger value="marketing">Marketing Materials</TabsTrigger>
            <TabsTrigger value="success">Success Stories</TabsTrigger>
          </TabsList>

          {/* Brand Guidelines */}
          <TabsContent value="guidelines">
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                  <CardTitle>Shree Anna Brand Identity</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Logo Usage</h3>
                      <div className="bg-white p-6 rounded-lg border-2 border-amber-200 mb-4">
                        <div className="text-center">
                          <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-2xl">श्री अन्न</span>
                          </div>
                          <p className="text-sm text-gray-600">Official Shree Anna Logo</p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>✓ Use official logo without modifications</li>
                        <li>✓ Maintain minimum clearance space</li>
                        <li>✓ Use approved color variations only</li>
                        <li>✓ Don't stretch or distort the logo</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-4">Color Palette</h3>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center">
                          <div className="w-full h-20 bg-amber-500 rounded-lg mb-2"></div>
                          <p className="text-xs font-semibold">Amber Gold</p>
                          <p className="text-xs text-gray-600">#F59E0B</p>
                        </div>
                        <div className="text-center">
                          <div className="w-full h-20 bg-green-600 rounded-lg mb-2"></div>
                          <p className="text-xs font-semibold">Earth Green</p>
                          <p className="text-xs text-gray-600">#16A34A</p>
                        </div>
                        <div className="text-center">
                          <div className="w-full h-20 bg-orange-600 rounded-lg mb-2"></div>
                          <p className="text-xs font-semibold">Harvest Orange</p>
                          <p className="text-xs text-gray-600">#EA580C</p>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-3 mt-6">Typography</h3>
                      <div className="space-y-2">
                        <div className="p-3 bg-gray-50 rounded">
                          <p className="font-bold text-2xl">Montserrat Bold</p>
                          <p className="text-sm text-gray-600">Primary Headings</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded">
                          <p className="text-lg">Inter Regular</p>
                          <p className="text-sm text-gray-600">Body Text</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid md:grid-cols-3 gap-4">
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-600">
                      <Download className="w-4 h-4 mr-2" />
                      Download Logo Pack
                    </Button>
                    <a
                       href="/branding/BrandManual.pdf"
                         download
                         className="inline-block"
                       >
                         <Button variant="outline">
                           <Download className="w-4 h-4 mr-2" />
                           Brand Manual PDF
                         </Button>
                    </a>

                   
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Brand Values & Messaging</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Core Values:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Heart className="w-5 h-5 text-red-500 mt-0.5" />
                          <div>
                            <strong>Nutrition First</strong>
                            <p className="text-sm text-gray-600">Promoting health through ancient supergrains</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Award className="w-5 h-5 text-green-500 mt-0.5" />
                          <div>
                            <strong>Farmer Empowerment</strong>
                            <p className="text-sm text-gray-600">Fair prices and direct market access</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Sparkles className="w-5 h-5 text-amber-500 mt-0.5" />
                          <div>
                            <strong>Sustainability</strong>
                            <p className="text-sm text-gray-600">Climate-smart agriculture practices</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Key Messages:</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-amber-50 rounded-lg">
                          <p className="font-semibold text-amber-900">"From Ancient Wisdom to Modern Health"</p>
                          <p className="text-sm text-gray-600">Emphasize heritage and nutrition</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="font-semibold text-green-900">"Empowering Farmers, Nourishing Nation"</p>
                          <p className="text-sm text-gray-600">Highlight social impact</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="font-semibold text-blue-900">"Sustainable. Nutritious. Authentic."</p>
                          <p className="text-sm text-gray-600">Core product benefits</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Packaging Designs */}
          <TabsContent value="packaging">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Premium Retail Pack",
                  size: "500g / 1kg",
                  features: ["Zipper seal", "Window display", "QR code traceability"],
                  image: "https://images.unsplash.com/photo-1586380951230-c27a10a7e6db?w=400&h=300&fit=crop"
                },
                {
                  name: "Eco-Friendly Pouch",
                  size: "250g / 500g",
                  features: ["Biodegradable", "Minimalist design", "Bulk-friendly"],
                  image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop"
                },
                {
                  name: "Gift Box Set",
                  size: "Assorted 200g x 5",
                  features: ["Premium finish", "Recipe booklet", "Festival ready"],
                  image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop"
                }
              ].map((pack, i) => (
                <Card key={i} className="shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img src={pack.image} alt={pack.name} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{pack.name}</h3>
                    <Badge className="mb-3">{pack.size}</Badge>
                    <ul className="space-y-1 mb-4">
                      {pack.features.map((f, j) => (
                        <li key={j} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="text-green-600">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Marketing Materials */}
          <TabsContent value="marketing">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Social Media Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Instagram Post Templates (10 designs)
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Facebook Cover Photos
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      WhatsApp Status Graphics
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      YouTube Thumbnails
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Print Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Product Brochure Template
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Recipe Cards (Bilingual)
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Nutrition Information Posters
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Point of Sale Displays
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg md:col-span-2 bg-gradient-to-r from-purple-50 to-pink-50">
                <CardHeader>
                  <CardTitle>Content Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Product Photography</h4>
                      <p className="text-sm text-gray-600 mb-3">High-res images of millet varieties</p>
                      <Button size="sm">Access Library</Button>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Video Resources</h4>
                      <p className="text-sm text-gray-600 mb-3">Recipe demos, farmer stories</p>
                      <Button size="sm">Watch Videos</Button>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Sample Copy</h4>
                      <p className="text-sm text-gray-600 mb-3">Product descriptions, taglines</p>
                      <Button size="sm">View Library</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Success Stories */}
          <TabsContent value="success">
            <div className="space-y-6">
              {[
                {
                  name: "Rajasthan Millet Farmers FPO",
                  nameHi: "राजस्थान श्री अन्न किसान FPO",
                  story: "Increased their revenue by 300% within 6 months of joining Shree Anna Connect. Now supplying to 50+ retailers across North India.",
                  storyHi: "श्री अन्न कनेक्ट में शामिल होने के 6 महीने के भीतर उनके राजस्व में 300% की वृद्धि हुई। अब उत्तर भारत में 50+ खुदरा विक्रेताओं को आपूर्ति कर रहे हैं।",
                  metrics: [
                    { label: "Revenue Growth", value: "300%" },
                    { label: "Farmers Benefited", value: "500+" },
                    { label: "Retail Partners", value: "50+" }
                  ]
                },
                {
                  name: "Organic Ragi SHG, Karnataka",
                  nameHi: "ऑर्गेनिक रागी SHG, कर्नाटक",
                  story: "Women's self-help group transformed their local production into a pan-India brand, now exporting to 3 countries.",
                  storyHi: "महिला स्व-सहायता समूह ने अपने स्थानीय उत्पादन को अखिल भारतीय ब्रांड में बदल दिया, अब 3 देशों को निर्यात कर रहे हैं।",
                  metrics: [
                    { label: "International Markets", value: "3" },
                    { label: "Women Empowered", value: "200+" },
                    { label: "Organic Certified", value: "Yes" }
                  ]
                },
                {
                  name: "Millet Magic Startup, Mumbai",
                  nameHi: "मिलेट मैजिक स्टार्टअप, मुंबई",
                  story: "Started with 5 products, now offering 50+ value-added millet products. Secured ₹2 crore funding using platform credentials.",
                  storyHi: "5 उत्पादों से शुरुआत की, अब 50+ मूल्य वर्धित श्री अन्न उत्पाद पेश कर रहे हैं। प्लेटफॉर्म साख का उपयोग करके ₹2 करोड़ की फंडिंग हासिल की।",
                  metrics: [
                    { label: "Product Range", value: "50+" },
                    { label: "Funding Raised", value: "₹2 Cr" },
                    { label: "Monthly Orders", value: "10,000+" }
                  ]
                }
              ].map((story, i) => (
                <Card key={i} className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{story.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{story.nameHi}</p>
                        <p className="text-gray-700 mb-2">{story.story}</p>
                        <p className="text-sm text-gray-600 italic mb-4">{story.storyHi}</p>
                        
                        <div className="grid grid-cols-3 gap-4">
                          {story.metrics.map((metric, j) => (
                            <div key={j} className="bg-gradient-to-br from-amber-50 to-green-50 p-3 rounded-lg text-center">
                              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                              <p className="text-xs text-gray-600">{metric.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

