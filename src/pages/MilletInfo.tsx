import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wheat } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Recipes from "./Recipes";
import HealthBenefits from "./HealthBenefits";

// Images
import foxtailImg from "../assets/foxtail.jpg";
import pearlImg from "../assets/PearlMillet.jpg";
import ragiImg from "../assets/ragi.jpeg";
import jowarImg from "../assets/jowar.jpg";
import kodoImg from "../assets/kodoMillet.jpg";
import littleImg from "../assets/LittleMillet.jpg";
import barnyardImg from "../assets/Barnyard.jpg";
import prosoImg from "../assets/ProsoMillet.jpg";
import rawmilletImg from "../assets/rawmillet.jpeg";

// 🟢 Updated millet types with more data
const milletTypes = [
  {
    name: "Foxtail Millet (Kangni)",
    nameHindi: "कंगनी",
    nameTamil: "தினை",
    nameKannada: "ನವಣೆ",
    nameTelugu: "కొర్రలు",
    image: foxtailImg,
    benefits: [
      "Rich in calcium and iron",
      "Helps control blood sugar",
      "Good for heart health",
      "High in dietary fiber",
    ],
    nutrition: { protein: "12.3g", fiber: "8g", iron: "2.8mg", calcium: "31mg" },
  },
  {
    name: "Pearl Millet (Bajra)",
    nameHindi: "बाजरा",
    nameTamil: "கம்பு",
    nameKannada: "ಸಜ್ಜೆ",
    nameTelugu: "సజ్జలు",
    image: pearlImg,
    benefits: ["Best for anemia", "Improves digestion", "Boosts energy levels", "Gluten-free"],
    nutrition: { protein: "10.6g", fiber: "1.2g", iron: "8mg", calcium: "38mg" },
  },
  {
    name: "Finger Millet (Ragi)",
    nameHindi: "रागी / मड़ुवा",
    nameTamil: "கேழ்வரகு",
    nameKannada: "ರಾಗಿ",
    nameTelugu: "రాగులు",
    image: ragiImg,
    benefits: [
      "Richest source of calcium",
      "Controls diabetes",
      "Strengthens bones",
      "High antioxidants",
    ],
    nutrition: { protein: "7.3g", fiber: "3.6g", iron: "3.9mg", calcium: "344mg" },
  },
  {
    name: "Sorghum (Jowar)",
    nameHindi: "ज्वार",
    nameTamil: "சோளம்",
    nameKannada: "ಜೋಳ",
    nameTelugu: "జోన్నలు",
    image: jowarImg,
    benefits: ["Good for weight loss", "Reduces cholesterol", "Improves digestion", "Rich in B vitamins"],
    nutrition: { protein: "10.4g", fiber: "6.7g", iron: "4.1mg", calcium: "25mg" },
  },
  {
    name: "Kodo Millet (Kodon)",
    nameHindi: "कोदन",
    nameTamil: "வரகு",
    nameKannada: "ಹಾರಕ",
    nameTelugu: "కొదుమలు",
    image: kodoImg,
    benefits: ["Helps in managing obesity", "Anti-inflammatory", "Strengthens nervous system"],
    nutrition: { protein: "8.3g", fiber: "9g", iron: "0.5mg", calcium: "27mg" },
  },
  {
    name: "Little Millet (Kutki)",
    nameHindi: "कुटकी",
    nameTamil: "சாமை",
    nameKannada: "ಸಾವಿ",
    nameTelugu: "సామలు",
    image: littleImg,
    benefits: ["Controls diabetes", "Good source of B-vitamins", "Supports brain health"],
    nutrition: { protein: "7.7g", fiber: "7.6g", iron: "9.3mg", calcium: "17mg" },
  },
  {
    name: "Barnyard Millet (Sanwa)",
    nameHindi: "सावा",
    nameTamil: "குதிரைவாலி",
    nameKannada: "ಒಡಲು",
    nameTelugu: "ఓడలు",
    image: barnyardImg,
    benefits: [
      "Fast energy boost",
      "Controls thyroid",
      "Best millet for fasting",
      "Very low glycemic index",
    ],
    nutrition: { protein: "11.2g", fiber: "10g", iron: "18.6mg", calcium: "22mg" },
  },
  {
    name: "Proso Millet (Barri)",
    nameHindi: "बार्री",
    nameTamil: "பனிவரகு",
    nameKannada: "ಅರಕೆ",
    nameTelugu: "వరగులు",
    image: prosoImg,
    benefits: ["Strengthens muscles", "Improves metabolism", "Good for nervous system"],
    nutrition: { protein: "12.5g", fiber: "2.2g", iron: "0.8mg", calcium: "14mg" },
  },
];

export default function MilletInfo() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("preferredLanguage") || "english";
  });

  const t = (en, hi, ta, kn, te) => {
    const translations = { english: en, hindi: hi, tamil: ta, kannada: kn, telugu: te };
    return translations[language] || en;
  };

  const getMilletName = (millet) => {
    if (language === "hindi") return millet.nameHindi;
    if (language === "tamil") return millet.nameTamil;
    if (language === "kannada") return millet.nameKannada;
    if (language === "telugu") return millet.nameTelugu;
    return millet.name;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-r from-amber-500 to-green-600 rounded-full mb-4">
            <Wheat className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("Shree Anna (Millets)", "श्री अन्न", "சிறுதானியங்கள்", "ಶ್ರೀ ಅನ್ನ", "శ్రీ అన్నం")}
          </h1>
        </div>

        <Tabs defaultValue="types" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="types">{t("Millet Types", "श्री अन्न प्रकार", "தினை வகைகள்", "ಶ್ರೀಧಾನ್ಯ ಪ್ರಕಾರಗಳು", "రకాలు")}</TabsTrigger>
            <TabsTrigger value="benefits">{t("Health Benefits", "स्वास्थ्य लाभ", "ஆரோக்கிய நன்மைகள்", "ಆರೋಗ್ಯ ಪ್ರಯೋಜನಗಳು", "ఆరోగ్య లాభాలు")}</TabsTrigger>
            <TabsTrigger value="recipes">{t("Recipes", "व्यंजन", "சமையல் குறிப்புகள்", "ಪಾಕವಿಧಾನಗಳು", "వంటకాలు")}</TabsTrigger>
          </TabsList>

          <TabsContent value="types">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {milletTypes.map((millet, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img
                      src={millet.image}
                      alt={millet.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {millet.name}
                      <p className="text-sm font-normal text-amber-600 mt-1">{getMilletName(millet)}</p>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">
                      {t("Benefits:", "लाभ:", "நன்மைகள்:", "ಪ್ರಯೋಜನಗಳು:", "ప్రయోజనాలు:")}
                    </h4>
                    <ul className="space-y-1">
                      {millet.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-green-600">✓</span> <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="benefits">
            <HealthBenefits milletTypes={milletTypes} language={language} t={t} />
          </TabsContent>

          <TabsContent value="recipes">
            <Recipes recipes={[]} language={language} t={t} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
