import i18n from "i18next";
import { initReactI18next } from "react-i18next";

type SupportedLanguage = "en" | "hi";

const STORAGE_KEY = "appLanguage";

const resources = {
  en: {
    translation: {
      navigation: "NAVIGATION",
      language: {
        switchToHindi: "Switch to Hindi",
        switchToEnglish: "Switch to English",
      },
      nav: {
        dashboard: "Dashboard",
        marketplace: "Marketplace",
        myProducts: "My Products",
        myOrders: "My Orders",
        qualityCertificates: "Quality Certificates",
        marketInsights: "Market Insights",
        milletInfo: "Millet Info",
        traceability: "Traceability",
        branding: "Branding",
        govtSchemes: "Govt Schemes",
        profile: "Profile",
        signOut: "Sign Out",
      },
      profile: {
        title: "Profile Management",
        subtitle: "Complete your profile to start using the platform.",
        tabs: {
          farmer: "Farmer/FPO/SHG Profile",
          buyer: "Buyer/Consumer Profile",
        },
        farmerTitle: "Farmer Profile",
        buyerTitle: "Buyer Profile",
        form: {
          profileTypeLabel: "Profile Type",
          profileTypePlaceholder: "Select profile type",
          profileTypeIndividual: "Individual Farmer",
          profileTypeFpo: "FPO/SHG",
          contactPersonLabel: "Contact Person Name",
          contactPersonPlaceholder: "Enter contact person name",
          stateLabel: "State",
          statePlaceholder: "Enter state",
          villageLabel: "Village",
          villagePlaceholder: "Enter village",
          farmSizeLabel: "Farm Size (acres)",
          bankAccountLabel: "Bank Account Number",
          bankAccountPlaceholder: "Enter bank account number",
          organizationLabel: "Organization Name (if FPO/SHG)",
          organizationPlaceholder: "Enter organization name",
          phoneLabel: "Phone Number",
          phonePlaceholder: "Enter phone number",
          districtLabel: "District",
          districtPlaceholder: "Enter district",
          pincodeLabel: "Pincode",
          pincodePlaceholder: "Enter pincode",
          preferredLanguageLabel: "Preferred Language",
          preferredLanguagePlaceholder: "Select language",
          ifscLabel: "IFSC Code",
          ifscPlaceholder: "Enter IFSC code",
          businessNameLabel: "Business Name",
          businessNamePlaceholder: "Enter business name",
          businessTypeLabel: "Business Type",
          businessTypePlaceholder: "Select business type",
          businessTypeProcessor: "Processor",
          businessTypeTrader: "Trader",
          businessTypeConsumer: "Consumer",
          businessTypeRetailer: "Retailer",
          gstLabel: "GST Number",
          gstPlaceholder: "Enter GST number",
          languageOptionEnglish: "English",
          languageOptionHindi: "Hindi",
          languageOptionMalayalam: "Malayalam",
          languageOptionTamil: "Tamil",
          languageOptionTelugu: "Telugu",
          languageOptionKannada: "Kannada",
          saving: "Saving...",
          saveFarmer: "Save Farmer Profile",
          saveBuyer: "Save Buyer Profile",
        },
        toast: {
          savedTitle: "Profile saved!",
          farmerSavedDesc: "Your farmer profile has been saved successfully.",
          buyerSavedDesc: "Your buyer profile has been saved successfully.",
          errorTitle: "Error",
          errorMessage: "Failed to save profile. Please try again.",
        },
      },
    },
  },
  hi: {
    translation: {
      navigation: "नेविगेशन",
      language: {
        switchToHindi: "हिंदी में बदलें",
        switchToEnglish: "Switch to English",
      },
      nav: {
        dashboard: "डैशबोर्ड",
        marketplace: "मार्केटप्लेस",
        myProducts: "मेरे उत्पाद",
        myOrders: "मेरे ऑर्डर",
        qualityCertificates: "गुणवत्ता प्रमाणपत्र",
        marketInsights: "बाजार जानकारी",
        milletInfo: "मोटे अनाज की जानकारी",
        traceability: "ट्रेसेबिलिटी",
        branding: "ब्रांडिंग",
        govtSchemes: "सरकारी योजनाएँ",
        profile: "प्रोफ़ाइल",
        signOut: "साइन आउट",
      },
      profile: {
        title: "प्रोफ़ाइल प्रबंधन",
        subtitle: "प्लेटफ़ॉर्म का उपयोग शुरू करने के लिए अपनी प्रोफ़ाइल पूरी करें।",
        tabs: {
          farmer: "किसान/FPO/SHG प्रोफ़ाइल",
          buyer: "खरीदार/उपभोक्ता प्रोफ़ाइल",
        },
        farmerTitle: "किसान प्रोफ़ाइल",
        buyerTitle: "खरीदार प्रोफ़ाइल",
        form: {
          profileTypeLabel: "प्रोफ़ाइल प्रकार",
          profileTypePlaceholder: "प्रोफ़ाइल प्रकार चुनें",
          profileTypeIndividual: "व्यक्तिगत किसान",
          profileTypeFpo: "FPO/SHG",
          contactPersonLabel: "संपर्क व्यक्ति का नाम",
          contactPersonPlaceholder: "संपर्क व्यक्ति का नाम दर्ज करें",
          stateLabel: "राज्य",
          statePlaceholder: "राज्य दर्ज करें",
          villageLabel: "गांव",
          villagePlaceholder: "गांव दर्ज करें",
          farmSizeLabel: "खेत का आकार (एकड़)",
          bankAccountLabel: "बैंक खाता संख्या",
          bankAccountPlaceholder: "बैंक खाता संख्या दर्ज करें",
          organizationLabel: "संगठन का नाम (यदि FPO/SHG)",
          organizationPlaceholder: "संगठन का नाम दर्ज करें",
          phoneLabel: "फोन नंबर",
          phonePlaceholder: "फोन नंबर दर्ज करें",
          districtLabel: "जिला",
          districtPlaceholder: "जिला दर्ज करें",
          pincodeLabel: "पिनकोड",
          pincodePlaceholder: "पिनकोड दर्ज करें",
          preferredLanguageLabel: "पसंदीदा भाषा",
          preferredLanguagePlaceholder: "भाषा चुनें",
          ifscLabel: "आईएफएससी कोड",
          ifscPlaceholder: "आईएफएससी कोड दर्ज करें",
          businessNameLabel: "व्यवसाय का नाम",
          businessNamePlaceholder: "व्यवसाय का नाम दर्ज करें",
          businessTypeLabel: "व्यवसाय का प्रकार",
          businessTypePlaceholder: "व्यवसाय प्रकार चुनें",
          businessTypeProcessor: "प्रोसेसर",
          businessTypeTrader: "व्यापारी",
          businessTypeConsumer: "उपभोक्ता",
          businessTypeRetailer: "रिटेलर",
          gstLabel: "जीएसटी नंबर",
          gstPlaceholder: "जीएसटी नंबर दर्ज करें",
          languageOptionEnglish: "अंग्रेज़ी",
          languageOptionHindi: "हिंदी",
          languageOptionMalayalam: "मलयालम",
          languageOptionTamil: "तमिल",
          languageOptionTelugu: "तेलुगु",
          languageOptionKannada: "कन्नड़",
          saving: "सहेजा जा रहा है...",
          saveFarmer: "किसान प्रोफ़ाइल सहेजें",
          saveBuyer: "खरीदार प्रोफ़ाइल सहेजें",
        },
        toast: {
          savedTitle: "प्रोफ़ाइल सहेजी गई!",
          farmerSavedDesc: "आपकी किसान प्रोफ़ाइल सफलतापूर्वक सहेजी गई है।",
          buyerSavedDesc: "आपकी खरीदार प्रोफ़ाइल सफलतापूर्वक सहेजी गई है।",
          errorTitle: "त्रुटि",
          errorMessage: "प्रोफ़ाइल सहेजने में विफल। कृपया पुनः प्रयास करें।",
        },
      },
    },
  },
};

const getInitialLanguage = (): SupportedLanguage => {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "hi") return "hi";
  return "en";
};

const initialLanguage = getInitialLanguage();

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

if (typeof window !== "undefined") {
  document.documentElement.lang = initialLanguage;
  i18n.on("languageChanged", (lng) => {
    localStorage.setItem(STORAGE_KEY, lng);
    document.documentElement.lang = lng;
  });
}

export default i18n;
