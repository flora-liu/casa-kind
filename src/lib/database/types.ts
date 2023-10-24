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
          category_id: string
          prompt_id: string
        }
        Insert: {
          category_id: string
          prompt_id: string
        }
        Update: {
          category_id?: string
          prompt_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "_category_to_prompt_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_category_to_prompt_prompt_id_fkey"
            columns: ["prompt_id"]
            referencedRelation: "prompt"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_category_to_prompt_prompt_id_fkey"
            columns: ["prompt_id"]
            referencedRelation: "random_prompts"
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
      daily_prompt: {
        Row: {
          created_at: string
          id: string
          prompt_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          prompt_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          prompt_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_prompt_prompt_id_fkey"
            columns: ["prompt_id"]
            referencedRelation: "prompt"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_prompt_prompt_id_fkey"
            columns: ["prompt_id"]
            referencedRelation: "random_prompts"
            referencedColumns: ["id"]
          }
        ]
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
            foreignKeyName: "entry_prompt_id_fkey"
            columns: ["prompt_id"]
            referencedRelation: "random_prompts"
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
          is_system_generated: boolean | null
          title: string
        }
        Insert: {
          id?: string
          is_system_generated?: boolean | null
          title: string
        }
        Update: {
          id?: string
          is_system_generated?: boolean | null
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      random_prompts: {
        Row: {
          id: string | null
          is_system_generated: boolean | null
          title: string | null
        }
        Insert: {
          id?: string | null
          is_system_generated?: boolean | null
          title?: string | null
        }
        Update: {
          id?: string | null
          is_system_generated?: boolean | null
          title?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_random_category: {
        Args: Record<PropertyKey, never>
        Returns: {
          description: string | null
          id: string
          slug: string
          title: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
