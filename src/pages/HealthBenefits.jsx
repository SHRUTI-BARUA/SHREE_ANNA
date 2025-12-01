// src/components/HealthBenefits.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Leaf, TrendingUp } from "lucide-react";

export default function HealthBenefits({ milletTypes, language, t }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {milletTypes.map((millet, index) => (
        <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl">{millet.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm text-gray-600">
              {millet.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-500">
                    <Heart className="w-4 h-4" />
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
