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
      app_state: {
        Row: {
          created_at: string
          current_round: string
          current_score_1: number
          current_score_2: number
          current_score_3: number
          current_set: string
          id: number
          participant: number
          vote_refreshes: number
        }
        Insert: {
          created_at?: string
          current_round: string
          current_score_1?: number
          current_score_2?: number
          current_score_3?: number
          current_set: string
          id?: number
          participant: number
          vote_refreshes: number
        }
        Update: {
          created_at?: string
          current_round?: string
          current_score_1?: number
          current_score_2?: number
          current_score_3?: number
          current_set?: string
          id?: number
          participant?: number
          vote_refreshes?: number
        }
        Relationships: [
          {
            foreignKeyName: "current_screen_participant_fkey"
            columns: ["participant"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
        ]
      }
      current_screen: {
        Row: {
          created_at: string
          id: number
          slug: string
        }
        Insert: {
          created_at?: string
          id?: number
          slug: string
        }
        Update: {
          created_at?: string
          id?: number
          slug?: string
        }
        Relationships: []
      }
      participants: {
        Row: {
          created_at: string
          icon_url: string
          id: number
          image_url: string
          name: string
          round_one_score: number[] | null
          total_score: number
        }
        Insert: {
          created_at?: string
          icon_url: string
          id?: number
          image_url: string
          name: string
          round_one_score?: number[] | null
          total_score: number
        }
        Update: {
          created_at?: string
          icon_url?: string
          id?: number
          image_url?: string
          name?: string
          round_one_score?: number[] | null
          total_score?: number
        }
        Relationships: []
      }
      polls: {
        Row: {
          created_at: string
          id: number
          options: string[] | null
          question: string
        }
        Insert: {
          created_at?: string
          id?: number
          options?: string[] | null
          question: string
        }
        Update: {
          created_at?: string
          id?: number
          options?: string[] | null
          question?: string
        }
        Relationships: []
      }
      rounds: {
        Row: {
          created_at: string
          description: string | null
          id: number
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          title?: string
        }
        Relationships: []
      }
      scores: {
        Row: {
          created_at: string
          id: number
          participant: number
          round_number: string
          score_1: number | null
          score_2: number | null
          score_3: number | null
          set_number: string
        }
        Insert: {
          created_at?: string
          id?: number
          participant: number
          round_number: string
          score_1?: number | null
          score_2?: number | null
          score_3?: number | null
          set_number: string
        }
        Update: {
          created_at?: string
          id?: number
          participant?: number
          round_number?: string
          score_1?: number | null
          score_2?: number | null
          score_3?: number | null
          set_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "scores_participant_fkey"
            columns: ["participant"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
        ]
      }
      showdown: {
        Row: {
          created_at: string
          id: number
          participant_1: number | null
          participant_2: number | null
          winner: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          participant_1?: number | null
          participant_2?: number | null
          winner?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          participant_1?: number | null
          participant_2?: number | null
          winner?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "showdown_participant_1_fkey"
            columns: ["participant_1"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "showdown_participant_2_fkey"
            columns: ["participant_2"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "showdown_winner_fkey"
            columns: ["winner"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
        ]
      }
      vote: {
        Row: {
          created_at: string
          id: number
          option: string
          poll_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          option: string
          poll_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          option?: string
          poll_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vote_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          },
        ]
      }
      voting_state: {
        Row: {
          created_at: string
          id: number
          voting_state: string
        }
        Insert: {
          created_at?: string
          id?: number
          voting_state?: string
        }
        Update: {
          created_at?: string
          id?: number
          voting_state?: string
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
