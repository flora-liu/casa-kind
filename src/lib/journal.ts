import {
  Category,
  Entry,
  Prompt,
  PromptWithCategory,
  ServerCategory,
  ServerEntry,
  ServerPrompt,
} from "@/lib/types";

export function isEntry(item: any): item is Entry {
  return item !== null;
}

export function parseEntry(data: ServerEntry): Entry | null {
  if (!data) {
    return null;
  }
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
