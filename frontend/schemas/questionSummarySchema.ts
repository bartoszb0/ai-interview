import { z } from "zod";

export const questionSummarySchema = z
  .object({
    score: z.number().min(1).max(5).describe("1-5 score for this question"),
    correct: z.array(z.string()).describe("What they got right"),
    gaps: z
      .array(z.string())
      .describe(
        "Factual errors or missing concepts that were directly relevant to the question asked — not stylistic improvements",
      ),
    improvements: z
      .array(z.string())
      .describe(
        "Optional techniques that would have elevated the answer beyond what was asked — leave empty if the answer was complete",
      ),
  })
  .nullable()
  .describe(
    "ALWAYS include this field. Set to null when decision is follow_up. Populate when decision is next_question.",
  );

export type QuestionSummary = z.infer<typeof questionSummarySchema>;
