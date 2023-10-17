"use server";
import "server-only";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database/types";
import { Prompt } from "@/lib/types";

export async function getPrompts() {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });
    const { data } = await supabase
      .from("Prompt")
      .select()
      .order("createdAt", { ascending: false });

    return data?.map((entry) => entry) ?? [];
  } catch (error) {
    return [];
  }
}

export async function getCategories() {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });
    const { data } = await supabase.from("Category").select();
    return data ?? [];
  } catch (error) {
    return [];
  }
}

export async function getAllPromptsByCategory() {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });
    const { data } = await supabase.from("Category").select(
      `
        *,
        _CategoryToPrompt (
          Prompt (id, title)
        )
      `
    );
    const result: { [key: string]: Array<Prompt> } = {};
    data?.forEach((item) => {
      if (item?._CategoryToPrompt) {
        item?._CategoryToPrompt.forEach((categoryToPrompt) => {
          if (categoryToPrompt.Prompt && categoryToPrompt.Prompt !== null) {
            const title = item?.title;
            if (!result[title]) {
              result[title] = [];
            }
            result[title].push(categoryToPrompt.Prompt);
          }
        });
      }
    });

    return result;
  } catch (error) {
    return null;
  }
}

export async function getPromptsByCategoryTitle(title: string) {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });

    const { data } = await supabase
      .from("Category")
      .select(
        `
        *,
        _CategoryToPrompt (
          Prompt (id, title)
        )
      `
      )
      .eq("title", title)
      .single();

    const prompts: Array<Prompt> = [];
    if (data?._CategoryToPrompt) {
      data?._CategoryToPrompt.forEach((categoryToPrompt) => {
        if (categoryToPrompt.Prompt && categoryToPrompt.Prompt !== null) {
          prompts.push(categoryToPrompt.Prompt);
        }
      });
    }
    return prompts;
  } catch (error) {
    return [];
  }
}

export async function getPromptsByCategoryId(categoryId: string) {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });

    const { data: prompts } = await supabase
      .from("_CategoryToPrompt")
      .select(`Prompt (id, title)`)
      .eq("A", categoryId)
      .not("Prompt", "is", null);

    const result: Array<Prompt> | undefined = prompts
      ?.map((item) => item.Prompt)
      ?.filter((item): item is Prompt => item !== null);
    return result;
  } catch (error) {
    return [];
  }
}
