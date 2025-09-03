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
      tickets: {
        Row: {
          id: string
          ticket_code: string
          title: string
          description: string | null
          priority: 'low' | 'medium' | 'high' | 'critical' | null
          status: 'new' | 'assigned' | 'in_progress' | 'pending' | 'resolved' | 'closed' | null
          assignee: string | null
          requester: string | null
          category: string | null
          created_at: string
          sla_deadline: string | null
          time_spent: string | null
        }
        Insert: {
          ticket_code: string
          title: string
          description?: string
          priority?: 'low' | 'medium' | 'high' | 'critical'
          status?: 'new' | 'assigned' | 'in_progress' | 'pending' | 'resolved' | 'closed'
          assignee?: string
          requester?: string
          category?: string
          sla_deadline?: string
          time_spent?: string
        }
        Update: Partial<{
          ticket_code: string
          title: string
          description: string
          priority: 'low' | 'medium' | 'high' | 'critical'
          status: 'new' | 'assigned' | 'in_progress' | 'pending' | 'resolved' | 'closed'
          assignee: string
          requester: string
          category: string
          sla_deadline: string
          time_spent: string
        }>
      }

      projects: {
        Row: {
          id: string
          title: string
          description: string | null
          status: 'planning' | 'active' | 'completed'
          priority: 'low' | 'medium' | 'high' | 'critical'
          assignees: Json | null
          progress: number
          due_date: string | null
          total_tasks: number
          completed_tasks: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          title: string
          description?: string
          status?: 'planning' | 'active' | 'completed'
          priority?: 'low' | 'medium' | 'high' | 'critical'
          assignees?: Json
          progress?: number
          due_date?: string
          total_tasks?: number
          completed_tasks?: number
          created_at?: string
          updated_at?: string
        }
        Update: Partial<{
          id: string
          title: string
          description: string
          status: 'planning' | 'active' | 'completed'
          priority: 'low' | 'medium' | 'high' | 'critical'
          assignees: Json
          progress: number
          due_date: string
          total_tasks: number
          completed_tasks: number
          created_at: string
          updated_at: string
        }>
      }

      users: {
        Row: {
          id: number
          user_id: string
          name: string
          email: string
          role: string
          department: string | null
          status: 'active' | 'busy' | 'away' | 'offline' | null
          phone: string | null
          location: string | null
          tickets_assigned: number
          tickets_completed: number
          last_active: string
        }
        Insert: {
          user_id: string
          name: string
          email: string
          role: string
          department?: string
          status?: 'active' | 'busy' | 'away' | 'offline'
          phone?: string
          location?: string
          tickets_assigned?: number
          tickets_completed?: number
          last_active?: string
        }
        Update: Partial<{
          user_id: string
          name: string
          email: string
          role: string
          department: string
          status: 'active' | 'busy' | 'away' | 'offline'
          phone: string
          location: string
          tickets_assigned: number
          tickets_completed: number
          last_active: string
        }>
      }

      dashboard_stats: {
        Row: {
          id: number
          stat_key: string
          stat_title: string
          stat_value: string
          stat_change: string | null
          stat_change_type: 'increase' | 'decrease'
          stat_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          stat_key: string
          stat_title: string
          stat_value: string
          stat_change?: string
          stat_change_type?: 'increase' | 'decrease'
          stat_description?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<{
          stat_key: string
          stat_title: string
          stat_value: string
          stat_change: string
          stat_change_type: 'increase' | 'decrease'
          stat_description: string
          created_at: string
          updated_at: string
        }>
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
    Enums: {},
  },
} as const
