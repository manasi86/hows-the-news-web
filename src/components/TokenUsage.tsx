import type { TokenUsage as TokenUsageType } from "@/lib/types";

const CARD =
  "bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/30 space-y-2";

const HEADING =
  "font-label-caps text-label-caps text-secondary uppercase opacity-60";

const ROW = "flex items-center justify-between gap-4 text-body-sm";

const LABEL = "text-on-surface-variant";

const VALUE = "text-on-surface font-medium";

function formatCost(value: number | undefined): string {
  if (value === undefined || Number.isNaN(value)) return "—";
  return `$${value.toFixed(6)}`;
}

function formatTokens(value: number | undefined): string {
  if (value === undefined || Number.isNaN(value)) return "—";
  return value.toLocaleString();
}

function UsageCard({
  title,
  usage,
}: {
  title: string;
  usage?: TokenUsageType | null;
}) {
  return (
    <div className={CARD}>
      <h3 className={HEADING}>{title}</h3>
      <dl className="space-y-2">
        <div className={ROW}>
          <dt className={LABEL}>Prompt tokens</dt>
          <dd className={VALUE}>{formatTokens(usage?.prompt_tokens)}</dd>
        </div>
        <div className={ROW}>
          <dt className={LABEL}>Completion tokens</dt>
          <dd className={VALUE}>{formatTokens(usage?.completion_tokens)}</dd>
        </div>
        <div className={ROW}>
          <dt className={LABEL}>Prompt cost</dt>
          <dd className={VALUE}>{formatCost(usage?.prompt_tokens_cost)}</dd>
        </div>
        <div className={ROW}>
          <dt className={LABEL}>Completion cost</dt>
          <dd className={VALUE}>{formatCost(usage?.completion_tokens_cost)}</dd>
        </div>
        <div className={`${ROW} border-t border-white/40 pt-2`}>
          <dt className={`${LABEL} font-semibold`}>Total cost</dt>
          <dd className={`${VALUE} font-semibold`}>{formatCost(usage?.cost)}</dd>
        </div>
      </dl>
    </div>
  );
}

export default function TokenUsage({
  summaryUsage,
  analyseUsage,
}: {
  summaryUsage?: TokenUsageType | null;
  analyseUsage?: TokenUsageType | null;
}) {
  if (!summaryUsage && !analyseUsage) return null;

  const totalCost = (summaryUsage?.cost ?? 0) + (analyseUsage?.cost ?? 0);

  return (
    <div className="space-y-4 pt-8 animate-pop-in">
      <h2 className="font-label-caps text-label-caps text-secondary uppercase tracking-widest opacity-60 text-center">
        Token usage &amp; cost
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UsageCard title="Summarize" usage={summaryUsage} />
        <UsageCard title="Analyse" usage={analyseUsage} />
      </div>
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-md rounded-full px-5 py-2 border border-white/30 text-body-sm">
          <span className="text-on-surface-variant">Combined cost</span>
          <span className="text-on-surface font-semibold">
            {formatCost(totalCost)}
          </span>
        </div>
      </div>
    </div>
  );
}
