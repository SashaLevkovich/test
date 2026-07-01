export type Step =
  | "ask"
  | "transition"
  | "datetime"
  | "category"
  | "details"
  | "summary";

export type Category = "food" | "active" | "culture" | "chill" | "surprise";

export interface InviteState {
  step: Step;
  date: string | null;
  time: string | null;
  category: Category | null;
  details?: string | null;
}

export const INITIAL_STATE: InviteState = {
  step: "ask",
  date: null,
  time: null,
  category: null,
  details: null,
};
