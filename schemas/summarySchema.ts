import { z } from "zod";

export const summarySchema = z.object({
  overallScore: z.number().describe("0-100 percentage score"),
  whatWentWell: z.array(z.string()).describe("3-5 specific bullet points"),
  areasForImprovement: z
    .array(z.string())
    .describe("3-5 actionable bullet points"),
  questionBreakdowns: z.array(
    z.object({
      question: z.string(),
      topic: z.string(),
      score: z.number().describe("0-100"),
      userAnswer: z.string().describe("Answer provided by user"),
      feedback: z.object({
        correct: z
          .array(z.string())
          .describe("What they got right — specific to what they said"),
        missing: z.array(z.string()).describe("What they missed or got wrong"),
        couldAdd: z
          .array(z.string())
          .describe("What would have elevated the answer — optional"),
      }),
    }),
  ),
});

export type Summary = z.infer<typeof summarySchema>;
