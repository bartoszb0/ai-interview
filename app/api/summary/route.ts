import { smartModel } from "@/lib/ai";
import { summarySystemPrompt } from "@/lib/prompts/summary";
import { summarySchema } from "@/schemas/summarySchema";
import { generateText, Output } from "ai";

export async function POST(req: Request) {
  const { questionRecords } = await req.json();

  const { output } = await generateText({
    model: smartModel,
    output: Output.object({
      schema: summarySchema,
    }),
    system: summarySystemPrompt(questionRecords),
    prompt: "Generate the interview summary report",
  });

  return Response.json(output);
}
