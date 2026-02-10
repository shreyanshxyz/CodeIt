export type Example = {
  id: number;
  inputText: string;
  outputText: string;
  explanation?: string;
  img?: string;
};

export type Difficulty = "Easy" | "Medium" | "Hard";

// local problem data
export type Problem = {
  id: string;
  title: string;
  difficulty: Difficulty;
  category?: string;
  tags?: string[];
  acceptanceRate?: number;
  totalSubmissions?: string;
  problemStatement?: string;
  description?: string;
  examples: Example[];
  constraints: string | string[];
  order?: number;
  starterCode?: string;
  starter_code?: string;
  handlerFunction?: ((fn: any) => boolean) | string;
  handler_function?: string;
  starterFunctionName?: string;
  starter_function_name?: string;
};

export type DBProblem = {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  likes: number;
  dislikes: number;
  order: number;
  videoId?: string;
  link?: string;
};
