"use client";

import { useRef, useState } from "react";
import DynamicBackground from "@/components/DynamicBackground";
import Header from "@/components/Header";
import ModeToggle, { type Mode } from "@/components/ModeToggle";
import InputArea from "@/components/InputArea";
import GoButton from "@/components/GoButton";
import Results from "@/components/Results";
import TokenUsage from "@/components/TokenUsage";
import { analyse, summarizeText, summarizeUrl, usageFrom } from "@/lib/api";
import type { Mood, TokenUsage as TokenUsageType } from "@/lib/types";

type Phase = "Summarizing..." | "Analyzing..." | "";

export default function Home() {
  const [mode, setMode] = useState<Mode>("text");
  const [mood, setMood] = useState<Mood>("idle");
  const [phase, setPhase] = useState<Phase>("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [summaryUsage, setSummaryUsage] = useState<TokenUsageType | null>(null);
  const [analyseUsage, setAnalyseUsage] = useState<TokenUsageType | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  function switchMode(next: Mode) {
    setMode(next);
    setMood("idle");
    setSummary("");
    setAnalysis("");
    setSummaryUsage(null);
    setAnalyseUsage(null);
  }

  async function processNews() {
    const value = inputRef.current?.value.trim();
    if (!value) return;

    setLoading(true);
    const startTop = window.scrollY;

    try {
      setPhase("Summarizing...");
      const summarized =
        mode === "text" ? await summarizeText(value) : await summarizeUrl(value);
      setSummaryUsage(usageFrom(summarized));

      if (!summarized.is_news || !summarized.summary) {
        setMood("notnews");
        setAnalyseUsage(null);
        setSummary(
          summarized.summary ??
            (summarized.reason || "This doesn't look like a news article."),
        );
        setAnalysis("No sentiment analysis was performed because the input was not recognised as news.");
      } else {
        setPhase("Analyzing...");
        setSummary(summarized.summary);
        const result = await analyse(summarized.summary);
        setAnalyseUsage(usageFrom(result));
        setAnalysis(result.reason || describeSentiment(result.sentiment));
        if (result.sentiment === "positive") setMood("happy");
        else if (result.sentiment === "negative") setMood("sad");
        else setMood("neutral");
      }

      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    } catch (err) {
      setMood("notnews");
      setSummary(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setAnalysis("");
    } finally {
      setLoading(false);
      setPhase("");
      window.scrollTo(0, Math.max(startTop, 0));
    }
  }

  function describeSentiment(sentiment: string): string {
    if (sentiment === "positive") return "The summary reads positively.";
    if (sentiment === "negative") return "The summary reads negatively.";
    return "The summary reads neutral.";
  }

  function reset() {
    setMood("idle");
    setSummary("");
    setAnalysis("");
    setSummaryUsage(null);
    setAnalyseUsage(null);
    if (inputRef.current) inputRef.current.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col min-h-screen font-body-lg">
      <DynamicBackground mood={mood} />
      <Header />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-container-padding pb-container-padding">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center space-y-3">
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto">
              Paste a story or a link and find out how it feels.
            </p>
          </div>

          <div className="space-y-6">
            <ModeToggle mode={mode} onChange={switchMode} />
            <InputArea mode={mode} ref={inputRef} />
            <GoButton loading={loading} phase={phase} onClick={processNews} />
          </div>

          {mood !== "idle" && (
            <div ref={resultsRef}>
              <Results mood={mood} summary={summary} analysis={analysis} onReset={reset} />
              <TokenUsage summaryUsage={summaryUsage} analyseUsage={analyseUsage} />
            </div>
          )}
        </div>
      </main>

      <footer className="flex flex-col items-center justify-center w-full text-center opacity-70 pb-container-padding z-10">
        <p className="font-body-sm text-body-sm text-secondary">
          How&apos;s the news? · powered by summarize → analyse
        </p>
      </footer>
    </div>
  );
}