export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _category_to_prompt: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_category_to_prompt_A_fkey"
            columns: ["A"]
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_category_to_prompt_B_fkey"
            columns: ["B"]
            referencedRelation: "prompt"
            referencedColumns: ["id"]
          }
        ]
      }
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      category: {
        Row: {
          description: string | null
          id: string
          slug: string
          title: string
        }
        Insert: {
          description?: string | null
          id?: string
          slug: string
          title: string
        }
        Update: {
          description?: string | null
          id?: string
          slug?: string
          title?: string
        }
        Relationships: []
      }
      entry: {
        Row: {
          content: string
          created_at: string
          id: string
          prompt_id: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          prompt_id?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          prompt_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "entry_prompt_id_fkey"
            columns: ["prompt_id"]
            referencedRelation: "prompt"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entry_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      profile: {
        Row: {
          created_at: string
          email: string | null
          firstName: string | null
          id: string
          lastName: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          firstName?: string | null
          id?: string
          lastName?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          firstName?: string | null
          id?: string
          lastName?: string | null
        }
        Relationships: []
      }
      prompt: {
        Row: {
          id: string
          title: string
        }
        Insert: {
          id?: string
          title: string
        }
        Update: {
          id?: string
          title?: string
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
