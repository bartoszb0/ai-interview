import { smartModel } from "@/lib/ai";
import { evaluateAnswerSystemPrompt } from "@/lib/prompts";
import { evaluateSchema } from "@/schemas/evaluateSchema";
import { generateText, Output } from "ai";

export async function POST(req: Request) {
  const { question, messages, seniority, followupCount } = await req.json();

  const trimmedMessages = messages.slice(-8);

  const { output } = await generateText({
    model: smartModel,
    output: Output.object({
      schema: evaluateSchema,
    }),
    system: evaluateAnswerSystemPrompt(question, seniority, followupCount),
    messages: trimmedMessages,
  });

  return Response.json(output);
}
