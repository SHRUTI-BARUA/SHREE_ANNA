import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function Recipes({ language, t }) {
  const [openTips, setOpenTips] = useState({});

  const toggleTips = (idx) => {
    setOpenTips((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const getRecipeName = (recipe) => {
    if (language === "hindi") return recipe.nameHindi;
    if (language === "tamil") return recipe.nameTamil;
    if (language === "kannada") return recipe.nameKannada;
    if (language === "telugu") return recipe.nameTelugu;
    return recipe.name;
  };

  // Uniform gray badge for all millets
  const milletBadge = "bg-gray-200 text-gray-800";

  const cookingTips = [
    t(
      "Wash millets thoroughly to remove impurities.",
      "श्री अन्न को अच्छी तरह धोएँ।",
      "தினைகளை நன்கு துடைத்துக் கொள்ளவும்.",
      "ಧಾನ್ಯಗಳನ್ನು ಚೆನ್ನಾಗಿ ತೊಳೆಯಿರಿ.",
      "సిరిధాన్యాలను చక్కగా కడగండి."
    ),
    t(
      "Use 2–3 cups of water for 1 cup millet.",
      "1 कप श्री अन्न के लिए 2–3 कप पानी इस्तेमाल करें।",
      "1 கப் தினைக்கு 2–3 கப் தண்ணீர் பயன்படுத்தவும்.",
      "1 ಕಪ್ ಧಾನ್ಯಕ್ಕೆ 2–3 ಕಪ್ ನೀರು ಉಪಯೋಗಿಸಿ.",
      "1 కప్పు సిరిధాన్యానికి 2–3 కప్పులు నీరు ఉపయోగించండి."
    ),
    t(
      "Dry roasting improves flavor and digestion.",
      "सूखा भूनना स्वाद और पाचन सुधारता है।",
      "உலர்ந்த வதனம் சுவை மற்றும் செரிமானத்தை மேம்படுத்துகிறது.",
      "ಬೇಯಿಸುವುದು ರುಚಿ ಮತ್ತು ಜೀರ್ಣಶಕ್ತಿಯನ್ನು ಸುಧಾರಿಸುತ್ತದೆ.",
      "వెచ్చని కాల్చడం రుచి మరియు జీర్ణక్రియను మెరుగుపరుస్తుంది."
    ),
    t(
      "Millets can replace rice 1:1 in most recipes.",
      "अधिकांश व्यंजनों में चावल की जगह इस्तेमाल कर सकते हैं।",
      "பல சமையல் குறிப்புகளில் அரிசியின் பதிலாக பயன்படுத்தலாம்.",
      "ಬಹುತೇಕ ರೆಸಿಪಿಗಳಲ್ಲಿ ಅಕ್ಕಿಯನ್ನು ಬದಲಾಯಿಸಬಹುದು.",
      "చాలా వంటకాలలో అరిగిని సబ్స్టిట్యూట్ చేయవచ్చు."
    ),
  ];

  const recipes = [
    {
      name: "Foxtail Millet Upma",
      nameHindi: "कंगनी उपमा",
      nameTamil: "தினை உப்புமா",
      nameKannada: "ನವಣೆ ಉಪ್ಮಾ",
      nameTelugu: "కొర్ర ఉప్మా",
      millet: "Foxtail Millet",
      description: "Light, nutritious millet breakfast.",
      time: "20 mins",
      ingredients: [
        "1 cup foxtail millet",
        "1 onion",
        "1 carrot",
        "1/2 cup peas",
        "2 green chilies",
        "1 tsp mustard seeds",
        "1 tsp urad dal",
        "2 cups water",
        "Salt",
        "1 tbsp oil",
        "Curry leaves",
      ],
      steps: [
        "Dry roast millet 2-3 mins",
        "Heat oil, sauté mustard seeds, urad dal, curry leaves, onions, chilies",
        "Add vegetables, sauté 2 mins",
        "Add millet, water, salt, cook 15 mins",
        "Fluff and serve hot",
      ],
    },
    {
      name: "Ragi Dosa",
      nameHindi: "रागी दोसा",
      nameTamil: "ராகி தோசை",
      nameKannada: "ರಾಗಿ ದೋಸೆ",
      nameTelugu: "రాగి దోసె",
      millet: "Finger Millet",
      description: "Crispy protein-rich dosa.",
      time: "25 mins",
      ingredients: [
        "1 cup ragi flour",
        "1/4 cup rice flour",
        "1/2 cup yogurt",
        "1-2 green chilies",
        "1 tsp ginger",
        "Salt",
        "Water",
        "Oil",
      ],
      steps: [
        "Mix ingredients, add water for smooth batter",
        "Heat pan, spread batter thin, drizzle oil",
        "Cook till crisp, serve with chutney",
      ],
    },
    {
      name: "Jowar Roti",
      nameHindi: "ज्वार रोटी",
      nameTamil: "சோளம் ரொட்டி",
      nameKannada: "ಜೋಳ ರೊಟ್ಟಿ",
      nameTelugu: "జొన్న రొట్టి",
      millet: "Sorghum",
      description: "Soft, gluten-free roti.",
      time: "15 mins",
      ingredients: ["1 cup jowar flour", "Warm water", "Salt"],
      steps: [
        "Mix flour and salt, knead with water",
        "Roll rotis, cook on skillet until brown spots",
        "Serve hot",
      ],
    },
    {
      name: "Kodo Millet Pongal",
      nameHindi: "कोदन पोंगल",
      nameTamil: "வரகு பொங்கல்",
      nameKannada: "ಹಾರಕ ಪೊಂಗಲ್",
      nameTelugu: "కొదుమల పొಂಗల్",
      millet: "Kodo Millet",
      description: "Healthy South Indian pongal.",
      time: "30 mins",
      ingredients: [
        "1 cup Kodo millet",
        "1/4 cup moong dal",
        "2 cups water",
        "1 tsp ginger",
        "1-2 green chilies",
        "1 tsp black pepper",
        "Salt",
        "1 tbsp ghee",
        "Curry leaves",
      ],
      steps: [
        "Roast dal and millet",
        "Boil water, add millet, dal, ginger, chilies, salt",
        "Cook till soft",
        "Temper with ghee, curry leaves, pepper",
        "Serve hot",
      ],
    },
    {
      name: "Little Millet Khichdi",
      nameHindi: "कुटकी खिचड़ी",
      nameTamil: "சாமை கிச்சடி",
      nameKannada: "ಸಾವಿ ಖಿಚ್ಡಿ",
      nameTelugu: "సామల ఖిచ్డి",
      millet: "Little Millet",
      description: "Soft one-pot khichdi.",
      time: "20 mins",
      ingredients: [
        "1 cup little millet",
        "1/4 cup moong dal",
        "1 carrot",
        "1/2 cup peas",
        "1 onion",
        "2 cups water",
        "Salt",
        "1 tsp ghee",
        "Cumin seeds",
      ],
      steps: [
        "Wash millet and dal",
        "Heat ghee, add cumin and onions, sauté",
        "Add vegetables, millet, dal, water, salt, cook",
        "Serve hot",
      ],
    },
    {
      name: "Barnyard Millet Kheer",
      nameHindi: "सावा की खीर",
      nameTamil: "குதிரைவாலி பாயசம்",
      nameKannada: "ಒಡಲು ಕಹೀರ್",
      nameTelugu: "ఓడలు పాయసం",
      millet: "Barnyard Millet",
      description: "Sweet milk-based kheer.",
      time: "25 mins",
      ingredients: [
        "1/2 cup barnyard millet",
        "2 cups milk",
        "1/4 cup sugar/jaggery",
        "1/4 tsp cardamom",
        "Cashews, raisins",
      ],
      steps: [
        "Cook millet in milk",
        "Add sugar/jaggery, cardamom, cook till thick",
        "Garnish with nuts",
        "Serve warm",
      ],
    },
    {
      name: "Proso Millet Adai",
      nameHindi: "बार्री अडई",
      nameTamil: "பனிவரகு அடை",
      nameKannada: "ಅರಕೆ ಅದೈ",
      nameTelugu: "వరగుల అడె",
      millet: "Proso Millet",
      description: "Protein-rich lentil dosa.",
      time: "35 mins",
      ingredients: [
        "1 cup proso millet",
        "1/4 cup toor dal",
        "1/4 cup chana dal",
        "2 green chilies",
        "1 tsp ginger",
        "Salt",
        "Oil",
      ],
      steps: [
        "Soak millet and dals 4-5 hrs, grind with chilies, ginger, salt",
        "Spread thin on pan, drizzle oil, cook crisp",
        "Serve with chutney",
      ],
    },
    {
      name: "Pearl Millet Laddu",
      nameHindi: "बाजरा लड्डू",
      nameTamil: "கம்பு லட்டு",
      nameKannada: "ಸಜ್ಜೆ ಲಡ್ಡು",
      nameTelugu: "సజ్జల లడ్డూ",
      millet: "Pearl Millet",
      description: "Nutritious sweet laddu.",
      time: "15 mins",
      ingredients: [
        "1 cup pearl millet flour",
        "1/2 cup jaggery",
        "2 tbsp ghee",
        "1/4 tsp cardamom",
      ],
      steps: [
        "Roast flour",
        "Add jaggery and ghee, cook 2-3 mins",
        "Add cardamom, shape laddus",
        "Cool and serve",
      ],
    },
    {
      name: "Finger Millet Porridge",
      nameHindi: "रागी का हलवा",
      nameTamil: "ராகி பாயசம்",
      nameKannada: "ರಾಗಿ ಹಾಲುಹಿಟ್ಟು",
      nameTelugu: "రాగి పాయసం",
      millet: "Finger Millet",
      description: "Warm healthy millet porridge.",
      time: "20 mins",
      ingredients: [
        "1 cup ragi flour",
        "2 cups milk",
        "2 tbsp jaggery",
        "1/4 tsp cardamom",
      ],
      steps: [
        "Roast ragi lightly",
        "Add milk, cook till thick",
        "Add jaggery, cardamom",
        "Serve warm",
      ],
    },
    {
      name: "Little Millet Idli",
      nameHindi: "सामई इडली",
      nameTamil: "சாமை இட்லி",
      nameKannada: "ಸಾವಿ ಇಡ್ಲಿ",
      nameTelugu: "సామల ఇడ్లి",
      millet: "Little Millet",
      description: "Soft steamed idlis.",
      time: "25 mins",
      ingredients: ["1 cup little millet", "1/4 cup urad dal", "Salt", "Water"],
      steps: [
        "Soak millet and dal",
        "Grind to batter, ferment overnight",
        "Steam 10-12 mins",
        "Serve with chutney",
      ],
    },
    {
      name: "Foxtail Millet Salad",
      nameHindi: "कंगनी सलाद",
      nameTamil: "தினை சாலட்",
      nameKannada: "ನವಣೆ ಸಲಾಡ್",
      nameTelugu: "కొర్ర సలాడ్",
      millet: "Foxtail Millet",
      description: "Refreshing millet salad.",
      time: "15 mins",
      ingredients: [
        "1 cup foxtail millet",
        "1 cucumber",
        "1 tomato",
        "Lemon juice",
        "Salt",
        "Pepper",
      ],
      steps: [
        "Cook millet and cool",
        "Mix with vegetables, seasoning",
        "Serve chilled",
      ],
    },
    {
      name: "Kodo Millet Upma",
      nameHindi: "कोदन उपमा",
      nameTamil: "வரகு உப்புமா",
      nameKannada: "ಹಾರಕ ಉಪ್ಮಾ",
      nameTelugu: "కొదుమల ఉప్మా",
      millet: "Kodo Millet",
      description: "Savory millet breakfast dish.",
      time: "20 mins",
      ingredients: [
        "1 cup kodo millet",
        "1 onion",
        "1 carrot",
        "Green chilies",
        "Curry leaves",
        "Salt",
        "2 cups water",
      ],
      steps: [
        "Roast millet",
        "Sauté vegetables",
        "Add millet and water, cook till done",
        "Serve hot",
      ],
    },
    {
      name: "Barnyard Millet Pongal",
      nameHindi: "सावा पोंगल",
      nameTamil: "குதிரைவாலி பொங்கல்",
      nameKannada: "ಒಡಲು ಪೊಂಗಲ್",
      nameTelugu: "ఓడలు పొంగల్",
      millet: "Barnyard Millet",
      description: "Traditional South Indian dish.",
      time: "30 mins",
      ingredients: [
        "1 cup barnyard millet",
        "1/4 cup moong dal",
        "Water",
        "Ghee",
        "Curry leaves",
        "Salt",
      ],
      steps: [
        "Cook millet and dal with water",
        "Temper with ghee and spices",
        "Serve warm",
      ],
    },
    {
      name: "Pearl Millet Pancakes",
      nameHindi: "बाजरा पैनकेक",
      nameTamil: "கம்பு பான்கேக்",
      nameKannada: "ಸಜ್ಜೆ ಪ್ಯಾಂಕೆಕ್",
      nameTelugu: "సజ్జల ప్యాంకేక్స్",
      millet: "Pearl Millet",
      description: "Fluffy nutritious pancakes.",
      time: "25 mins",
      ingredients: [
        "1 cup pearl millet flour",
        "1 egg",
        "1/2 cup milk",
        "1 tsp baking powder",
        "Salt",
      ],
      steps: [
        "Mix ingredients to batter",
        "Cook on pan until golden",
        "Serve hot with honey",
      ],
    },
    {
      name: "Proso Millet Veggie Bowl",
      nameHindi: "बार्री सब्ज़ियों का कटोरा",
      nameTamil: "பனிவரகு காய்கறி வண்டி",
      nameKannada: "ಅರಕೆ ತರಕಾರಿಗಳ ಬೌಲ್",
      nameTelugu: "వరగుల కూరగాయ బౌల్",
      millet: "Proso Millet",
      description: "Healthy millet with vegetables.",
      time: "20 mins",
      ingredients: [
        "1 cup proso millet",
        "Mixed vegetables",
        "Olive oil",
        "Salt",
        "Pepper",
        "Lemon juice",
      ],
      steps: [
        "Cook millet",
        "Sauté vegetables",
        "Mix together with seasoning",
        "Serve warm",
      ],
    },
    {
      name: "Foxtail Millet Idiyappam",
      nameHindi: "कंगनी इडियप्पम",
      nameTamil: "தினை இடியப்பம்",
      nameKannada: "ನವಣೆ ಇಡಿಯಪ್ಪಂ",
      nameTelugu: "కొర్ర ఇడియప్పం",
      millet: "Foxtail Millet",
      description: "Steamed millet string hoppers.",
      time: "30 mins",
      ingredients: ["1 cup foxtail millet flour", "Water", "Salt"],
      steps: [
        "Mix flour with water and salt",
        "Press into idiyappam mold",
        "Steam 10-12 mins",
        "Serve with coconut milk",
      ],
    },
    {
      name: "Ragi Malt",
      nameHindi: "रागी माल्ट",
      nameTamil: "ராகி மால்ட்",
      nameKannada: "ರಾಗಿ ಮಾಲ್ಟ್",
      nameTelugu: "రాగి మాల్ట్",
      millet: "Finger Millet",
      description: "Warm and healthy drink.",
      time: "15 mins",
      ingredients: ["2 tbsp ragi flour", "1 cup milk", "1 tsp jaggery"],
      steps: [
        "Mix ragi in milk",
        "Cook till thick",
        "Add jaggery",
        "Serve warm",
      ],
    },
    {
      name: "Little Millet Veg Pulao",
      nameHindi: "सामई पुलाव",
      nameTamil: "சாமை புலாவ்",
      nameKannada: "ಸಾವಿ ಪಲಾವ್",
      nameTelugu: "సామల పులావ్",
      millet: "Little Millet",
      description: "Fragrant millet pulao.",
      time: "25 mins",
      ingredients: [
        "1 cup little millet",
        "Mixed vegetables",
        "1 tsp oil",
        "Salt",
        "Spices",
      ],
      steps: [
        "Cook millet",
        "Sauté vegetables with spices",
        "Mix together",
        "Serve hot",
      ],
    },
    {
      name: "Kodo Millet Sweet Pongal",
      nameHindi: "कोदन मीठा पोंगल",
      nameTamil: "வரகு இனிப்பு பொங்கல்",
      nameKannada: "ಹಾರಕ ಸಿಹಿ ಪೊಂಗಲ್",
      nameTelugu: "కొదుమల మిఠాయి పొంగల్",
      millet: "Kodo Millet",
      description: "Sweet festive millet dish.",
      time: "30 mins",
      ingredients: [
        "1 cup kodo millet",
        "1/2 cup jaggery",
        "2 cups water",
        "Cardamom",
        "Ghee",
      ],
      steps: [
        "Cook millet in water",
        "Add jaggery and cardamom",
        "Cook till soft",
        "Temper with ghee",
        "Serve warm",
      ],
    },
    {
      name: "Pearl Millet Ladoo",
      nameHindi: "बाजरा लड्डू",
      nameTamil: "கம்பு லட்டு",
      nameKannada: "ಸಜ್ಜೆ ಲಡ್ಡು",
      nameTelugu: "సజ్జల లడ్డూ",
      millet: "Pearl Millet",
      description: "Sweet nutritious balls.",
      time: "20 mins",
      ingredients: [
        "1 cup pearl millet flour",
        "1/2 cup jaggery",
        "2 tbsp ghee",
        "Cardamom powder",
      ],
      steps: [
        "Roast flour",
        "Mix with jaggery and ghee",
        "Shape laddus",
        "Cool and serve",
      ],
    },
  ];

  return (
    <section className="recipes-section space-y-8 px-4 md:px-8 lg:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe, idx) => (
          <Card
            key={idx}
            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            <CardHeader className="p-4 bg-gray-50 flex justify-between items-start">
              <div>
                <CardTitle className="text-lg font-bold">{recipe.name}</CardTitle>
                <p className="text-sm text-amber-600">{getRecipeName(recipe)}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${milletBadge}`}
              >
                {recipe.millet}
              </span>
            </CardHeader>

            <CardContent className="p-4">
              <p className="text-gray-700 mb-2">{recipe.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">⏱ {recipe.time}</span>
                <span className="flex items-center gap-1">
                  👨‍🍳{" "}
                  {t(
                    "Easy to make",
                    "बनाने में आसान",
                    "செய்வது எளிது",
                    "ಮಾಡಲು ಸುಲಭ",
                    "చేయడం సులభం"
                  )}
                </span>
              </div>

              <h4 className="font-semibold text-gray-800 mb-1">Ingredients:</h4>
              <ul className="list-disc pl-5 text-gray-700 mb-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>

              <h4 className="font-semibold text-gray-800 mb-1">Steps:</h4>
              <ol className="list-decimal list-inside text-gray-700 mb-2">
                {recipe.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>

              <button
                onClick={() => toggleTips(idx)}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                {openTips[idx]
                  ? t(
                      "Hide Cooking Tips",
                      "टिप्स छुपाएँ",
                      "சமையல் குறிப்புகள் மறை",
                      "ಟಿಪ್ಸ್ ಮುಚ್ಚಿ",
                      "వంటక సూచనలు దాచు"
                    )
                  : t(
                      "Show Cooking Tips",
                      "टिप्स दिखाएँ",
                      "சமையல் குறிப்புகள் காண்பி",
                      "ಟಿಪ್ಸ್ ತೋರಿಸಿ",
                      "వంటక సూచనలు చూపు"
                    )}
              </button>

              {openTips[idx] && (
                <ul className="list-disc list-inside mt-2 text-gray-700 bg-gray-50 p-2 rounded-md">
                  {cookingTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
