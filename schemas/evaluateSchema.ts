import { z } from "zod";
import { questionSummarySchema } from "./questionSummarySchema";

export const evaluateSchema = z.object({
  feedback: z
    .string()
    .describe("Short, concise feedback or follow-up question"),
  decision: z
    .enum(["next_question", "follow_up"])
    .describe("Decide what's the next step"),
  questionSummary: questionSummarySchema,
});

export type Evaluation = z.infer<typeof evaluateSchema>;
