import { z } from "zod";

export const summarySchema = z.object({
  overallScore: z.number().describe("0-100 percentage score"),
  whatWentWell: z.array(z.string()).describe("3-5 specific bullet points"),
  areasForImprovement: z
    .array(z.string())
    .describe("3-5 actionable bullet points"),
});

export type Summary = z.infer<typeof summarySchema>;
