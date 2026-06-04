import { smartModel } from "@/lib/ai";
import { aiErrorResponse } from "@/lib/api-errors";
import { summarySystemPrompt } from "@/lib/prompts/summary";
import { summarySchema } from "@/schemas/summarySchema";
import { generateText, Output } from "ai";

export async function POST(req: Request) {
  const { questionRecords } = await req.json();

  try {
    const { output } = await generateText({
      model: smartModel,
      output: Output.object({
        schema: summarySchema,
      }),
      system: summarySystemPrompt(questionRecords),
      prompt: "Generate the interview summary report",
      maxRetries: 0,
    });

    return Response.json(output);
  } catch (e) {
    return aiErrorResponse(e);
  }
}
