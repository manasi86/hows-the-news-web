export type Mode = "text" | "url";

const ACTIVE =
  "px-6 py-1.5 rounded-full font-button-text text-button-text transition-all duration-200 bg-surface-container-highest text-on-surface shadow-sm";
const INACTIVE =
  "px-6 py-1.5 rounded-full font-button-text text-button-text transition-all duration-200 text-on-surface-variant hover:text-on-surface";

export default function ModeToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (mode: Mode) => void;
}) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex bg-white/60 backdrop-blur-md p-1 rounded-full border border-white/40 shadow-sm">
        <button
          className={mode === "text" ? ACTIVE : INACTIVE}
          onClick={() => onChange("text")}
        >
          text
        </button>
        <button
          className={mode === "url" ? ACTIVE : INACTIVE}
          onClick={() => onChange("url")}
        >
          url
        </button>
      </div>
    </div>
  );
}