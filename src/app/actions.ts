"use server";
import "server-only";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database/types";
import { Category, Entry, PromptWithCategory } from "@/lib/types";
import {
  isCategory,
  isEntry,
  parseCategory,
  parseEntry,
  parsePrompt,
} from "@/lib/journal";

export async function getEntryById(id: string): Promise<Entry | null> {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });
    const { data, status, error } = await supabase
      .from("entry")
      .select(
        `
            *,
            prompt (
              *,
              _category_to_prompt (
                category (id, title, slug)
              )
            )
          `
      )
      .eq("id", id)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    return parseEntry(data);
  } catch (error) {
    return null;
  }
}

export async function getEntriesForUser(
  userId: string
): Promise<Array<Entry> | null> {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });
    const { data, status, error } = await supabase
      .from("entry")
      .select(
        `
            *,
            prompt (
              *,
              _category_to_prompt (
                category (id, title, slug)
              )
            )
          `
      )
      .eq("userId", userId);

    if (error && status !== 406) {
      throw error;
    }

    let result: Array<Entry> | null = null;
    if (data) {
      result = data?.map((item) => parseEntry(item))?.filter(isEntry);
    }
    return result;
  } catch (error) {
    return null;
  }
}

export async function getPromptById(
  id: string
): Promise<PromptWithCategory | null> {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });
    const { data, status, error } = await supabase
      .from("prompt")
      .select(
        `
            *,
            _category_to_prompt (
              category (id, title, slug)
            )
          `
      )
      .eq("id", id)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    return parsePrompt(data) || null;
  } catch (error) {
    return null;
  }
}

export async function getPromptOfTheDay(): Promise<PromptWithCategory | null> {
  // TODO: create job to select new prompt for each day
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });
    const { data } = await supabase
      .from("prompt")
      .select(
        `
        *,
        _category_to_prompt (
          category (id, title, slug)
        )
    `
      )
      .limit(1)
      .single();

    return parsePrompt(data) || null;
  } catch (error) {
    return null;
  }
}

export async function getAllPromptsByCategory(): Promise<Array<Category> | null> {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });
    const { data } = await supabase.from("category").select(
      `
        *,
        _category_to_prompt (
          prompt (id, title)
        )
      `
    );
    return data?.map((item) => parseCategory(item))?.filter(isCategory) || null;
  } catch (error) {
    return null;
  }
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });

    const { data } = await supabase
      .from("category")
      .select(
        `
        *,
        _category_to_prompt (
          prompt (id, title)
        )
      `
      )
      .eq("slug", slug)
      .single();

    return parseCategory(data || null);
  } catch (error) {
    return null;
  }
}
