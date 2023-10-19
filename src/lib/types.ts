export interface Category extends Record<string, any> {
  id: string;
  title: string;
  slug: string;
}
export interface Prompt extends Record<string, any> {
  id: string;
  title: string;
}

export interface Entry extends Record<string, any> {
  content: string;
  createdAt: string;
  id: string;
  prompt?: Prompt & {
    category?: Category;
  };
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string;
    }
>;
