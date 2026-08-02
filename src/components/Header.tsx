export default function Header() {
  return (
    <header className="flex justify-between items-center w-full px-container-padding py-base max-w-7xl mx-auto z-10 sticky top-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-error-container rounded-lg flex items-center justify-center shadow-lg">
          <span
            className="material-symbols-outlined text-white"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            sentiment_satisfied
          </span>
        </div>
        <h1 className="font-headline-md text-headline-md font-bold text-on-surface">
          How&apos;s the news?
        </h1>
      </div>
      <button
        className="material-symbols-outlined text-primary hover:opacity-80 transition-opacity"
        aria-label="Help"
      >
        help
      </button>
    </header>
  );
}