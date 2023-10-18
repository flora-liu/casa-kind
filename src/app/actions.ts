"use server";
import "server-only";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database/types";
import { Category, Prompt } from "@/lib/types";

export async function getPrompts() {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });
    const { data } = await supabase.from("prompt").select();

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
    const { data } = await supabase.from("category").select();
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

export async function getPromptsByCategoryTitle(title: string) {
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
      .eq("title", title)
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

export async function getPromptsByCategoryId(categoryId: string) {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });

    const { data: prompts } = await supabase
      .from("_category_to_prompt")
      .select(`prompt (id, title)`)
      .eq("A", categoryId)
      .not("prompt", "is", null);

    const result: Array<Prompt> | undefined = prompts
      ?.map((item) => item.prompt)
      ?.filter((item): item is Prompt => item !== null);
    return result;
  } catch (error) {
    return [];
  }
}

export async function getScratch(categoryId: string) {
  console.log(`categoryId: ${categoryId}`);
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });

    const { data: prompts } = await supabase
      .from("_CategoryToPrompt")
      .select(
        `
          Category(id, title),
          Prompt (id, title)
      `
      )
      .eq("A", categoryId);

    // const { data: categoryToPrompt } = await supabase
    //   .from("_CategoryToPrompt")
    //   .select()
    //   .eq("A", categoryId);
    // const promptIds = categoryToPrompt?.map((item) => item.B) || [];
    // const { data: prompts } = await supabase
    //   .from("Prompt")
    //   .select()
    //   .in("id", promptIds)
    //   .order("createdAt", { ascending: false });

    return prompts;
  } catch (error) {
    return [];
  }
}
