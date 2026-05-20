import { smartModel } from "@/lib/ai";
import { summarySystemPrompt } from "@/lib/prompts";
import { summarySchema } from "@/schemas/summarySchema";
import { generateText, Output } from "ai";

export async function POST(req: Request) {
  const { questions, messages } = await req.json();

  const { output } = await generateText({
    model: smartModel,
    output: Output.object({
      schema: summarySchema,
    }),
    system: summarySystemPrompt(questions),
    messages,
  });

  console.log(output);

  return Response.json(output);
}
