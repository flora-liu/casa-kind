"use server";
import "server-only";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database/types";
import {
  Category,
  Entry,
  GratitudeEntryData,
  PromptWithCategory,
  ServerPrompt,
} from "@/lib/types";
import {
  isCategory,
  isEntry,
  isPromptWithCategory,
  parseCategory,
  parseEntry,
  parsePrompt,
  groupByCreatedAt,
} from "@/lib/journal";
import { addDays, format } from "date-fns";

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

export async function getDailyGratitudeEntries(): Promise<{
  entries?: Record<string, GratitudeEntryData>;
  dailyGratitudePromptId?: string;
  lifeGratitudePromptId?: string;
} | null> {
  try {
    const defaultGratitudeData = {
      dailyGratitudePromptId: process.env.TODAY_GRATITUDE_ID,
      lifeGratitudePromptId: process.env.LIFE_GRATITUDE_ID,
    };
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });
    const userResult = await supabase.auth.getUser();

    let query = supabase
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
      .in("prompt_id", [
        process.env.TODAY_GRATITUDE_ID,
        process.env.LIFE_GRATITUDE_ID,
      ])
      .gte("created_at", format(addDays(new Date(), -7), "yyyy-MM-dd"))
      .lte("created_at", format(addDays(new Date(), 2), "yyyy-MM-dd"));
    if (!userResult?.data?.user?.id) {
      throw new Error(
        "Error fetching daily gratitude entries due to missing userId"
      );
    }
    query.eq("user_id", userResult?.data?.user?.id);
    const { data, status, error } = await query;

    if (error && status !== 406) {
      throw error;
    }
    const parsed = data?.map((item) => parseEntry(item))?.filter(isEntry);
    if (parsed) {
      const groupedByCreatedAt = groupByCreatedAt(parsed);
      const groupedByDay = Object.keys(groupedByCreatedAt).reduce(
        (group: Record<string, GratitudeEntryData>, key: string) => {
          const entries = groupedByCreatedAt[key];
          const dayData = {
            dailyGratitudeId: process.env.TODAY_GRATITUDE_ID,
            dailyGratitudeEntry: entries?.find(
              (item) =>
                item?.prompt?.prompt?.id === process.env.TODAY_GRATITUDE_ID
            ),
            lifeGratitudeId: process.env.LIFE_GRATITUDE_ID,
            lifeGratitudeEntry: entries?.find(
              (item) =>
                item?.prompt?.prompt?.id === process.env.LIFE_GRATITUDE_ID
            ),
          };
          group[key] = dayData;
          return group;
        },
        {}
      );
      return { entries: groupedByDay, ...defaultGratitudeData };
    }

    return defaultGratitudeData;
  } catch (error) {
    return null;
  }
}

export async function getEntriesForUser(
  userId: string,
  filters?: {
    startDate?: string;
    endDate?: string;
  }
): Promise<Array<Entry> | null> {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });

    let query = supabase
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
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (filters) {
      if (filters?.startDate) {
        query.gte("created_at", filters?.startDate);
      }
      if (filters.endDate) {
        query.gte("created_at", filters?.endDate);
      }
    }
    const { data, status, error } = await query;

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

export async function getDailyPrompt(): Promise<PromptWithCategory | null> {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });
    const { data } = await supabase
      .from("daily_prompt")
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
      .eq("created_at", format(new Date(), "yyyy-MM-dd"))
      .limit(1)
      .single();

    return data?.prompt ? parsePrompt(data?.prompt) : null;
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

export async function getRandomPrompts(
  limit?: number
): Promise<Array<PromptWithCategory> | null> {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });

    const { data, error } = await supabase
      .from("random_prompts")
      .select(
        `
        *,
        _category_to_prompt (
          category (id, title, slug)
        )
      `
      )
      .limit(limit || 6);
    if (error || data?.length === 0) {
      throw new Error("Error fetching random prompts");
    }
    return data
      ?.map((item) => parsePrompt((item as ServerPrompt) || null))
      .filter(isPromptWithCategory);
  } catch (error) {
    return null;
  }
}

export async function getRandomCategory() {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });

    const { data, error } = await supabase.rpc("get_random_category");
    if (error || data?.length === 0) {
      throw new Error("Error fetching random category");
    }
    return parseCategory(data ? data[0] : null);
  } catch (error) {
    return null;
  }
}

export async function getRandomPromptForCategory(categoryId: string) {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });

    const { data, error } = await supabase.rpc(
      "get_random_prompt_for_category",
      { p_category_id: categoryId }
    );
    if (error || data?.length === 0) {
      throw new Error("Error fetching random prompt");
    }
    const prompt = await getPromptById(data[0].id);
    return prompt;
  } catch (error) {
    return null;
  }
}

export async function createPrompt(
  title: string,
  categoryId?: string,
  isSystemGenerated?: boolean
) {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });

    const { data: prompt, error: errorPrompt } = await supabase
      .from("prompt")
      .insert({
        title,
        ...(isSystemGenerated
          ? { is_system_generated: isSystemGenerated }
          : {}),
      })
      .select()
      .single();
    if (errorPrompt || !prompt) {
      throw new Error("Error inserting new prompt");
    }
    if (categoryId) {
      const { data: relation, error: errorRelation } = await supabase
        .from("_category_to_prompt")
        .insert({
          prompt_id: prompt.id,
          category_id: categoryId,
        })
        .select()
        .single();
      if (errorRelation || !relation) {
        throw new Error("Error creating new relation for category to prompt");
      }
    }
    const promptData = await getPromptById(prompt.id);
    return promptData;
  } catch (error) {
    return null;
  }
}

export async function saveDailyPrompt(promptId: string) {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });

    const { data, error } = await supabase
      .from("daily_prompt")
      .insert({
        prompt_id: promptId,
        created_at: `${new Date().toISOString().split("T")[0]}`,
      })
      .select()
      .single();
    if (error || !data) {
      throw new Error("Error inserting daily prompt");
    }
    return prompt;
  } catch (error) {
    return null;
  }
}
