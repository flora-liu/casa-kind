export interface Category extends Record<string, any> {
  id: string;
  title: string;
  slug: string;
}
export interface Prompt extends Record<string, any> {
  id: string;
  title: string;
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string;
    }
>;
