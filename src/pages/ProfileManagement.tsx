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

// Farmer Profile Schema
const farmerProfileSchema = z.object({
  profileType: z.string().min(1, "Profile type is required"),
  contactPersonName: z.string().min(1, "Contact person name is required"),
  organizationName: z.string().optional(),
  phoneNumber: z.string().min(10, "Phone number is required"),
  state: z.string().min(1, "State is required"),
  district: z.string().min(1, "District is required"),
  village: z.string().optional(),
  pincode: z.string().optional(),
  farmSizeAcres: z.string().optional(),
  preferredLanguage: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  ifscCode: z.string().optional(),
});

// Buyer Profile Schema
const buyerProfileSchema = z.object({
  contactPersonName: z.string().min(1, "Contact person name is required"),
  businessName: z.string().optional(),
  businessType: z.string().optional(),
  phoneNumber: z.string().min(10, "Phone number is required"),
  state: z.string().min(1, "State is required"),
  district: z.string().min(1, "District is required"),
  village: z.string().optional(),
  pincode: z.string().optional(),
  preferredLanguage: z.string().optional(),
  gstNumber: z.string().optional(),
});

type FarmerProfileFormData = z.infer<typeof farmerProfileSchema>;
type BuyerProfileFormData = z.infer<typeof buyerProfileSchema>;

export default function ProfileManagement() {
  const { user } = useAuthStore();
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
        title: "Profile saved!",
        description: "Your farmer profile has been saved successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save profile. Please try again.",
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
        title: "Profile saved!",
        description: "Your buyer profile has been saved successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save profile. Please try again.",
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile Management</h1>
          <p className="text-muted-foreground">Complete your profile to start using the platform.</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "farmer" | "buyer")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="farmer">Farmer/FPO/SHG Profile</TabsTrigger>
            <TabsTrigger value="buyer">Buyer/Consumer Profile</TabsTrigger>
          </TabsList>

          {/* Farmer Profile Form */}
          <TabsContent value="farmer">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Farmer Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={farmerForm.handleSubmit(onFarmerSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="profileType">
                          Profile Type <span className="text-destructive">*</span>
                        </Label>
                        <Controller
                          name="profileType"
                          control={farmerForm.control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger id="profileType">
                                <SelectValue placeholder="Select profile type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Individual Farmer">Individual Farmer</SelectItem>
                                <SelectItem value="FPO/SHG">FPO/SHG</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {farmerForm.formState.errors.profileType && (
                          <p className="text-sm text-destructive mt-1">
                            {farmerForm.formState.errors.profileType.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="contactPersonName">
                          Contact Person Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="contactPersonName"
                          {...farmerForm.register("contactPersonName")}
                          placeholder="Enter contact person name"
                        />
                        {farmerForm.formState.errors.contactPersonName && (
                          <p className="text-sm text-destructive mt-1">
                            {farmerForm.formState.errors.contactPersonName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="state">
                          State <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="state"
                          {...farmerForm.register("state")}
                          placeholder="Enter state"
                        />
                        {farmerForm.formState.errors.state && (
                          <p className="text-sm text-destructive mt-1">
                            {farmerForm.formState.errors.state.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="village">Village</Label>
                        <Input
                          id="village"
                          {...farmerForm.register("village")}
                          placeholder="Enter village"
                        />
                      </div>

                      <div>
                        <Label htmlFor="farmSizeAcres">Farm Size (acres)</Label>
                        <Input
                          id="farmSizeAcres"
                          type="number"
                          {...farmerForm.register("farmSizeAcres")}
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <Label htmlFor="bankAccountNumber">Bank Account Number</Label>
                        <Input
                          id="bankAccountNumber"
                          {...farmerForm.register("bankAccountNumber")}
                          placeholder="Enter bank account number"
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="organizationName">Organization Name (if FPO/SHG)</Label>
                        <Input
                          id="organizationName"
                          {...farmerForm.register("organizationName")}
                          placeholder="Enter organization name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phoneNumber">
                          Phone Number <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phoneNumber"
                          {...farmerForm.register("phoneNumber")}
                          placeholder="Enter phone number"
                        />
                        {farmerForm.formState.errors.phoneNumber && (
                          <p className="text-sm text-destructive mt-1">
                            {farmerForm.formState.errors.phoneNumber.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="district">
                          District <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="district"
                          {...farmerForm.register("district")}
                          placeholder="Enter district"
                        />
                        {farmerForm.formState.errors.district && (
                          <p className="text-sm text-destructive mt-1">
                            {farmerForm.formState.errors.district.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          {...farmerForm.register("pincode")}
                          placeholder="Enter pincode"
                        />
                      </div>

                      <div>
                        <Label htmlFor="preferredLanguage">Preferred Language</Label>
                        <Controller
                          name="preferredLanguage"
                          control={farmerForm.control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger id="preferredLanguage">
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="English">English</SelectItem>
                                <SelectItem value="Hindi">Hindi</SelectItem>
                                <SelectItem value="Malayalam">Malayalam</SelectItem>
                                <SelectItem value="Tamil">Tamil</SelectItem>
                                <SelectItem value="Telugu">Telugu</SelectItem>
                                <SelectItem value="Kannada">Kannada</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div>
                        <Label htmlFor="ifscCode">IFSC Code</Label>
                        <Input
                          id="ifscCode"
                          {...farmerForm.register("ifscCode")}
                          placeholder="Enter IFSC code"
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
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Farmer Profile
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
                  Buyer Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={buyerForm.handleSubmit(onBuyerSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="buyerContactPersonName">
                          Contact Person Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="buyerContactPersonName"
                          {...buyerForm.register("contactPersonName")}
                          placeholder="Enter contact person name"
                        />
                        {buyerForm.formState.errors.contactPersonName && (
                          <p className="text-sm text-destructive mt-1">
                            {buyerForm.formState.errors.contactPersonName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="buyerState">
                          State <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="buyerState"
                          {...buyerForm.register("state")}
                          placeholder="Enter state"
                        />
                        {buyerForm.formState.errors.state && (
                          <p className="text-sm text-destructive mt-1">
                            {buyerForm.formState.errors.state.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="buyerVillage">Village</Label>
                        <Input
                          id="buyerVillage"
                          {...buyerForm.register("village")}
                          placeholder="Enter village"
                        />
                      </div>

                      <div>
                        <Label htmlFor="buyerGstNumber">GST Number</Label>
                        <Input
                          id="buyerGstNumber"
                          {...buyerForm.register("gstNumber")}
                          placeholder="Enter GST number"
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                          id="businessName"
                          {...buyerForm.register("businessName")}
                          placeholder="Enter business name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="businessType">Business Type</Label>
                        <Controller
                          name="businessType"
                          control={buyerForm.control}
                          render={({ field }) => (
                            <Select value={field.value || ""} onValueChange={field.onChange}>
                              <SelectTrigger id="businessType">
                                <SelectValue placeholder="Select business type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Processor">Processor</SelectItem>
                                <SelectItem value="Trader">Trader</SelectItem>
                                <SelectItem value="Consumer">Consumer</SelectItem>
                                <SelectItem value="Retailer">Retailer</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div>
                        <Label htmlFor="buyerPhoneNumber">
                          Phone Number <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="buyerPhoneNumber"
                          {...buyerForm.register("phoneNumber")}
                          placeholder="Enter phone number"
                        />
                        {buyerForm.formState.errors.phoneNumber && (
                          <p className="text-sm text-destructive mt-1">
                            {buyerForm.formState.errors.phoneNumber.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="buyerDistrict">
                          District <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="buyerDistrict"
                          {...buyerForm.register("district")}
                          placeholder="Enter district"
                        />
                        {buyerForm.formState.errors.district && (
                          <p className="text-sm text-destructive mt-1">
                            {buyerForm.formState.errors.district.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="buyerPincode">Pincode</Label>
                        <Input
                          id="buyerPincode"
                          {...buyerForm.register("pincode")}
                          placeholder="Enter pincode"
                        />
                      </div>

                      <div>
                        <Label htmlFor="buyerPreferredLanguage">Preferred Language</Label>
                        <Controller
                          name="preferredLanguage"
                          control={buyerForm.control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger id="buyerPreferredLanguage">
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="English">English</SelectItem>
                                <SelectItem value="Hindi">Hindi</SelectItem>
                                <SelectItem value="Malayalam">Malayalam</SelectItem>
                                <SelectItem value="Tamil">Tamil</SelectItem>
                                <SelectItem value="Telugu">Telugu</SelectItem>
                                <SelectItem value="Kannada">Kannada</SelectItem>
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
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Buyer Profile
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

