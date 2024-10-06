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
          city: string | null;
          country: string | null;
          created_at: string;
          id: string;
          name: string | null;
          phone_number: string | null;
          postal_code: string | null;
          street: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          city?: string | null;
          country?: string | null;
          created_at?: string;
          id?: string;
          name?: string | null;
          phone_number?: string | null;
          postal_code?: string | null;
          street?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          city?: string | null;
          country?: string | null;
          created_at?: string;
          id?: string;
          name?: string | null;
          phone_number?: string | null;
          postal_code?: string | null;
          street?: string | null;
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
      order: {
        Row: {
          address_id: string | null;
          amount: number | null;
          created_at: string;
          id: string;
          is_paid: boolean | null;
          product_id: string | null;
          status: Database["public"]["Enums"]["status"] | null;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          address_id?: string | null;
          amount?: number | null;
          created_at?: string;
          id?: string;
          is_paid?: boolean | null;
          product_id?: string | null;
          status?: Database["public"]["Enums"]["status"] | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          address_id?: string | null;
          amount?: number | null;
          created_at?: string;
          id?: string;
          is_paid?: boolean | null;
          product_id?: string | null;
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
            foreignKeyName: "order_product_id_product_id_fk";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "product";
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
      product: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          image: string | null;
          name: string | null;
          price: string | null;
          size: Database["public"]["Enums"]["size"] | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
          price?: string | null;
          size?: Database["public"]["Enums"]["size"] | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
          price?: string | null;
          size?: Database["public"]["Enums"]["size"] | null;
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
        };
        Insert: {
          created_at?: string;
          customer_id?: string | null;
          email: string;
          expires_at?: string | null;
          price_id?: string | null;
          subscription_id?: string | null;
        };
        Update: {
          created_at?: string;
          customer_id?: string | null;
          email?: string;
          expires_at?: string | null;
          price_id?: string | null;
          subscription_id?: string | null;
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
          email: string;
          full_name: string | null;
          id: string;
          phone_number: string | null;
          username: string;
        };
        Insert: {
          avatar?: string | null;
          created_at?: string;
          email: string;
          full_name?: string | null;
          id?: string;
          phone_number?: string | null;
          username: string;
        };
        Update: {
          avatar?: string | null;
          created_at?: string;
          email?: string;
          full_name?: string | null;
          id?: string;
          phone_number?: string | null;
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
