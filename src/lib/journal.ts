import {
  Category,
  Entry,
  Prompt,
  PromptWithCategory,
  ServerCategory,
  ServerEntry,
  ServerPrompt,
} from "@/lib/types";
import { format } from "date-fns";

export function isEntry(item: any): item is Entry {
  return item !== null;
}

export function parseEntry(data: ServerEntry): Entry | null {
  if (!data) {
    return null;
  }
  const entry: Entry = {
    content: data.content,
    createdAt: data.created_at,
    id: data.id,
  };
  if (
    data?.prompt &&
    data?.prompt?._category_to_prompt &&
    data?.prompt?._category_to_prompt[0]?.category !== null
  ) {
    entry.prompt = {
      prompt: { id: data.prompt.id, title: data.prompt.title },
      category: data?.prompt._category_to_prompt[0]?.category,
    };
  }
  return entry;
}

export function isPrompt(item: any): item is Prompt {
  return item !== null;
}

export function parsePrompt(data: ServerPrompt): PromptWithCategory | null {
  if (!data) {
    return null;
  }
  if (
    !data?._category_to_prompt ||
    data?._category_to_prompt[0]?.category == null
  ) {
    return null;
  }
  const result: PromptWithCategory = {
    prompt: {
      id: data.id,
      title: data.title,
    },
    category: data?._category_to_prompt[0]?.category,
  };
  return result;
}

export function isPromptWithCategory(item: any): item is PromptWithCategory {
  return item !== null;
}

export function isCategory(item: any): item is Category {
  return item !== null;
}

export function parseCategory(data: ServerCategory): Category | null {
  const prompts: Array<Prompt> = [];
  if (!(data?.id || data?.slug || data?.title)) {
    return null;
  }
  data?._category_to_prompt?.forEach((item) => {
    if (item?.prompt && item?.prompt !== null) {
      prompts.push(item?.prompt);
    }
  });
  return {
    prompts,
    ...data,
  };
}

export const freeFormCategory = "Free form";
export const freeFormTitle = "Journal entry";

export function groupByCreatedAt(entries: Entry[]): Record<string, Entry[]> {
  return entries.reduce((group: Record<string, Entry[]>, entry: Entry) => {
    // Use the createdAt date as the key
    const date = format(new Date(entry.createdAt), "yyyy-MM-dd");

    // If the group does not have an entry for this date, create an empty array
    if (!group[date]) {
      group[date] = [];
    }

    // Push the current entry onto the array for this date
    group[date].push(entry);

    return group;
  }, {});
}
