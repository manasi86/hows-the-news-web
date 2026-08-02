export type Sentiment = "positive" | "negative" | "neutral";

export type Mood = "idle" | "happy" | "sad" | "neutral" | "notnews";

export interface SummarizeResponse {
  is_news: boolean;
  summary: string | null;
  reason: string;
}

export interface AnalyseResponse {
  sentiment: Sentiment;
  confidence: number;
  reason: string;
}