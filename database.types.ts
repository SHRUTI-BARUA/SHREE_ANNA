export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      products: {
        Row: {
          available_quantity_kg: number
          certifications: Json | null
          created_at: string | null
          description: string | null
          harvest_date: string | null
          id: string
          images: Json | null
          is_active: boolean | null
          location_district: string
          location_state: string
          millet_type: string
          minimum_order_kg: number
          moisture_content: number | null
          organic_certified: boolean | null
          price_per_kg: number
          product_form: string
          quality_grade: string | null
          seller_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          available_quantity_kg?: number
          certifications?: Json | null
          created_at?: string | null
          description?: string | null
          harvest_date?: string | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          location_district: string
          location_state: string
          millet_type: string
          minimum_order_kg?: number
          moisture_content?: number | null
          organic_certified?: boolean | null
          price_per_kg: number
          product_form: string
          quality_grade?: string | null
          seller_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          available_quantity_kg?: number
          certifications?: Json | null
          created_at?: string | null
          description?: string | null
          harvest_date?: string | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          location_district?: string
          location_state?: string
          millet_type?: string
          minimum_order_kg?: number
          moisture_content?: number | null
          organic_certified?: boolean | null
          price_per_kg?: number
          product_form?: string
          quality_grade?: string | null
          seller_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bank_account_number: string | null
          business_name: string | null
          business_type: string | null
          contact_person_name: string | null
          created_at: string | null
          district: string | null
          farm_size_acres: number | null
          gst_number: string | null
          id: string
          ifsc_code: string | null
          organization_name: string | null
          phone_number: string | null
          pincode: string | null
          preferred_language: string | null
          profile_type: string
          state: string | null
          updated_at: string | null
          village: string | null
        }
        Insert: {
          bank_account_number?: string | null
          business_name?: string | null
          business_type?: string | null
          contact_person_name?: string | null
          created_at?: string | null
          district?: string | null
          farm_size_acres?: number | null
          gst_number?: string | null
          id: string
          ifsc_code?: string | null
          organization_name?: string | null
          phone_number?: string | null
          pincode?: string | null
          preferred_language?: string | null
          profile_type: string
          state?: string | null
          updated_at?: string | null
          village?: string | null
        }
        Update: {
          bank_account_number?: string | null
          business_name?: string | null
          business_type?: string | null
          contact_person_name?: string | null
          created_at?: string | null
          district?: string | null
          farm_size_acres?: number | null
          gst_number?: string | null
          id?: string
          ifsc_code?: string | null
          organization_name?: string | null
          phone_number?: string | null
          pincode?: string | null
          preferred_language?: string | null
          profile_type?: string
          state?: string | null
          updated_at?: string | null
          village?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

