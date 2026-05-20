import { z } from "zod";

export const questionsSchema = z.object({
  questions: z.array(
    z.object({
      text: z.string().describe("The question itself"),
      topic: z.string().describe("Topic of the question"),
      difficulty: z
        .enum(["easy", "medium", "hard"])
        .describe("Question difficulty in the interview"),
    }),
  ),
});

export type Question = z.infer<typeof questionsSchema>["questions"][number];
