export type Sentiment = "positive" | "negative" | "neutral";

export type Mood = "idle" | "happy" | "sad" | "neutral" | "notnews";

export interface TokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  prompt_tokens_cost: number;
  completion_tokens_cost: number;
  cost: number;
}

export interface SummarizeResponse {
  is_news: boolean;
  summary: string | null;
  reason: string;
  prompt_tokens?: number;
  completion_tokens?: number;
  prompt_tokens_cost?: number;
  completion_tokens_cost?: number;
  cost?: number;
}

export interface AnalyseResponse {
  sentiment: Sentiment;
  confidence: number;
  reason: string;
  prompt_tokens?: number;
  completion_tokens?: number;
  prompt_tokens_cost?: number;
  completion_tokens_cost?: number;
  cost?: number;
}