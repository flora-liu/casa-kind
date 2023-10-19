export type ServerCategory = {
  id: string;
  slug: string;
  title: string;
  _category_to_prompt: {
    prompt: {
      id: string;
      title: string;
    } | null;
  }[];
} | null;

export interface Category extends Record<string, any> {
  id: string;
  title: string;
  slug: string;
  prompts?: Array<Prompt>;
}

export type ServerPrompt = {
  id: string;
  title: string;
  _category_to_prompt: {
    category: {
      id: string;
      title: string;
      slug: string;
    } | null;
  }[];
} | null;

export interface Prompt extends Record<string, any> {
  id: string;
  title: string;
}

export interface PromptWithCategory {
  prompt: Prompt;
  category: Category;
}

export type ServerEntry = {
  content: string;
  createdAt: string;
  id: string;
  promptId: string | null;
  userId: string;
  prompt: {
    id: string;
    title: string;
    _category_to_prompt: {
      category: {
        id: string;
        title: string;
        slug: string;
      } | null;
    }[];
  } | null;
} | null;

export interface Entry extends Record<string, any> {
  content: string;
  createdAt: string;
  id: string;
  prompt?: PromptWithCategory;
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string;
    }
>;
