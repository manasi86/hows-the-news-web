export default function GoButton({
  loading,
  phase,
  onClick,
}: {
  loading: boolean;
  phase: "Summarizing..." | "Analyzing..." | "";
  onClick: () => void;
}) {
  return (
    <div className="flex justify-center">
      <button
        className="bg-[#111827] text-white rounded-full px-12 py-4 font-button-text text-button-text lowercase shadow-xl active:scale-95 transition-all duration-200 overflow-hidden disabled:opacity-80 disabled:cursor-not-allowed"
        id="go-btn"
        onClick={onClick}
        disabled={loading}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              />
            </svg>
            <span className="text-white text-sm">{phase}</span>
          </span>
        ) : (
          <span>go</span>
        )}
      </button>
    </div>
  );
}