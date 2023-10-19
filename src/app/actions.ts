"use server";
import "server-only";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database/types";
import { Category, Entry, Prompt } from "@/lib/types";

export async function getEntryById(id: string) {
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

    if (data) {
      const entry: Entry = {
        content: data.content,
        createdAt: data.createdAt,
        id: data.id,
      };
      if (
        data?.prompt &&
        data?.prompt?._category_to_prompt &&
        data?.prompt?._category_to_prompt[0]?.category !== null
      ) {
        entry.prompt = {
          id: data.prompt.id,
          title: data.prompt.title,
          category: data?.prompt._category_to_prompt[0]?.category,
        };
      }
      return entry;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function getPromptById(id: string) {
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

    if (data) {
      if (
        !data?._category_to_prompt ||
        data?._category_to_prompt[0]?.category == null
      ) {
        return null;
      }
      const result: { category: Category; prompt: Prompt } = {
        prompt: {
          id: data.id,
          title: data.title,
        },
        category: data?._category_to_prompt[0]?.category,
      };
      return result;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function getPromptOfTheDay() {
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
    if (data) {
      if (
        !data?._category_to_prompt ||
        data?._category_to_prompt[0]?.category == null
      ) {
        return null;
      }
      const result: { category: Category; prompt: Prompt } = {
        prompt: {
          id: data.id,
          title: data.title,
        },
        category: data?._category_to_prompt[0]?.category,
      };
      return result;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function getAllPromptsByCategory() {
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
    return data?.map((item) => {
      const prompts: Array<Prompt> = [];
      item?._category_to_prompt?.forEach((item) => {
        if (item?.prompt && item?.prompt !== null) {
          prompts.push(item?.prompt);
        }
      });
      const result: Category & {
        prompts: Array<Prompt>;
      } = {
        prompts,
        ...item,
      };
      return result;
    });
  } catch (error) {
    return null;
  }
}

export async function getPromptsByCategorySlug(slug: string) {
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

    const prompts: Array<Prompt> = [];
    if (data?._category_to_prompt) {
      data?._category_to_prompt.forEach((categoryToPrompt) => {
        if (categoryToPrompt.prompt && categoryToPrompt.prompt !== null) {
          prompts.push(categoryToPrompt.prompt);
        }
      });
    }
    return prompts;
  } catch (error) {
    return [];
  }
}
