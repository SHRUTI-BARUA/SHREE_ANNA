import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2, User, Save } from "lucide-react";
import { useTranslation } from "react-i18next";

// Schemas with translation keys for errors (resolved via i18n at render time)
const farmerProfileSchema = z.object({
  profileType: z.string().min(1, "profile.errors.profileTypeRequired"),
  contactPersonName: z.string().min(1, "profile.errors.contactPersonRequired"),
  organizationName: z.string().optional(),
  phoneNumber: z.string().min(10, "profile.errors.phoneRequired"),
  state: z.string().min(1, "profile.errors.stateRequired"),
  district: z.string().min(1, "profile.errors.districtRequired"),
  village: z.string().optional(),
  pincode: z.string().optional(),
  farmSizeAcres: z.string().optional(),
  preferredLanguage: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  ifscCode: z.string().optional(),
});

const buyerProfileSchema = z.object({
  contactPersonName: z.string().min(1, "profile.errors.contactPersonRequired"),
  businessName: z.string().optional(),
  businessType: z.string().optional(),
  phoneNumber: z.string().min(10, "profile.errors.phoneRequired"),
  state: z.string().min(1, "profile.errors.stateRequired"),
  district: z.string().min(1, "profile.errors.districtRequired"),
  village: z.string().optional(),
  pincode: z.string().optional(),
  preferredLanguage: z.string().optional(),
  gstNumber: z.string().optional(),
});

type FarmerProfileFormData = z.infer<typeof farmerProfileSchema>;
type BuyerProfileFormData = z.infer<typeof buyerProfileSchema>;

export default function ProfileManagement() {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"farmer" | "buyer">("farmer");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const farmerForm = useForm<FarmerProfileFormData>({
    resolver: zodResolver(farmerProfileSchema),
    defaultValues: {
      profileType: "Individual Farmer",
      preferredLanguage: "English",
      farmSizeAcres: "0",
    },
  });

  const buyerForm = useForm<BuyerProfileFormData>({
    resolver: zodResolver(buyerProfileSchema),
    defaultValues: {
      preferredLanguage: "English",
    },
  });

  // Fetch existing profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      setIsFetching(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          // PGRST116 is "not found" error
          console.error("Error fetching profile:", error);
        } else if (data) {
          if (data.profile_type === "farmer") {
            setActiveTab("farmer");
            farmerForm.reset({
              profileType: data.organization_name ? "FPO/SHG" : "Individual Farmer",
              contactPersonName: data.contact_person_name || "",
              organizationName: data.organization_name || "",
              phoneNumber: data.phone_number || "",
              state: data.state || "",
              district: data.district || "",
              village: data.village || "",
              pincode: data.pincode || "",
              farmSizeAcres: data.farm_size_acres?.toString() || "0",
              preferredLanguage: data.preferred_language || "English",
              bankAccountNumber: data.bank_account_number || "",
              ifscCode: data.ifsc_code || "",
            });
          } else if (data.profile_type === "buyer") {
            setActiveTab("buyer");
            buyerForm.reset({
              contactPersonName: data.contact_person_name || "",
              businessName: data.business_name || "",
              businessType: data.business_type || "",
              phoneNumber: data.phone_number || "",
              state: data.state || "",
              district: data.district || "",
              village: data.village || "",
              pincode: data.pincode || "",
              preferredLanguage: data.preferred_language || "English",
              gstNumber: data.gst_number || "",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchProfile();
  }, [user?.id]);

  const onFarmerSubmit = async (data: FarmerProfileFormData) => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const profileData = {
        id: user.id,
        profile_type: "farmer",
        contact_person_name: data.contactPersonName,
        organization_name: data.organizationName || null,
        phone_number: data.phoneNumber,
        state: data.state,
        district: data.district,
        village: data.village || null,
        pincode: data.pincode || null,
        farm_size_acres: data.farmSizeAcres ? parseFloat(data.farmSizeAcres) : null,
        preferred_language: data.preferredLanguage || "English",
        bank_account_number: data.bankAccountNumber || null,
        ifsc_code: data.ifscCode || null,
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(profileData, { onConflict: "id" });

      if (error) {
        throw error;
      }

      toast({
        title: t("profile.toast.savedTitle"),
        description: t("profile.toast.farmerSavedDesc"),
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t("profile.toast.errorMessage");
      toast({
        title: t("profile.toast.errorTitle"),
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onBuyerSubmit = async (data: BuyerProfileFormData) => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const profileData = {
        id: user.id,
        profile_type: "buyer",
        contact_person_name: data.contactPersonName,
        business_name: data.businessName || null,
        business_type: data.businessType || null,
        phone_number: data.phoneNumber,
        state: data.state,
        district: data.district,
        village: data.village || null,
        pincode: data.pincode || null,
        preferred_language: data.preferredLanguage || "English",
        gst_number: data.gstNumber || null,
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(profileData, { onConflict: "id" });

      if (error) {
        throw error;
      }

      toast({
        title: t("profile.toast.savedTitle"),
        description: t("profile.toast.buyerSavedDesc"),
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t("profile.toast.errorMessage");
      toast({
        title: t("profile.toast.errorTitle"),
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-orange" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t("profile.title")}</h1>
          <p className="text-muted-foreground">{t("profile.subtitle")}</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "farmer" | "buyer")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="farmer">{t("profile.tabs.farmer")}</TabsTrigger>
            <TabsTrigger value="buyer">{t("profile.tabs.buyer")}</TabsTrigger>
          </TabsList>

          {/* Farmer Profile Form */}
          <TabsContent value="farmer">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {t("profile.farmerTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={farmerForm.handleSubmit(onFarmerSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="profileType">
                          {t("profile.form.profileTypeLabel")} <span className="text-destructive">*</span>
                        </Label>
                        <Controller
                          name="profileType"
                          control={farmerForm.control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger id="profileType">
                                <SelectValue placeholder={t("profile.form.profileTypePlaceholder")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Individual Farmer">{t("profile.form.profileTypeIndividual")}</SelectItem>
                                <SelectItem value="FPO/SHG">{t("profile.form.profileTypeFpo")}</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {farmerForm.formState.errors.profileType?.message && (
                          <p className="text-sm text-destructive mt-1">
                            {t(farmerForm.formState.errors.profileType.message)}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="contactPersonName">
                          {t("profile.form.contactPersonLabel")} <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="contactPersonName"
                          {...farmerForm.register("contactPersonName")}
                          placeholder={t("profile.form.contactPersonPlaceholder")}
                        />
                        {farmerForm.formState.errors.contactPersonName?.message && (
                          <p className="text-sm text-destructive mt-1">
                            {t(farmerForm.formState.errors.contactPersonName.message)}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="state">
                          {t("profile.form.stateLabel")} <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="state"
                          {...farmerForm.register("state")}
                          placeholder={t("profile.form.statePlaceholder")}
                        />
                        {farmerForm.formState.errors.state?.message && (
                          <p className="text-sm text-destructive mt-1">
                            {t(farmerForm.formState.errors.state.message)}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="village">{t("profile.form.villageLabel")}</Label>
                        <Input
                          id="village"
                          {...farmerForm.register("village")}
                          placeholder={t("profile.form.villagePlaceholder")}
                        />
                      </div>

                      <div>
                        <Label htmlFor="farmSizeAcres">{t("profile.form.farmSizeLabel")}</Label>
                        <Input
                          id="farmSizeAcres"
                          type="number"
                          {...farmerForm.register("farmSizeAcres")}
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <Label htmlFor="bankAccountNumber">{t("profile.form.bankAccountLabel")}</Label>
                        <Input
                          id="bankAccountNumber"
                          {...farmerForm.register("bankAccountNumber")}
                          placeholder={t("profile.form.bankAccountPlaceholder")}
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="organizationName">{t("profile.form.organizationLabel")}</Label>
                        <Input
                          id="organizationName"
                          {...farmerForm.register("organizationName")}
                          placeholder={t("profile.form.organizationPlaceholder")}
                        />
                      </div>

                      <div>
                        <Label htmlFor="phoneNumber">
                          {t("profile.form.phoneLabel")} <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phoneNumber"
                          {...farmerForm.register("phoneNumber")}
                          placeholder={t("profile.form.phonePlaceholder")}
                        />
                        {farmerForm.formState.errors.phoneNumber?.message && (
                          <p className="text-sm text-destructive mt-1">
                            {t(farmerForm.formState.errors.phoneNumber.message)}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="district">
                          {t("profile.form.districtLabel")} <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="district"
                          {...farmerForm.register("district")}
                          placeholder={t("profile.form.districtPlaceholder")}
                        />
                        {farmerForm.formState.errors.district?.message && (
                          <p className="text-sm text-destructive mt-1">
                            {t(farmerForm.formState.errors.district.message)}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="pincode">{t("profile.form.pincodeLabel")}</Label>
                        <Input
                          id="pincode"
                          {...farmerForm.register("pincode")}
                          placeholder={t("profile.form.pincodePlaceholder")}
                        />
                      </div>

                      <div>
                        <Label htmlFor="preferredLanguage">{t("profile.form.preferredLanguageLabel")}</Label>
                        <Controller
                          name="preferredLanguage"
                          control={farmerForm.control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger id="preferredLanguage">
                                <SelectValue placeholder={t("profile.form.preferredLanguagePlaceholder")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="English">{t("profile.form.languageOptionEnglish")}</SelectItem>
                                <SelectItem value="Hindi">{t("profile.form.languageOptionHindi")}</SelectItem>
                                <SelectItem value="Malayalam">{t("profile.form.languageOptionMalayalam")}</SelectItem>
                                <SelectItem value="Tamil">{t("profile.form.languageOptionTamil")}</SelectItem>
                                <SelectItem value="Telugu">{t("profile.form.languageOptionTelugu")}</SelectItem>
                                <SelectItem value="Kannada">{t("profile.form.languageOptionKannada")}</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div>
                        <Label htmlFor="ifscCode">{t("profile.form.ifscLabel")}</Label>
                        <Input
                          id="ifscCode"
                          {...farmerForm.register("ifscCode")}
                          placeholder={t("profile.form.ifscPlaceholder")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-orange-green text-white px-8 py-6 text-base font-semibold rounded-lg shadow-lg hover:opacity-90 transition-opacity"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {t("profile.form.saving")}
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          {t("profile.form.saveFarmer")}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Buyer Profile Form */}
          <TabsContent value="buyer">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {t("profile.buyerTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={buyerForm.handleSubmit(onBuyerSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="buyerContactPersonName">
                          {t("profile.form.contactPersonLabel")} <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="buyerContactPersonName"
                          {...buyerForm.register("contactPersonName")}
                          placeholder={t("profile.form.contactPersonPlaceholder")}
                        />
                        {buyerForm.formState.errors.contactPersonName?.message && (
                          <p className="text-sm text-destructive mt-1">
                            {t(buyerForm.formState.errors.contactPersonName.message)}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="buyerState">
                          {t("profile.form.stateLabel")} <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="buyerState"
                          {...buyerForm.register("state")}
                          placeholder={t("profile.form.statePlaceholder")}
                        />
                        {buyerForm.formState.errors.state?.message && (
                          <p className="text-sm text-destructive mt-1">
                            {t(buyerForm.formState.errors.state.message)}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="buyerVillage">{t("profile.form.villageLabel")}</Label>
                        <Input
                          id="buyerVillage"
                          {...buyerForm.register("village")}
                          placeholder={t("profile.form.villagePlaceholder")}
                        />
                      </div>

                      <div>
                        <Label htmlFor="buyerGstNumber">{t("profile.form.gstLabel")}</Label>
                        <Input
                          id="buyerGstNumber"
                          {...buyerForm.register("gstNumber")}
                          placeholder={t("profile.form.gstPlaceholder")}
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="businessName">{t("profile.form.businessNameLabel")}</Label>
                        <Input
                          id="businessName"
                          {...buyerForm.register("businessName")}
                          placeholder={t("profile.form.businessNamePlaceholder")}
                        />
                      </div>

                      <div>
                        <Label htmlFor="businessType">{t("profile.form.businessTypeLabel")}</Label>
                        <Controller
                          name="businessType"
                          control={buyerForm.control}
                          render={({ field }) => (
                            <Select value={field.value || ""} onValueChange={field.onChange}>
                              <SelectTrigger id="businessType">
                                <SelectValue placeholder={t("profile.form.businessTypePlaceholder")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Processor">{t("profile.form.businessTypeProcessor")}</SelectItem>
                                <SelectItem value="Trader">{t("profile.form.businessTypeTrader")}</SelectItem>
                                <SelectItem value="Consumer">{t("profile.form.businessTypeConsumer")}</SelectItem>
                                <SelectItem value="Retailer">{t("profile.form.businessTypeRetailer")}</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div>
                        <Label htmlFor="buyerPhoneNumber">
                          {t("profile.form.phoneLabel")} <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="buyerPhoneNumber"
                          {...buyerForm.register("phoneNumber")}
                          placeholder={t("profile.form.phonePlaceholder")}
                        />
                        {buyerForm.formState.errors.phoneNumber?.message && (
                          <p className="text-sm text-destructive mt-1">
                            {t(buyerForm.formState.errors.phoneNumber.message)}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="buyerDistrict">
                          {t("profile.form.districtLabel")} <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="buyerDistrict"
                          {...buyerForm.register("district")}
                          placeholder={t("profile.form.districtPlaceholder")}
                        />
                        {buyerForm.formState.errors.district?.message && (
                          <p className="text-sm text-destructive mt-1">
                            {t(buyerForm.formState.errors.district.message)}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="buyerPincode">{t("profile.form.pincodeLabel")}</Label>
                        <Input
                          id="buyerPincode"
                          {...buyerForm.register("pincode")}
                          placeholder={t("profile.form.pincodePlaceholder")}
                        />
                      </div>

                      <div>
                        <Label htmlFor="buyerPreferredLanguage">{t("profile.form.preferredLanguageLabel")}</Label>
                        <Controller
                          name="preferredLanguage"
                          control={buyerForm.control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger id="buyerPreferredLanguage">
                                <SelectValue placeholder={t("profile.form.preferredLanguagePlaceholder")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="English">{t("profile.form.languageOptionEnglish")}</SelectItem>
                                <SelectItem value="Hindi">{t("profile.form.languageOptionHindi")}</SelectItem>
                                <SelectItem value="Malayalam">{t("profile.form.languageOptionMalayalam")}</SelectItem>
                                <SelectItem value="Tamil">{t("profile.form.languageOptionTamil")}</SelectItem>
                                <SelectItem value="Telugu">{t("profile.form.languageOptionTelugu")}</SelectItem>
                                <SelectItem value="Kannada">{t("profile.form.languageOptionKannada")}</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-orange-green text-white px-8 py-6 text-base font-semibold rounded-lg shadow-lg hover:opacity-90 transition-opacity"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {t("profile.form.saving")}
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          {t("profile.form.saveBuyer")}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
