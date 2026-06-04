import { fastModel } from "@/lib/ai";
import { generateAnswerSystemPrompt } from "@/lib/prompts/generate-answer";
import { generateText } from "ai";

export async function POST(req: Request) {
  const { question } = await req.json();

  const { text } = await generateText({
    model: fastModel,
    system: generateAnswerSystemPrompt,
    prompt: question,
  });

  return Response.json(text);
}
