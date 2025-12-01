import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertCircle,
  Calendar as CalendarIcon,
  Upload,
  X,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

const milletTypes = [
  "foxtail_millet",
  "pearl_millet",
  "finger_millet",
  "little_millet",
  "proso_millet",
  "barnyard_millet",
  "kodo_millet",
  "sorghum",
  "brown_top_millet",
];

const productForms = [
  "raw_grain",
  "flour",
  "flakes",
  "processed",
  "ready_to_cook",
  "value_added",
];

const qualityGrades = ["premium", "grade_a", "grade_b", "standard"];

export default function ProductForm({
  product,
  onSubmit,
  onCancel,
  isSubmitting,
  error: externalError,
}) {
  const [formData, setFormData] = useState({
    title: "",
    millet_type: "",
    product_form: "",
    description: "",
    available_quantity_kg: 0,
    price_per_kg: 0,
    minimum_order_kg: 1,
    harvest_date: "",
    organic_certified: false,
    quality_grade: "standard",
    moisture_content: 0,
    location_state: "",
    location_district: "",
    images: [],
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (product) {
      // Format harvest_date for date input (YYYY-MM-DD format)
      let formattedHarvestDate = "";
      if (product.harvest_date) {
        // If it's already a string in YYYY-MM-DD format, use it
        // If it's a Date object or other format, convert it
        if (typeof product.harvest_date === "string") {
          formattedHarvestDate = product.harvest_date.split("T")[0]; // Remove time if present
        } else if (product.harvest_date instanceof Date) {
          formattedHarvestDate = product.harvest_date
            .toISOString()
            .split("T")[0];
        }
      }

      const productImages =
        product.images && Array.isArray(product.images) ? product.images : [];

      setFormData({
        title: product.title || "",
        millet_type: product.millet_type || "",
        product_form: product.product_form || "",
        description: product.description || "",
        available_quantity_kg: product.available_quantity_kg || 0,
        price_per_kg: product.price_per_kg || 0,
        minimum_order_kg: product.minimum_order_kg || 1,
        harvest_date: formattedHarvestDate,
        organic_certified: product.organic_certified || false,
        quality_grade: product.quality_grade || "standard",
        moisture_content: product.moisture_content || 0,
        location_state: product.location_state || "",
        location_district: product.location_district || "",
        images: productImages,
      });
      setImagePreviews(productImages);
    } else {
      setFormData({
        title: "",
        millet_type: "",
        product_form: "",
        description: "",
        available_quantity_kg: 0,
        price_per_kg: 0,
        minimum_order_kg: 1,
        harvest_date: "",
        organic_certified: false,
        quality_grade: "standard",
        moisture_content: 0,
        location_state: "",
        location_district: "",
        images: [],
      });
      setImagePreviews([]);
    }
    // Clear errors when product changes
    setErrors({});
    setSubmitError(null);
  }, [product]);

  // Update submit error when external error changes
  useEffect(() => {
    if (externalError) {
      setSubmitError(externalError);
    }
  }, [externalError]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Check total image limit (10 images max)
    const currentImageCount = formData.images.length;
    if (currentImageCount + files.length > 10) {
      setSubmitError(
        `You can upload a maximum of 10 images. You currently have ${currentImageCount} image(s).`
      );
      e.target.value = "";
      return;
    }

    // Validate file types and sizes
    const validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith("image/");
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      setSubmitError(
        "Some files were invalid. Please upload only image files under 5MB."
      );
      e.target.value = "";
      return;
    }

    setUploadingImages(true);
    setSubmitError(null);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user?.id) {
        throw new Error("User not authenticated");
      }

      const uploadPromises = validFiles.map(async (file) => {
        // Create unique filename
        const fileExt = file.name.split(".").pop();
        const fileName = `${session.user.id}/${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)}.${fileExt}`;
        const filePath = `product-images/${fileName}`;

        // Upload to Supabase storage
        const { data, error } = await supabase.storage
          .from("product-images")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          // If bucket doesn't exist, provide helpful error
          if (
            error.message.includes("Bucket not found") ||
            error.message.includes("The resource was not found")
          ) {
            throw new Error(
              "Storage bucket 'product-images' not found. Please create it in Supabase Storage settings."
            );
          }
          throw error;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);

        return urlData.publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const newImages = [...formData.images, ...uploadedUrls];

      setFormData((prev) => ({
        ...prev,
        images: newImages,
      }));
      setImagePreviews(newImages);
    } catch (error) {
      console.error("Error uploading images:", error);
      setSubmitError(
        error.message || "Failed to upload images. Please try again."
      );
    } finally {
      setUploadingImages(false);
      // Reset file input
      e.target.value = "";
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const newImages = formData.images.filter(
      (_, index) => index !== indexToRemove
    );
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
    setImagePreviews(newImages);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title || formData.title.trim() === "") {
      newErrors.title = "Title is required";
    }

    if (!formData.millet_type || formData.millet_type.trim() === "") {
      newErrors.millet_type = "Millet type is required";
    } else if (!milletTypes.includes(formData.millet_type)) {
      newErrors.millet_type = "Please select a valid millet type";
    }

    if (!formData.product_form || formData.product_form.trim() === "") {
      newErrors.product_form = "Product form is required";
    } else if (!productForms.includes(formData.product_form)) {
      newErrors.product_form = "Please select a valid product form";
    }

    if (!formData.location_state || formData.location_state.trim() === "") {
      newErrors.location_state = "State is required";
    }

    if (
      !formData.location_district ||
      formData.location_district.trim() === ""
    ) {
      newErrors.location_district = "District is required";
    }

    if (!formData.price_per_kg || formData.price_per_kg <= 0) {
      newErrors.price_per_kg = "Price per kg must be greater than 0";
    }

    if (
      !formData.available_quantity_kg ||
      formData.available_quantity_kg <= 0
    ) {
      newErrors.available_quantity_kg =
        "Available quantity must be greater than 0";
    }

    if (formData.minimum_order_kg && formData.minimum_order_kg <= 0) {
      newErrors.minimum_order_kg = "Minimum order must be greater than 0";
    }

    if (
      formData.moisture_content &&
      (formData.moisture_content < 0 || formData.moisture_content > 100)
    ) {
      newErrors.moisture_content = "Moisture content must be between 0 and 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError(null);
    setErrors({});

    if (!validateForm()) {
      setSubmitError("Please fix the errors in the form before submitting.");
      return;
    }

    // Ensure millet_type and product_form are valid before submitting
    if (!milletTypes.includes(formData.millet_type)) {
      setSubmitError(
        "Invalid millet type selected. Please select a valid option."
      );
      return;
    }

    if (!productForms.includes(formData.product_form)) {
      setSubmitError(
        "Invalid product form selected. Please select a valid option."
      );
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {(submitError || externalError) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {submitError ||
              externalError?.message ||
              "An error occurred. Please try again."}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Premium Organic Foxtail Millet"
            required
            className={errors.title ? "border-destructive" : ""}
          />
          {errors.title && (
            <p className="text-sm text-destructive mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <Label htmlFor="millet_type">Millet Type *</Label>
          <Select
            value={formData.millet_type}
            onValueChange={(value) => {
              handleSelectChange("millet_type", value);
              if (errors.millet_type) {
                setErrors((prev) => ({ ...prev, millet_type: null }));
              }
            }}
            required
          >
            <SelectTrigger
              id="millet_type"
              className={errors.millet_type ? "border-destructive" : ""}
            >
              <SelectValue placeholder="Select Millet Type" />
            </SelectTrigger>
            <SelectContent>
              {milletTypes.map((mt) => (
                <SelectItem key={mt} value={mt}>
                  {mt
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.millet_type && (
            <p className="text-sm text-destructive mt-1">
              {errors.millet_type}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="product_form">Product Form *</Label>
          <Select
            value={formData.product_form}
            onValueChange={(value) => {
              handleSelectChange("product_form", value);
              if (errors.product_form) {
                setErrors((prev) => ({ ...prev, product_form: null }));
              }
            }}
            required
          >
            <SelectTrigger
              id="product_form"
              className={errors.product_form ? "border-destructive" : ""}
            >
              <SelectValue placeholder="Select Product Form" />
            </SelectTrigger>
            <SelectContent>
              {productForms.map((pf) => (
                <SelectItem key={pf} value={pf}>
                  {pf
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.product_form && (
            <p className="text-sm text-destructive mt-1">
              {errors.product_form}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="quality_grade">Quality Grade</Label>
          <Select
            value={formData.quality_grade}
            onValueChange={(value) =>
              handleSelectChange("quality_grade", value)
            }
          >
            <SelectTrigger id="quality_grade">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {qualityGrades.map((q) => (
                <SelectItem key={q} value={q}>
                  {q
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="price_per_kg">Price per kg (₹) *</Label>
          <Input
            id="price_per_kg"
            type="number"
            name="price_per_kg"
            value={formData.price_per_kg}
            onChange={handleChange}
            min={0}
            step="0.01"
            placeholder="0.00"
            required
            className={errors.price_per_kg ? "border-destructive" : ""}
          />
          {errors.price_per_kg && (
            <p className="text-sm text-destructive mt-1">
              {errors.price_per_kg}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="available_quantity_kg">
            Available Quantity (kg) *
          </Label>
          <Input
            id="available_quantity_kg"
            type="number"
            name="available_quantity_kg"
            value={formData.available_quantity_kg}
            onChange={handleChange}
            min={0}
            step="0.01"
            placeholder="0.00"
            required
            className={errors.available_quantity_kg ? "border-destructive" : ""}
          />
          {errors.available_quantity_kg && (
            <p className="text-sm text-destructive mt-1">
              {errors.available_quantity_kg}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="minimum_order_kg">Minimum Order (kg)</Label>
          <Input
            id="minimum_order_kg"
            type="number"
            name="minimum_order_kg"
            value={formData.minimum_order_kg}
            onChange={handleChange}
            min={1}
            step="0.01"
            placeholder="1"
            className={errors.minimum_order_kg ? "border-destructive" : ""}
          />
          {errors.minimum_order_kg && (
            <p className="text-sm text-destructive mt-1">
              {errors.minimum_order_kg}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="moisture_content">Moisture Content (%)</Label>
          <Input
            id="moisture_content"
            type="number"
            name="moisture_content"
            value={formData.moisture_content}
            onChange={handleChange}
            min={0}
            max={100}
            step="0.01"
            placeholder="0"
            className={errors.moisture_content ? "border-destructive" : ""}
          />
          {errors.moisture_content && (
            <p className="text-sm text-destructive mt-1">
              {errors.moisture_content}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="harvest_date">Harvest Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="harvest_date"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.harvest_date && "text-muted-foreground",
                  errors.harvest_date && "border-destructive"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.harvest_date ? (
                  format(new Date(formData.harvest_date), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={
                  formData.harvest_date
                    ? new Date(formData.harvest_date)
                    : undefined
                }
                onSelect={(date) => {
                  if (date) {
                    const formattedDate = format(date, "yyyy-MM-dd");
                    setFormData((prev) => ({
                      ...prev,
                      harvest_date: formattedDate,
                    }));
                    // Clear any date-related errors if they exist
                    if (errors.harvest_date) {
                      setErrors((prev) => ({ ...prev, harvest_date: null }));
                    }
                  } else {
                    setFormData((prev) => ({
                      ...prev,
                      harvest_date: "",
                    }));
                  }
                }}
                disabled={(date) => date > new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.harvest_date && (
            <p className="text-sm text-destructive mt-1">
              {errors.harvest_date}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="location_state">Location: State *</Label>
          <Input
            id="location_state"
            name="location_state"
            value={formData.location_state}
            onChange={handleChange}
            placeholder="e.g., Uttar Pradesh"
            required
            className={errors.location_state ? "border-destructive" : ""}
          />
          {errors.location_state && (
            <p className="text-sm text-destructive mt-1">
              {errors.location_state}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="location_district">Location: District *</Label>
          <Input
            id="location_district"
            name="location_district"
            value={formData.location_district}
            onChange={handleChange}
            placeholder="e.g., Aligarh"
            required
            className={errors.location_district ? "border-destructive" : ""}
          />
          {errors.location_district && (
            <p className="text-sm text-destructive mt-1">
              {errors.location_district}
            </p>
          )}
        </div>

        <div className="md:col-span-2 flex items-center space-x-2">
          <Checkbox
            id="organic_certified"
            checked={formData.organic_certified}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, organic_certified: checked }))
            }
          />
          <Label htmlFor="organic_certified" className="cursor-pointer">
            Organic Certified
          </Label>
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe your product, its quality, origin, and any special features..."
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="images">Product Images</Label>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label
                htmlFor="image-upload"
                className={cn(
                  "flex items-center justify-center gap-2 px-4 py-2 border border-dashed rounded-lg transition-colors",
                  uploadingImages
                    ? "cursor-not-allowed opacity-60 bg-muted"
                    : "cursor-pointer hover:bg-accent"
                )}
              >
                {uploadingImages ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    <span className="text-sm">Upload Images</span>
                  </>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  disabled={uploadingImages || isSubmitting}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-muted-foreground">
                {uploadingImages
                  ? "Please wait while images are being uploaded..."
                  : "Upload up to 10 images (max 5MB each)"}
              </p>
            </div>

            {uploadingImages && imagePreviews.length === 0 && (
              <div className="flex items-center justify-center p-8 border border-dashed rounded-lg bg-muted/50">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 mx-auto text-primary mb-2 animate-spin" />
                  <p className="text-sm text-muted-foreground">
                    Uploading images...
                  </p>
                </div>
              </div>
            )}

            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreviews.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative group aspect-square rounded-lg overflow-hidden border"
                  >
                    <img
                      src={imageUrl}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {uploadingImages && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Loader2 className="h-6 w-6 text-white animate-spin" />
                      </div>
                    )}
                    {!uploadingImages && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        disabled={isSubmitting}
                        className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
                        aria-label="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {imagePreviews.length === 0 && !uploadingImages && (
              <div className="flex items-center justify-center p-8 border border-dashed rounded-lg bg-muted/50">
                <div className="text-center">
                  <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No images uploaded yet
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting || uploadingImages}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting || uploadingImages}>
          {isSubmitting
            ? "Saving..."
            : uploadingImages
            ? "Uploading Images..."
            : product
            ? "Update Product"
            : "Add Product"}
        </Button>
      </div>
    </form>
  );
}
