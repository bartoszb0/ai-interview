import { aiErrorResponse } from "@/lib/api-errors";
import { withModelFallback } from "@/lib/fallback";
import { evaluateAnswerSystemPrompt } from "@/lib/prompts/evaluate";
import { evaluateSchema } from "@/schemas/evaluateSchema";
import { generateText, Output } from "ai";

export async function POST(req: Request) {
  const { question, messages, seniority, followupCount } = await req.json();

  const trimmedMessages = messages.slice(-8);

  try {
    const { result, usedFallback } = await withModelFallback((model) =>
      generateText({
        model,
        output: Output.object({ schema: evaluateSchema }),
        system: evaluateAnswerSystemPrompt(question, seniority, followupCount),
        messages: trimmedMessages,
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
