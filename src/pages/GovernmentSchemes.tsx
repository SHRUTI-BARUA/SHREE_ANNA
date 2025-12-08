
// // import { useEffect, useState } from "react";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Landmark, CheckCircle, ExternalLink } from "lucide-react";

// // export default function GovernmentSchemes() {
// //   const [schemes, setSchemes] = useState<any[]>([]);
// //   const [searchTerm, setSearchTerm] = useState("");

// //   useEffect(() => {
// //     async function fetchSchemes() {
// //       try {
// //         const response = await fetch(
// //           "https://raw.githubusercontent.com/snehasinghals/GovernmentScheme/refs/heads/main/schemes.json"
// //         );
// //         const data = await response.json();
// //         setSchemes(data);
// //       } catch (error) {
// //         console.error("Error fetching schemes:", error);
// //       }
// //     }
// //     fetchSchemes();
// //   }, []);

// //   const filteredSchemes = schemes.filter(
// //     (scheme) =>
// //       scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       scheme.category.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const categories = [...new Set(schemes.map((s) => s.category))];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="mb-8 flex items-center gap-4">
// //           <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
// //             <Landmark className="w-8 h-8 text-white" />
// //           </div>
// //           <div>
// //             <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
// //               Government Schemes & Subsidies
// //             </h1>
// //             <p className="text-lg text-gray-600">सरकारी योजनाएं और सब्सिडी</p>
// //           </div>
// //         </div>
// //         <p className="text-gray-700 mb-6">
// //           Access financial support, subsidies, and certifications for millet entrepreneurship
// //         </p>

// //         {/* Search */}
// //         <Input
// //           placeholder="Search schemes by name, category, or description..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           className="mb-8 h-12"
// //         />

// //         {/* Quick Stats */}
// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
// //           <Card>
// //             <CardContent className="p-4 text-center">
// //               <p className="text-3xl font-bold text-orange-600">{schemes.length}</p>
// //               <p className="text-sm text-gray-600">Total Schemes</p>
// //             </CardContent>
// //           </Card>
// //           <Card>
// //             <CardContent className="p-4 text-center">
// //               <p className="text-3xl font-bold text-green-600">{categories.length}</p>
// //               <p className="text-sm text-gray-600">Categories</p>
// //             </CardContent>
// //           </Card>
// //           <Card>
// //             <CardContent className="p-4 text-center">
// //               <p className="text-3xl font-bold text-blue-600">₹1L Cr+</p>
// //               <p className="text-sm text-gray-600">Total Allocation</p>
// //             </CardContent>
// //           </Card>
// //           <Card>
// //             <CardContent className="p-4 text-center">
// //               <p className="text-3xl font-bold text-purple-600">100%</p>
// //               <p className="text-sm text-gray-600">Active Schemes</p>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* Schemes List */}
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //           {filteredSchemes.map((scheme) => (
// //             <Card key={scheme.id} className="shadow-lg hover:shadow-xl transition-shadow">
// //               <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
// //                 <div className="flex items-start justify-between">
// //                   <div className="flex-1 text-left">
// //                     <CardTitle className="text-lg mb-2">{scheme.name}</CardTitle>
// //                     {scheme.nameHi && <p className="text-sm text-gray-600 mb-2">{scheme.nameHi}</p>}
// //                     <div className="flex flex-wrap gap-2">
// //                       <Badge className="bg-orange-100 text-orange-800">{scheme.category}</Badge>
// //                       <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
// //                         <CheckCircle className="w-3 h-3" /> {scheme.status}
// //                       </Badge>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </CardHeader>

// //               <CardContent className="p-6 text-left">
// //                 <p className="text-gray-700 mb-4">{scheme.description}</p>
// //                 {scheme.descriptionHi && (
// //                   <p className="text-sm text-gray-600 mb-4 italic">{scheme.descriptionHi}</p>
// //                 )}

// //                 {scheme.benefits?.length > 0 && (
// //                   <div className="mb-4">
// //                     <h4 className="font-semibold text-sm text-gray-700 mb-2">Key Benefits:</h4>
// //                     <ul className="space-y-1">
// //                       {scheme.benefits.map((benefit: string, i: number) => (
// //                         <li key={i} className="text-sm text-gray-600 flex gap-2">
// //                           <span className="text-green-600 mt-0.5">✓</span>
// //                           <span>{benefit}</span>
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </div>
// //                 )}

// //                 <div className="mb-4 p-3 bg-blue-50 rounded-lg">
// //                   <p className="text-sm">
// //                     <strong>Eligibility:</strong> {Array.isArray(scheme.eligibility) ? scheme.eligibility.join(", ") : scheme.eligibility}
// //                   </p>
// //                   {scheme.ministry && (
// //                     <p className="text-xs text-gray-600 mt-1">
// //                       <strong>Ministry:</strong> {scheme.ministry}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Apply Button */}
// //                 <div className="flex justify-start">
// //                   {scheme.apply_link ? (
// //                     <a
// //                       href={scheme.apply_link}
// //                       target="_blank"
// //                       rel="noopener noreferrer"
// //                       className="flex-1 md:flex-none w-full"
// //                     >
// //                       <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 w-full flex items-center justify-center">
// //                         <ExternalLink className="w-4 h-4 mr-2" />
// //                         Apply Online
// //                       </Button>
// //                     </a>
// //                   ) : (
// //                     <Button
// //                       disabled
// //                       className="bg-gray-300 cursor-not-allowed w-full flex items-center justify-center"
// //                     >
// //                       Apply Online
// //                     </Button>
// //                   )}
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Landmark, CheckCircle, ExternalLink } from "lucide-react";

// interface Scheme {
//   id: string;
//   name: string;
//   nameHi?: string;
//   description: string;
//   descriptionHi?: string;
//   category: string;
//   status: string;
//   benefits?: string[];
//   eligibility?: string[] | string;
//   ministry?: string;
//   apply_link?: string;
// }

// export default function GovernmentSchemes() {
//   const [schemes, setSchemes] = useState<Scheme[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     async function fetchSchemes() {
//       const cached = localStorage.getItem("schemes");
//       if (cached) setSchemes(JSON.parse(cached));

//       try {
//         const response = await fetch(
//           "https://raw.githubusercontent.com/snehasinghals/GovernmentScheme/main/schemes.json"
//         );
//         if (!response.ok) throw new Error("Failed to fetch schemes");
//         const data: Scheme[] = await response.json();
//         setSchemes(data);
//         localStorage.setItem("schemes", JSON.stringify(data));
//       } catch (error) {
//         console.error("Error fetching schemes:", error);
//       }
//     }
//     fetchSchemes();
//   }, []);

//   const filteredSchemes = schemes.filter(
//     (scheme) =>
//       scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       scheme.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const categories = [...new Set(schemes.map((s) => s.category))];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8 flex items-center gap-4">
//           <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
//             <Landmark className="w-8 h-8 text-white" />
//           </div>
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
//               Government Schemes & Subsidies
//             </h1>
//             <p className="text-lg text-gray-600">सरकारी योजनाएं और सब्सिडी</p>
//           </div>
//         </div>

//         <Input
//           placeholder="Search schemes by name, category, or description..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="mb-8 h-12"
//         />

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {filteredSchemes.map((scheme) => (
//             <Card key={scheme.id} className="shadow-lg hover:shadow-xl transition-shadow">
//               <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1 text-left">
//                     <CardTitle className="text-lg mb-2">{scheme.name}</CardTitle>
//                     {scheme.nameHi && <p className="text-sm text-gray-600 mb-2">{scheme.nameHi}</p>}
//                     <div className="flex flex-wrap gap-2">
//                       <Badge className="bg-orange-100 text-orange-800">{scheme.category}</Badge>
//                       <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
//                         <CheckCircle className="w-3 h-3" /> {scheme.status}
//                       </Badge>
//                     </div>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent className="p-6 text-left">
//                 <p className="text-gray-700 mb-4">{scheme.description}</p>
//                 {scheme.descriptionHi && <p className="text-sm text-gray-600 mb-4 italic">{scheme.descriptionHi}</p>}
//                 {scheme.benefits?.length > 0 && (
//                   <div className="mb-4">
//                     <h4 className="font-semibold text-sm text-gray-700 mb-2">Key Benefits:</h4>
//                     <ul className="space-y-1">
//                       {scheme.benefits.map((b, i) => (
//                         <li key={i} className="text-sm text-gray-600 flex gap-2">
//                           <span className="text-green-600 mt-0.5">✓</span>
//                           <span>{b}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//                 <div className="mb-4 p-3 bg-blue-50 rounded-lg">
//                   <p className="text-sm">
//                     <strong>Eligibility:</strong> {Array.isArray(scheme.eligibility) ? scheme.eligibility.join(", ") : scheme.eligibility}
//                   </p>
//                   {scheme.ministry && <p className="text-xs text-gray-600 mt-1"><strong>Ministry:</strong> {scheme.ministry}</p>}
//                 </div>
//                 <div className="flex justify-start">
//                   {scheme.apply_link ? (
//                     <a href={scheme.apply_link} target="_blank" rel="noopener noreferrer" className="w-full">
//                       <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 w-full flex items-center justify-center">
//                         <ExternalLink className="w-4 h-4 mr-2" />
//                         Apply Online
//                       </Button>
//                     </a>
//                   ) : (
//                     <Button disabled className="bg-gray-300 cursor-not-allowed w-full flex items-center justify-center">
//                       Apply Online
//                     </Button>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Landmark, CheckCircle, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Scheme {
  id: string;
  name: string;
  nameHi?: string;
  description: string;
  descriptionHi?: string;
  category: string;
  status: string;
  benefits?: string[];
  eligibility?: string[] | string;
  ministry?: string;
  apply_link?: string;
}

export default function GovernmentSchemes() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchSchemes() {
      // Load from cache first
      const cached = localStorage.getItem("schemes");
      if (cached) setSchemes(JSON.parse(cached));

      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/snehasinghals/GovernmentScheme/main/schemes.json"
        );
        if (!response.ok) throw new Error("Failed to fetch schemes");
        const data: Scheme[] = await response.json();
        setSchemes(data);
        localStorage.setItem("schemes", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching schemes:", error);
      }
    }
    fetchSchemes();
  }, []);

  const filteredSchemes = schemes.filter(
    (scheme) =>
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(schemes.map((s) => s.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
            <Landmark className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t("governmentSchemes.title")}
            </h1>
            <p className="text-lg text-gray-600">{t("governmentSchemes.subtitle")}</p>
          </div>
        </div>

        {/* Search */}
        <Input
          placeholder={t("governmentSchemes.searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-8 h-12"
        />

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-orange-600">{schemes.length}</p>
              <p className="text-sm text-gray-600">{t("governmentSchemes.stats.totalSchemes")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{categories.length}</p>
              <p className="text-sm text-gray-600">{t("governmentSchemes.stats.categories")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">₹1L Cr+</p>
              <p className="text-sm text-gray-600">{t("governmentSchemes.stats.totalAllocation")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-purple-600">100%</p>
              <p className="text-sm text-gray-600">{t("governmentSchemes.stats.activeSchemes")}</p>
            </CardContent>
          </Card>
        </div>

        {/* Schemes List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSchemes.map((scheme) => (
            <Card key={scheme.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1 text-left">
                    <CardTitle className="text-lg mb-2">{scheme.name}</CardTitle>
                    {scheme.nameHi && (
                      <p className="text-sm text-gray-600 mb-2">{scheme.nameHi}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-orange-100 text-orange-800">{scheme.category}</Badge>
                      <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> {scheme.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 text-left">
                <p className="text-gray-700 mb-4">{scheme.description}</p>
                {scheme.descriptionHi && (
                  <p className="text-sm text-gray-600 mb-4 italic">{scheme.descriptionHi}</p>
                )}

                {scheme.benefits?.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">
                      {t("governmentSchemes.card.keyBenefits")}
                    </h4>
                    <ul className="space-y-1">
                      {scheme.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm text-gray-600 flex gap-2">
                          <span className="text-green-600 mt-0.5">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm">
                    <strong>{t("governmentSchemes.card.eligibility")}</strong>{" "}
                    {Array.isArray(scheme.eligibility)
                      ? scheme.eligibility.join(", ")
                      : scheme.eligibility}
                  </p>
                  {scheme.ministry && (
                    <p className="text-xs text-gray-600 mt-1">
                      <strong>{t("governmentSchemes.card.ministry")}</strong> {scheme.ministry}
                    </p>
                  )}
                </div>

                <div className="flex justify-start">
                  {scheme.apply_link ? (
                    <a
                      href={scheme.apply_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 w-full flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t("governmentSchemes.card.applyOnline")}
                      </Button>
                    </a>
                  ) : (
                    <Button
                      disabled
                      className="bg-gray-300 cursor-not-allowed w-full flex items-center justify-center"
                    >
                      {t("governmentSchemes.card.applyOnline")}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
