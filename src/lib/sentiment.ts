import type { Mood } from "./types";

const SENTIMENT_INFO: Record<
  Mood,
  {
    label: string;
    chip: string;
    bg: string;
    summary: string;
    analysis: string;
  }
> = {
  happy: {
    label: "Encouraging",
    chip: "border-green-300 text-green-700 bg-green-50/50",
    bg: "blob-happy",
    summary: "",
    analysis: "",
  },
  sad: {
    label: "Troubling",
    chip: "border-blue-300 text-blue-700 bg-blue-50/50",
    bg: "blob-sad",
    summary: "",
    analysis: "",
  },
  neutral: {
    label: "Objective",
    chip: "border-slate-300 text-slate-700 bg-slate-50/50",
    bg: "blob-neutral",
    summary: "",
    analysis: "",
  },
  notnews: {
    label: "Not news",
    chip: "border-gray-300 text-gray-700 bg-gray-50/50",
    bg: "blob-idle",
    summary: "",
    analysis: "",
  },
  idle: {
    label: "Analyzing",
    chip: "border-gray-300 text-gray-700 bg-gray-50/50",
    bg: "blob-idle",
    summary: "",
    analysis: "",
  },
};

export default SENTIMENT_INFO;