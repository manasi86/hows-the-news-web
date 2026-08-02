import type { Mood } from "@/lib/types";

const BG_LAYERS: { id: string; mood: Mood; bg: string; blobs: React.ReactNode }[] = [
  {
    id: "blob-idle",
    mood: "idle",
    bg: "bg-gradient-to-br from-[#ddd6fe] via-[#fbcfe8] to-[#fecdd3]",
    blobs: (
      <>
        <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-primary-container rounded-full blur-[100px] opacity-40 animate-drift" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-tertiary-container rounded-full blur-[120px] opacity-40 animate-drift-slow" />
      </>
    ),
  },
  {
    id: "blob-happy",
    mood: "happy",
    bg: "bg-gradient-to-br from-[#a7f3d0] via-[#99f6e4] to-[#fde68a]",
    blobs: (
      <div className="absolute top-[5%] left-[20%] w-[450px] h-[450px] bg-secondary-fixed rounded-full blur-[100px] opacity-50 animate-drift" />
    ),
  },
  {
    id: "blob-sad",
    mood: "sad",
    bg: "bg-gradient-to-br from-[#bae6fd] via-[#bfdbfe] to-[#c7d2fe]",
    blobs: (
      <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-primary-fixed rounded-full blur-[110px] opacity-50 animate-drift-slow" />
    ),
  },
  {
    id: "blob-neutral",
    mood: "neutral",
    bg: "bg-gradient-to-br from-[#e2e8f0] via-[#e9d5ff] to-[#e0e7ff]",
    blobs: (
      <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-outline-variant rounded-full blur-[100px] opacity-40 animate-drift" />
    ),
  },
];

export default function DynamicBackground({ mood }: { mood: Mood }) {
  return (
    <div className="fixed inset-0 z-[-1] transition-all duration-1000 ease-in-out" aria-hidden="true">
      {BG_LAYERS.map((layer) => (
        <div
          key={layer.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${layer.bg} ${
            layer.mood === mood ? "opacity-100" : "opacity-0"
          }`}
        >
          {layer.blobs}
        </div>
      ))}
    </div>
  );
}