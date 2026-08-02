import type { Mood } from "@/lib/types";

function Happy() {
  return (
    <svg className="w-full h-full drop-shadow-xl" viewBox="0 0 100 100" aria-label="Encouraging">
      <circle cx="50" cy="50" fill="#fde68a" r="45" />
      <path d="M30 45 Q35 40 40 45" fill="none" stroke="#48464d" strokeLinecap="round" strokeWidth="4" />
      <path d="M60 45 Q65 40 70 45" fill="none" stroke="#48464d" strokeLinecap="round" strokeWidth="4" />
      <path d="M35 65 Q50 78 65 65" fill="none" stroke="#48464d" strokeLinecap="round" strokeWidth="4" />
    </svg>
  );
}

function Sad() {
  return (
    <svg className="w-full h-full drop-shadow-xl" viewBox="0 0 100 100" role="img" aria-label="Troubling">
      <circle cx="50" cy="50" fill="#bae6fd" r="45" />
      <circle cx="35" cy="45" fill="#48464d" r="3" />
      <circle cx="65" cy="45" fill="#48464d" r="3" />
      <path d="M35 72 Q50 60 65 72" fill="none" stroke="#48464d" strokeLinecap="round" strokeWidth="4" />
      <path d="M65 52 Q68 62 65 68" fill="none" stroke="#3b82f6" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function Neutral() {
  return (
    <svg className="w-full h-full drop-shadow-xl" viewBox="0 0 100 100" role="img" aria-label="Objective">
      <circle cx="50" cy="50" fill="#e2e8f0" r="45" />
      <circle cx="35" cy="45" fill="#48464d" r="3" />
      <circle cx="65" cy="45" fill="#48464d" r="3" />
      <line stroke="#48464d" strokeLinecap="round" strokeWidth="4" x1="35" x2="65" y1="68" y2="68" />
    </svg>
  );
}

function NotNews() {
  return (
    <svg className="w-full h-full drop-shadow-xl" viewBox="0 0 100 100" role="img" aria-label="Not news">
      <circle cx="50" cy="50" fill="#e2e8f0" r="45" />
      <circle cx="35" cy="45" fill="#48464d" r="3" />
      <circle cx="65" cy="45" fill="#48464d" r="3" />
      <path d="M35 72 Q50 60 65 72" fill="none" stroke="#48464d" strokeLinecap="round" strokeWidth="4" />
    </svg>
  );
}

const ICONS: Record<Mood, () => React.ReactElement> = {
  idle: Neutral,
  happy: Happy,
  sad: Sad,
  neutral: Neutral,
  notnews: NotNews,
};

export default function SentimentIcon({ mood }: { mood: Mood }) {
  const Icon = ICONS[mood];
  return (
    <div className="relative w-32 h-32 flex items-center justify-center" id="sentiment-icon-container">
      <Icon />
    </div>
  );
}