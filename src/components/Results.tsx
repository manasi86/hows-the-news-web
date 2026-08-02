import type { Mood } from "@/lib/types";
import SENTIMENT_INFO from "@/lib/sentiment";
import SentimentIcon from "./SentimentIcon";

export default function Results({
  mood,
  summary,
  analysis,
  onReset,
}: {
  mood: Mood;
  summary: string;
  analysis: string;
  onReset: () => void;
}) {
  const info = SENTIMENT_INFO[mood];

  return (
    <div className="space-y-6 pt-8 animate-pop-in" id="results-area">
      <div className="flex flex-col items-center text-center space-y-4">
        <SentimentIcon mood={mood} />
        <div
          className={`px-4 py-1 rounded-full font-label-caps text-label-caps uppercase tracking-widest border transition-colors duration-500 ${info.chip}`}
          id="mood-chip"
        >
          {info.label}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/30 space-y-2">
          <h3 className="font-label-caps text-label-caps text-secondary uppercase opacity-60">Summary</h3>
          <p className="text-on-surface font-body-sm leading-relaxed whitespace-pre-line" id="result-summary">
            {summary}
          </p>
        </div>
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/30 space-y-2">
          <h3 className="font-label-caps text-label-caps text-secondary uppercase opacity-60">Sentiment Breakdown</h3>
          <p className="text-on-surface font-body-sm leading-relaxed" id="result-analysis">
            {analysis}
          </p>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          className="text-secondary-container bg-on-secondary-fixed-variant px-6 py-2 rounded-full font-button-text text-button-text hover:bg-on-background transition-colors"
          onClick={onReset}
        >
          start over
        </button>
      </div>
    </div>
  );
}