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
  problemStatement: string;
  examples: Example[];
  constraints: string | string[];
  order: number;
  starterCode: string;
  handlerFunction: ((fn: any) => boolean) | string;
  starterFunctionName: string;
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
