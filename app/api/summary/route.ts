import { aiErrorResponse } from "@/lib/api-errors";
import { withModelFallback } from "@/lib/fallback";
import { summarySystemPrompt } from "@/lib/prompts/summary";
import { summarySchema } from "@/schemas/summarySchema";
import { generateText, Output } from "ai";

export async function POST(req: Request) {
  const { questionRecords } = await req.json();

  try {
    const { result, usedFallback } = await withModelFallback((model) =>
      generateText({
        model,
        output: Output.object({ schema: summarySchema }),
        system: summarySystemPrompt(questionRecords),
        prompt: "Generate the interview summary report", // has to be here, actual logic lives in summarySystemPrompt
        maxRetries: 0,
      }),
    );

    return Response.json(result.output, {
      headers: usedFallback ? { "X-Model-Fallback": "true" } : undefined,
    });
  } catch (e) {
    return aiErrorResponse(e);
  }
}
