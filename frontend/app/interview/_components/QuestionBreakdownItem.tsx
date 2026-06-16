import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QuestionRecord } from "@/types/questionRecord";

function DetailList({
  label,
  items,
  labelColor,
  bulletColor,
  symbol,
}: {
  label: string;
  items: string[];
  labelColor: string;
  bulletColor: string;
  symbol: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-1.5">
      <span
        className={`text-xs font-mono ${labelColor} uppercase tracking-widest`}
      >
        {label}
      </span>
      {items.map((item, i) => (
        <p key={i} className="text-sm text-foreground/60 flex gap-2">
          <span className={`${bulletColor} shrink-0`}>{symbol}</span>
          {item}
        </p>
      ))}
    </div>
  );
}

export default function QuestionBreakdownItem({
  record,
}: {
  record: QuestionRecord;
}) {
  const qs = record.summary;
  if (!qs) return null;

  const badgeClasses =
    qs.score >= 4
      ? "bg-chart-1/10 border-chart-1/30 text-chart-1"
      : qs.score >= 3
        ? "bg-chart-3/10 border-chart-3/30 text-chart-3"
        : "bg-destructive/10 border-destructive/30 text-destructive";

  return (
    <div className="bg-muted/40 rounded-2xl border border-border/30 px-4 sm:px-6 py-4 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <p className="flex-1 min-w-0 text-sm font-medium text-foreground/80 leading-relaxed">
          {record.question.text}
        </p>
        <span
          className={`shrink-0 text-xs font-mono font-bold px-2 py-0.5 rounded-full border ${badgeClasses}`}
        >
          {qs.score}/5
        </span>
      </div>

      {record.exchanges.length > 0 && (
        <Accordion type="single" collapsible>
          <AccordionItem value="conversation" className="border-none">
            <AccordionTrigger className="hover:no-underline py-0 text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
              Conversation
            </AccordionTrigger>
            <AccordionContent className="pb-0 pt-3">
              <div className="flex flex-col gap-3">
                {record.exchanges.map((exchange, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <p className="text-sm text-foreground/60 italic leading-relaxed">
                      &ldquo;{exchange.answer}&rdquo;
                    </p>
                    <p className="text-sm text-muted-foreground/60 pl-3 border-l border-border/50 leading-relaxed">
                      {exchange.feedback}
                    </p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <div className="border-t border-border/20" />

      <DetailList
        label="Correct"
        items={qs.correct}
        labelColor="text-chart-1/60"
        bulletColor="text-chart-1/50"
        symbol="✓"
      />
      <DetailList
        label="Gaps"
        items={qs.gaps}
        labelColor="text-destructive/60"
        bulletColor="text-destructive/50"
        symbol="✗"
      />
      <DetailList
        label="Could improve"
        items={qs.improvements}
        labelColor="text-chart-3/60"
        bulletColor="text-chart-3/50"
        symbol="△"
      />
    </div>
  );
}
