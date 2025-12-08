import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle, Calendar, FileText } from "lucide-react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

// TypeScript types
type ParametersTested = {
  moisture_content?: number;
  protein_content?: number;
};

type Certificate = {
  id: number;
  certificate_number: string;
  grade_assigned?: string;
  testing_date: string;
  testing_agency: string;
  organic_certified?: boolean;
  parameters_tested?: ParametersTested;
  blockchain_hash?: string;
  certificate_url?: string;
};

export default function Certificates() {
  const { t } = useTranslation();
  // TODO: Replace with Supabase query when ready
  // Fetch certificates using React Query
  const { data: certificates = [], isLoading } = useQuery<Certificate[]>({
    queryKey: ["certificates"],
    queryFn: async () => {
      // Placeholder - to be replaced with Supabase query
      return [];
    },
    initialData: [],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("certificates.title")}</h1>
          <p className="text-gray-600">{t("certificates.subtitle")}</p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : certificates.length === 0 ? (
          // Empty State
          <div className="text-center py-20">
            <Award className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              {t("certificates.emptyTitle")}
            </h3>
            <p className="text-gray-500">{t("certificates.emptySubtitle")}</p>
          </div>
        ) : (
          // Certificates Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    {t("certificates.title")} #{cert.certificate_number}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {/* Grade */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{t("certificates.grade")}</span>
                      <Badge className="bg-amber-100 text-amber-800">
                        {cert.grade_assigned?.toUpperCase() || "N/A"}
                      </Badge>
                    </div>

                    {/* Testing Date */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{t("certificates.testingDate")}</span>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3" />
                        {cert.testing_date ? format(new Date(cert.testing_date), "MMM d, yyyy") : "N/A"}
                      </div>
                    </div>

                    {/* Testing Agency */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{t("certificates.testingAgency")}</span>
                      <span className="text-sm font-semibold">{cert.testing_agency || "N/A"}</span>
                    </div>

                    {/* Organic Certified */}
                    {cert.organic_certified && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">{t("certificates.organicCertified")}</span>
                      </div>
                    )}

                    {/* Parameters Tested */}
                    {cert.parameters_tested && (
                      <div className="pt-3 border-t">
                        <p className="text-xs text-gray-500 mb-2">{t("certificates.parameters")}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {cert.parameters_tested.moisture_content !== undefined && (
                            <div>
                              <span className="text-gray-600">{t("certificates.moisture")}</span>
                              <span className="ml-1 font-semibold">
                                {cert.parameters_tested.moisture_content}%
                              </span>
                            </div>
                          )}
                          {cert.parameters_tested.protein_content !== undefined && (
                            <div>
                              <span className="text-gray-600">{t("certificates.protein")}</span>
                              <span className="ml-1 font-semibold">
                                {cert.parameters_tested.protein_content}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Blockchain Hash */}
                    {cert.blockchain_hash && (
                      <div className="pt-3 border-t">
                        <p className="text-xs text-gray-500 mb-1">{t("certificates.blockchain")}</p>
                        <p className="text-xs font-mono text-gray-700 truncate">
                          {cert.blockchain_hash}
                        </p>
                      </div>
                    )}

                    {/* Certificate URL */}
                    {cert.certificate_url && (
                      <a
                        href={cert.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm mt-4"
                      >
                        <FileText className="w-4 h-4" />
                        {t("certificates.viewCertificate")}
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
