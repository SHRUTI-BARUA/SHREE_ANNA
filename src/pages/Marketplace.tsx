import { Search, Sparkles, MapPin, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: 1,
    name: "RAW MILLET",
    type: "Foxtail Millet",
    image: null,
    location: "ALIGARH, UP",
    quantity: "100 kg available",
    price: 60,
    minOrder: "1 kg",
    badges: ["STANDARD"],
  },
  {
    id: 2,
    name: "Premium Organic Foxtail Millet",
    type: "Foxtail Millet",
    image: null,
    location: "Jodhpur, Rajasthan",
    quantity: "500 kg available",
    price: 85,
    minOrder: "10 kg",
    badges: ["Organic", "PREMIUM"],
    description: "Certified organic foxtail millet from Rajasthan farms. Rich in iron and fiber.",
  },
  {
    id: 3,
    name: "Fresh Ragi Flour (Finger Millet)",
    type: "Finger Millet (Ragi)",
    image: "ragi",
    location: "Mandya, Karnataka",
    quantity: "300 kg available",
    price: 95,
    minOrder: "5 kg",
    badges: ["Organic", "GRADE A"],
    description: "Stone-ground ragi flour, perfect for rotis and porridge. High calcium content.",
  },
  {
    id: 4,
    name: "Pearl Millet (Bajra) - Winter Special",
    type: "Pearl Millet (Bajra)",
    image: null,
    location: "Jaipur, Rajasthan",
    quantity: "750 kg available",
    price: 70,
    minOrder: "20 kg",
    badges: ["GRADE A"],
  },
];

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-header py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-3">Millet Marketplace</h1>
          <p className="text-white text-lg mb-6">Connect with quality millet suppliers across India</p>
          
          {/* Search Bar */}
          <div className="flex gap-3 max-w-3xl">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search for millets, products..."
                className="pl-10 h-12 bg-white"
              />
            </div>
            <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white px-6 h-12">
              <Sparkles className="w-5 h-5 mr-2" />
              AI Smart Matching
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-5 h-5 text-brand-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
            <h3 className="font-bold text-lg">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select defaultValue="all-millets">
              <SelectTrigger>
                <SelectValue placeholder="All Millets" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-millets">All Millets</SelectItem>
                <SelectItem value="foxtail">Foxtail Millet</SelectItem>
                <SelectItem value="ragi">Finger Millet (Ragi)</SelectItem>
                <SelectItem value="bajra">Pearl Millet (Bajra)</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all-forms">
              <SelectTrigger>
                <SelectValue placeholder="All Forms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-forms">All Forms</SelectItem>
                <SelectItem value="raw">Raw</SelectItem>
                <SelectItem value="flour">Flour</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="latest">
              <SelectTrigger>
                <SelectValue placeholder="Latest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">Clear Filters</Button>
          </div>
        </Card>

        {/* Products Count */}
        <p className="text-muted-foreground mb-6">{products.length} products found</p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Product Image */}
              <div className="relative h-48 bg-muted">
                {product.image === "ragi" ? (
                  <img 
                    src="https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop" 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <Package className="w-16 h-16 text-gray-300" />
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-wrap gap-2 justify-end">
                  {product.badges.map((badge, idx) => (
                    <Badge
                      key={idx}
                      className={
                        badge === "Organic"
                          ? "bg-brand-green text-white"
                          : badge === "PREMIUM"
                          ? "bg-brand-orange text-white"
                          : badge === "GRADE A"
                          ? "bg-brand-orange text-white"
                          : "bg-brand-orange text-white"
                      }
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{product.type}</p>
                <h3 className="font-bold text-lg mb-3">{product.name}</h3>
                
                {product.description && (
                  <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                )}

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{product.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="w-4 h-4" />
                    <span>{product.quantity}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-brand-green">₹{product.price}</span>
                    <span className="text-sm text-muted-foreground">/kg</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Min order: {product.minOrder}</p>
                </div>

                <Button className="w-full bg-gradient-orange-green text-white hover:opacity-90">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
