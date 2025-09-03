export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      dashboard_stats: {
        Row: {
          created_at: string | null
          id: number
          stat_change: string | null
          stat_change_type: string | null
          stat_description: string | null
          stat_key: string
          stat_title: string
          stat_value: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          stat_change?: string | null
          stat_change_type?: string | null
          stat_description?: string | null
          stat_key: string
          stat_title: string
          stat_value: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          stat_change?: string | null
          stat_change_type?: string | null
          stat_description?: string | null
          stat_key?: string
          stat_title?: string
          stat_value?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          assignees: Json | null
          completed_tasks: number | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          priority: Database["public"]["Enums"]["project_priority_enum"] | null
          progress: number | null
          status: Database["public"]["Enums"]["project_status_enum"] | null
          title: string
          total_tasks: number | null
          updated_at: string | null
        }
        Insert: {
          assignees?: Json | null
          completed_tasks?: number | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: Database["public"]["Enums"]["project_priority_enum"] | null
          progress?: number | null
          status?: Database["public"]["Enums"]["project_status_enum"] | null
          title: string
          total_tasks?: number | null
          updated_at?: string | null
        }
        Update: {
          assignees?: Json | null
          completed_tasks?: number | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: Database["public"]["Enums"]["project_priority_enum"] | null
          progress?: number | null
          status?: Database["public"]["Enums"]["project_status_enum"] | null
          title?: string
          total_tasks?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tickets: {
        Row: {
          assignee: string | null
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          priority: string | null
          requester: string | null
          sla_deadline: string | null
          status: string | null
          ticket_code: string
          time_spent: string | null
          title: string
        }
        Insert: {
          assignee?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          priority?: string | null
          requester?: string | null
          sla_deadline?: string | null
          status?: string | null
          ticket_code: string
          time_spent?: string | null
          title: string
        }
        Update: {
          assignee?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          priority?: string | null
          requester?: string | null
          sla_deadline?: string | null
          status?: string | null
          ticket_code?: string
          time_spent?: string | null
          title?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          department: string | null
          email: string
          id: number
          last_active: string | null
          location: string | null
          name: string
          phone: string | null
          role: string
          status: string | null
          tickets_assigned: number | null
          tickets_completed: number | null
          user_id: string
        }
        Insert: {
          department?: string | null
          email: string
          id?: number
          last_active?: string | null
          location?: string | null
          name: string
          phone?: string | null
          role: string
          status?: string | null
          tickets_assigned?: number | null
          tickets_completed?: number | null
          user_id: string
        }
        Update: {
          department?: string | null
          email?: string
          id?: number
          last_active?: string | null
          location?: string | null
          name?: string
          phone?: string | null
          role?: string
          status?: string | null
          tickets_assigned?: number | null
          tickets_completed?: number | null
          user_id?: string
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
      project_priority_enum: "low" | "medium" | "high" | "critical"
      project_status_enum: "planning" | "active" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      project_priority_enum: ["low", "medium", "high", "critical"],
      project_status_enum: ["planning", "active", "completed"],
    },
  },
} as const
