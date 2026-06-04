import { smartModel } from "@/lib/ai";
import { aiErrorResponse } from "@/lib/api-errors";
import { evaluateAnswerSystemPrompt } from "@/lib/prompts/evaluate";
import { evaluateSchema } from "@/schemas/evaluateSchema";
import { generateText, Output } from "ai";

export async function POST(req: Request) {
  const { question, messages, seniority, followupCount } = await req.json();

  const trimmedMessages = messages.slice(-8);

  try {
    const { output } = await generateText({
      model: smartModel,
      output: Output.object({
        schema: evaluateSchema,
      }),
      system: evaluateAnswerSystemPrompt(question, seniority, followupCount),
      messages: trimmedMessages,
      maxRetries: 0,
    });

    return Response.json(output);
  } catch (e) {
    return aiErrorResponse(e);
  }
}
