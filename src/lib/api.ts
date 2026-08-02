import type { AnalyseResponse, SummarizeResponse } from "./types";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

function baseUrl(): string {
  if (API_BASE) return API_BASE;
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.hostname}:8000`;
  }
  return "http://127.0.0.1:8000";
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${baseUrl()}${path}`, {
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