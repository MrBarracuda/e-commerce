export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      address: {
        Row: {
          address_line_1: string | null;
          address_line_2: string | null;
          city: string | null;
          country: string | null;
          created_at: string;
          id: string;
          name: string | null;
          phone: string | null;
          postal_code: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          address_line_1?: string | null;
          address_line_2?: string | null;
          city?: string | null;
          country?: string | null;
          created_at?: string;
          id?: string;
          name?: string | null;
          phone?: string | null;
          postal_code?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          address_line_1?: string | null;
          address_line_2?: string | null;
          city?: string | null;
          country?: string | null;
          created_at?: string;
          id?: string;
          name?: string | null;
          phone?: string | null;
          postal_code?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "address_user_id_user_id_fk";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      cart: {
        Row: {
          created_at: string;
          id: number;
          total_amount: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          total_amount?: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          total_amount?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cart_user_id_user_id_fk";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      cart_item: {
        Row: {
          cart_id: number;
          created_at: string;
          id: number;
          product_id: number;
          quantity: number;
          updated_at: string;
        };
        Insert: {
          cart_id?: number;
          created_at?: string;
          id?: number;
          product_id?: number;
          quantity?: number;
          updated_at?: string;
        };
        Update: {
          cart_id?: number;
          created_at?: string;
          id?: number;
          product_id?: number;
          quantity?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cart_item_cart_id_cart_id_fk";
            columns: ["cart_id"];
            isOneToOne: false;
            referencedRelation: "cart";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cart_item_product_id_product_id_fk";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "product";
            referencedColumns: ["id"];
          },
        ];
      };
      order: {
        Row: {
          address_id: string | null;
          cart_id: number;
          created_at: string;
          id: string;
          is_paid: boolean | null;
          status: Database["public"]["Enums"]["status"] | null;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          address_id?: string | null;
          cart_id?: number;
          created_at?: string;
          id?: string;
          is_paid?: boolean | null;
          status?: Database["public"]["Enums"]["status"] | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          address_id?: string | null;
          cart_id?: number;
          created_at?: string;
          id?: string;
          is_paid?: boolean | null;
          status?: Database["public"]["Enums"]["status"] | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "order_address_id_address_id_fk";
            columns: ["address_id"];
            isOneToOne: false;
            referencedRelation: "address";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_cart_id_cart_id_fk";
            columns: ["cart_id"];
            isOneToOne: false;
            referencedRelation: "cart";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_user_id_user_id_fk";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      order_item: {
        Row: {
          created_at: string;
          id: number;
          order_id: string | null;
          product_id: number;
          quantity: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          order_id?: string | null;
          product_id?: number;
          quantity?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          order_id?: string | null;
          product_id?: number;
          quantity?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "order_item_order_id_order_id_fk";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "order";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_item_product_id_product_id_fk";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "product";
            referencedColumns: ["id"];
          },
        ];
      };
      product: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          image: string | null;
          name: string | null;
          price: string | null;
          size: Database["public"]["Enums"]["size"] | null;
          sub_name: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          image?: string | null;
          name?: string | null;
          price?: string | null;
          size?: Database["public"]["Enums"]["size"] | null;
          sub_name?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          image?: string | null;
          name?: string | null;
          price?: string | null;
          size?: Database["public"]["Enums"]["size"] | null;
          sub_name?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      subscription: {
        Row: {
          created_at: string;
          customer_id: string | null;
          email: string;
          expires_at: string | null;
          price_id: string | null;
          subscription_id: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          customer_id?: string | null;
          email: string;
          expires_at?: string | null;
          price_id?: string | null;
          subscription_id?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          customer_id?: string | null;
          email?: string;
          expires_at?: string | null;
          price_id?: string | null;
          subscription_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscription_email_user_email_fk";
            columns: ["email"];
            isOneToOne: true;
            referencedRelation: "user";
            referencedColumns: ["email"];
          },
        ];
      };
      user: {
        Row: {
          avatar: string | null;
          created_at: string;
          date_of_birth: string | null;
          email: string;
          full_name: string | null;
          id: string;
          phone: string | null;
          updated_at: string;
          username: string;
        };
        Insert: {
          avatar?: string | null;
          created_at?: string;
          date_of_birth?: string | null;
          email: string;
          full_name?: string | null;
          id?: string;
          phone?: string | null;
          updated_at?: string;
          username: string;
        };
        Update: {
          avatar?: string | null;
          created_at?: string;
          date_of_birth?: string | null;
          email?: string;
          full_name?: string | null;
          id?: string;
          phone?: string | null;
          updated_at?: string;
          username?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_subscription_active: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      size:
        | "5"
        | "10"
        | "15"
        | "30"
        | "50"
        | "75"
        | "100"
        | "125"
        | "150"
        | "200";
      status: "fulfilled" | "shipped" | "awaiting_shipment";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

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
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
