import type { Ref } from "react";
import type { Mode } from "./ModeToggle";

export default function InputArea({
  mode,
  ref,
}: {
  mode: Mode;
  ref?: Ref<HTMLTextAreaElement | HTMLInputElement>;
}) {
  return (
    <div className="relative group focus-glass rounded-2xl transition-all">
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(31,41,55,0.08)] overflow-hidden">
        {mode === "text" ? (
          <textarea
            ref={ref as Ref<HTMLTextAreaElement>}
            className="w-full bg-transparent border-none focus:ring-0 px-6 py-6 text-on-surface placeholder:text-on-surface/50 font-body-lg resize-none"
            placeholder="Paste the news article text here..."
            rows={5}
          />
        ) : (
          <input
            ref={ref as Ref<HTMLInputElement>}
            className="w-full bg-transparent border-none focus:ring-0 px-6 py-6 text-on-surface placeholder:text-on-surface/50 font-body-lg"
            placeholder="Paste the article URL here..."
            type="url"
          />
        )}
      </div>
    </div>
  );
}