// src/components/MilletInfo.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wheat, Heart, Leaf, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Recipes from "./Recipes";
import HealthBenefits from "./HealthBenefits"

import foxtailImg from "../assets/foxtail.jpeg";
import pearlImg from "../assets/pearl.jpeg";
import ragiImg from "../assets/ragi.jpeg"
// ✅ Millet types and recipes data
const milletTypes = [
  {
    name: "Foxtail Millet (Kangni)",
    nameHindi: "कंगनी",
    nameTamil: "தினை",
    nameKannada: "ನವಣೆ",
    nameTelugu: "కొర్రలు",
    image: foxtailImg,
    benefits: ["Rich in calcium and iron", "Helps control blood sugar", "Good for heart health", "High in dietary fiber"],
    nutrition: { protein: "12.3g", fiber: "8g", iron: "2.8mg", calcium: "31mg" }
  },
  // ... rest of milletTypes here (same as your original full array)
];

const recipes = [
  {
    name: "Ragi Mudde",
    nameHindi: "रागी मुद्दे",
    nameTamil: "ரகி கூழ்",
    nameKannada: "ರಾಗಿ ಮುದ್ದೆ",
    nameTelugu: "రాగి విషయం",
    millet: "Finger Millet",
    description: "Traditional Karnataka dish, nutritious ball made from ragi flour",
    time: "15 mins"
  },
  // ... rest of recipes here
];

export default function MilletInfo() {
  const [language, setLanguage] = React.useState(() => {
    return localStorage.getItem('preferredLanguage') || 'english';
  });

  const t = (en, hi, ta, kn, te) => {
    const translations = { english: en, hindi: hi, tamil: ta, kannada: kn, telugu: te };
    return translations[language] || en;
  };

  const getMilletName = (millet) => {
    if (language === 'hindi') return millet.nameHindi;
    if (language === 'tamil') return millet.nameTamil;
    if (language === 'kannada') return millet.nameKannada;
    if (language === 'telugu') return millet.nameTelugu;
    return millet.name;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-r from-amber-500 to-green-600 rounded-full mb-4">
            <Wheat className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("Shree Anna (Millets)", "श्री अन्न (श्री अन्न)", "சிறு தானியங்கள்", "ಶ್ರೀ ಅನ್ನ", "శ్రీ అన్నం")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t(
              "Millets - Ancient Superfoods for Modern Health. Celebrating the International Year of Millets 2023",
              "श्री अन्न - आधुनिक स्वास्थ्य के लिए प्राचीन सुपरफूड। अंतर्राष्ट्रीय श्री अन्न वर्ष 2023",
              "தினைகள் - நவீன சுகாதாரத்திற்கான பண்டைய சூப்பர்ஃபுட்ஸ்",
              "ಶ್ರೀಧಾನ್ಯಗಳು - ಆಧುನಿಕ ಆರೋಗ್ಯಕ್ಕಾಗಿ ಪುರಾತನ ಸೂಪರ್‌ಫುಡ್ಸ್",
              "సిరిధాన్యాలు - ఆధునిక ఆరోగ్యం కోసం పురాతన సూపర్‌ఫುడ్‌സ്"
            )}
          </p>
        </div>

        <Tabs defaultValue="types" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="types">
              {t("Millet Types", "श्री अन्न प्रकार", "தினை வகைகள்", "ಶ್ರೀಧಾನ್ಯ ಪ್ರಕಾರಗಳು", "సిరిధాన్యాల రకాలు")}
            </TabsTrigger>
            <TabsTrigger value="benefits">
              {t("Health Benefits", "स्वास्थ्य लाभ", "ஆரோக்கிய நன்மைகள்", "ಆರೋಗ್ಯ ಪ್ರಯೋಜನಗಳು", "ఆరోగ్య లాభాలు")}
            </TabsTrigger>
            <TabsTrigger value="recipes">
              {t("Recipes", "व्यंजन", "சமையல் குறிப்புகள்", "ಪಾಕವಿಧಾನಗಳು", "వంటకాలు")}
            </TabsTrigger>
          </TabsList>

          {/* Millet Types */}
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
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">
                        {t("Benefits:", "लाभ:", "நன்மைகள்:", "ಪ್ರಯೋಜನಗಳು:", "ప్రయోజನೆಗಳು:")}
                      </h4>
                      <ul className="space-y-1">
                        {millet.benefits.map((benefit, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-green-600">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gradient-to-r from-amber-50 to-green-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-xs text-gray-700 mb-2">
                        {t("Nutrition (per 100g):", "पोषण (प्रति 100 ग्राम):", "ஊட்டச்சத்து (100 கிராமுக்கு):", "ಪೋಷಣೆ (100 ಗ್ರಾಂಗೆ):", "పోషకాలు (100 గ్రాములకు):")}
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-600">{t("Protein:", "प्रोटीन:", "புரதம்:", "ಪ್ರೋಟೀನ್:", "ప్రోటీన్:")}</span>
                          <span className="ml-1 font-semibold">{millet.nutrition.protein}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">{t("Fiber:", "फाइबर:", "நார்ச்சத்து:", "ಫೈಬರ್:", "ఫైబర్:")}</span>
                          <span className="ml-1 font-semibold">{millet.nutrition.fiber}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">{t("Iron:", "आयरन:", "இரும்பு:", "ಕಬ್ಬಿಣ:", "ఇనుము:")}</span>
                          <span className="ml-1 font-semibold">{millet.nutrition.iron}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">{t("Calcium:", "कैल्शियम:", "கால்சியம்:", "ಕ್ಯಾಲ್ಸಿಯಂ:", "కాల్షియం:")}</span>
                          <span className="ml-1 font-semibold">{millet.nutrition.calcium}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="benefits">
            <HealthBenefits milletTypes={milletTypes} language={language} t={t} />
          </TabsContent>


          {/* Recipes */}
          <TabsContent value="recipes">
            <Recipes recipes={recipes} language={language} t={t} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
