import { z } from "zod";

export const evaluateSchema = z.object({
  feedback: z
    .string()
    .describe("Short, concise feedback or follow-up question"),
  decision: z
    .enum(["next_question", "follow_up"])
    .describe("Decide what's the next step"),
  questionSummary: z
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
    ),
});

export type Evaluation = z.infer<typeof evaluateSchema>;
