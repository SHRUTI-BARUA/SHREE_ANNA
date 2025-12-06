import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Activity, Droplet, Bone, Wheat } from "lucide-react";

export default function MilletCard({ millet }) {
  // 1. Guard Clause: Prevent crash if data is missing
  if (!millet) {
    return null; // Or return a loading skeleton if preferred
  }

  // 2. Safe Access: Handle missing nutrition object
  const nutrition = millet.nutrition || {};

  // We explicitly map the data points you provided to specific icons for a better UI
  const nutritionMetrics = [
    { label: "Protein", value: nutrition.protein || "N/A", icon: Activity },
    { label: "Fiber", value: nutrition.fiber || "N/A", icon: Leaf },
    { label: "Iron", value: nutrition.iron || "N/A", icon: Droplet },
    { label: "Calcium", value: nutrition.calcium || "N/A", icon: Bone },
  ];

  // 3. Safe Access: Handle missing benefits array
  const benefits = Array.isArray(millet.benefits) ? millet.benefits : [];

  return (
    <Card className="group relative overflow-hidden rounded-2xl border-none shadow-md hover:shadow-xl bg-white transition-all duration-300 h-full flex flex-col">
      
      {/* 1. Header Image Area with Overlay */}
      <div className="relative h-52 overflow-hidden shrink-0">
        {millet.image ? (
          <img 
            src={millet.image} 
            alt={millet.name || "Millet"} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        ) : (
          <div className="h-full w-full bg-shree-brown/10 flex items-center justify-center">
            <Wheat className="w-12 h-12 text-shree-brown/20" />
          </div>
        )}
        
        {/* Gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-shree-brown/90 via-shree-brown/20 to-transparent" />
        
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <Badge className="bg-shree-gold text-shree-brown font-bold mb-2 border-0 hover:bg-shree-gold backdrop-blur-sm">
            Nutri-Cereal
          </Badge>
          <h2 className="text-2xl font-serif font-bold tracking-wide shadow-black drop-shadow-md">
            {millet.name || "Unknown Millet"}
          </h2>
        </div>
      </div>

      <CardContent className="p-0 flex-1 flex flex-col">
        {/* 2. Benefits Section */}
        <div className="p-5 flex-1">
          <h4 className="font-serif font-bold text-shree-brown mb-3 flex items-center gap-2 text-lg">
            <Leaf className="w-4 h-4 text-shree-green fill-shree-green" />
            Key Benefits
          </h4>
          {benefits.length > 0 ? (
            <ul className="space-y-2.5">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start text-sm text-gray-600 leading-relaxed group/item">
                  <span className="mr-2.5 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-shree-rust group-hover/item:scale-125 transition-transform" />
                  {benefit}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 italic">No benefits listed.</p>
          )}
        </div>

        {/* 3. Nutrition Data Table (Styled like the Standards PDF) */}
        <div className="bg-shree-cream border-t border-dashed border-gray-200 p-5 mt-auto">
          <h5 className="text-[10px] font-bold text-shree-rust uppercase tracking-widest mb-3 flex items-center gap-2">
            <Activity className="w-3 h-3" />
            Nutritional Value (per 100g)
          </h5>
          
          <div className="grid grid-cols-2 gap-3">
            {nutritionMetrics.map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-2.5 rounded-lg border border-gray-100 flex items-center justify-between shadow-sm hover:border-shree-gold/30 transition-colors"
              >
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <item.icon className="w-3.5 h-3.5 text-shree-gold" />
                  {item.label}
                </div>
                <span className="font-bold text-shree-brown text-sm">
                  {/* Ensure value is renderable (string or number), fallback if object/null */}
                  {typeof item.value === 'object' ? JSON.stringify(item.value) : (item.value || "-")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}