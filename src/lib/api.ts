import type { AnalyseResponse, SummarizeResponse, TokenUsage } from "./types";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    if (data && typeof data === "object" && "detail" in data) {
      const detail = (data as { detail: unknown }).detail;
      throw new Error(typeof detail === "string" ? detail : "Request failed");
    }
    throw new Error(`Request failed (${res.status})`);
  }

  return data as T;
}

export function summarizeText(text: string): Promise<SummarizeResponse> {
  return post<SummarizeResponse>("/summarize", { text });
}

export function summarizeUrl(url: string): Promise<SummarizeResponse> {
  return post<SummarizeResponse>("/summarize", { url });
}

export function analyse(text: string): Promise<AnalyseResponse> {
  return post<AnalyseResponse>("/analyse", { text });
}

export function usageFrom(
  resp: SummarizeResponse | AnalyseResponse,
): TokenUsage | null {
  const {
    prompt_tokens,
    completion_tokens,
    prompt_tokens_cost,
    completion_tokens_cost,
    cost,
  } = resp;
  if (
    prompt_tokens === undefined ||
    completion_tokens === undefined ||
    prompt_tokens_cost === undefined ||
    completion_tokens_cost === undefined ||
    cost === undefined
  ) {
    return null;
  }
  return {
    prompt_tokens,
    completion_tokens,
    prompt_tokens_cost,
    completion_tokens_cost,
    cost,
  };
}