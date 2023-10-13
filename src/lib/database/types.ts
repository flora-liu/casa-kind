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
      _CategoryToPrompt: {
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
            foreignKeyName: "_CategoryToPrompt_A_fkey"
            columns: ["A"]
            referencedRelation: "Category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_CategoryToPrompt_B_fkey"
            columns: ["B"]
            referencedRelation: "Prompt"
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
      Category: {
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
      Entry: {
        Row: {
          content: string
          createdAt: string
          id: string
          promptId: string
          userId: string
        }
        Insert: {
          content: string
          createdAt: string
          id?: string
          promptId: string
          userId: string
        }
        Update: {
          content?: string
          createdAt?: string
          id?: string
          promptId?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Entry_promptId_fkey"
            columns: ["promptId"]
            referencedRelation: "Prompt"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Entry_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Prompt: {
        Row: {
          createdAt: string
          description: string | null
          id: string
          title: string
        }
        Insert: {
          createdAt: string
          description?: string | null
          id?: string
          title: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      User: {
        Row: {
          email: string | null
          firstName: string | null
          id: string
          lastName: string | null
        }
        Insert: {
          email?: string | null
          firstName?: string | null
          id?: string
          lastName?: string | null
        }
        Update: {
          email?: string | null
          firstName?: string | null
          id?: string
          lastName?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_new_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
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
