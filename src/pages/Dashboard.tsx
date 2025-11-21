import { Sprout, Building2, User, Check, Wheat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const roleCards = [
  {
    title: "Farmer / FPO / SHG",
    subtitle: "I want to sell my millet products",
    icon: Sprout,
    iconBg: "bg-brand-green",
    features: [
      "List your products",
      "Connect with buyers",
      "Get quality certificates",
      "Track market prices",
    ],
  },
  {
    title: "Buyer / Processor / Trader",
    subtitle: "I want to buy millet products in bulk",
    icon: Building2,
    iconBg: "bg-brand-blue",
    features: [
      "Browse quality products",
      "Direct farmer connect",
      "AI-powered matching",
      "Bulk procurement",
    ],
  },
  {
    title: "Consumer",
    subtitle: "I want to buy millet products for personal use",
    icon: User,
    iconBg: "bg-brand-purple",
    features: [
      "Buy quality millets",
      "Learn about nutrition",
      "Get recipes",
      "Support farmers",
    ],
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with gradient */}
      <div className="bg-gradient-header py-16 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-24 h-24 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Wheat className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Welcome to Shree Anna Connect!
          </h1>
          <p className="text-white text-lg mb-6">Tell us who you are to get started</p>
          
          {/* Language Toggle */}
          <div className="flex items-center justify-center gap-3">
            <button className="px-6 py-2 bg-white text-brand-orange font-semibold rounded-md shadow-md">
              English
            </button>
            <button className="px-6 py-2 bg-transparent border-2 border-white text-white font-semibold rounded-md">
              हिंदी
            </button>
          </div>
        </div>
      </div>

      {/* Role Cards */}
      <div className="max-w-6xl mx-auto px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {roleCards.map((role, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-xl transition-shadow cursor-pointer bg-card"
            >
              <div className="text-center mb-6">
                <div
                  className={`w-16 h-16 ${role.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <role.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{role.title}</h3>
                <p className="text-sm text-muted-foreground">{role.subtitle}</p>
              </div>

              <ul className="space-y-3">
                {role.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-brand-green flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mb-12">
          <Button className="bg-gradient-orange-green text-white px-8 py-6 text-base font-semibold rounded-lg shadow-lg hover:opacity-90 transition-opacity">
            Continue to Profile Setup →
          </Button>
        </div>

        {/* About Section */}
        <Card className="p-6 bg-amber-50 border-amber-200 mb-12">
          <div className="flex items-start gap-3">
            <Wheat className="w-6 h-6 text-brand-orange flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-lg mb-2">About Shree Anna Connect</h4>
              <p className="text-sm text-foreground/80 leading-relaxed">
                India's first comprehensive digital platform connecting the entire millet value chain - from farmers to consumers.
                Empowering farmers, ensuring quality, and promoting nutritious millets for a healthier India.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
