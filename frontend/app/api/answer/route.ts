import { fastModel } from "@/lib/ai";
import { aiErrorResponse } from "@/lib/api-errors";
import { generateAnswerSystemPrompt } from "@/lib/prompts/generate-answer";
import { generateText } from "ai";

export async function POST(req: Request) {
  const { question } = await req.json();

  try {
    const { text } = await generateText({
      model: fastModel,
      system: generateAnswerSystemPrompt,
      prompt: question,
      maxRetries: 0,
    });
    return Response.json(text);
  } catch (e) {
    return aiErrorResponse(e);
  }
}
