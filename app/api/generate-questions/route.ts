import { smartModel } from "@/lib/ai";
import { interviewSystemPrompt } from "@/lib/prompts/interview";
import { questionsSchema } from "@/schemas/questionsSchema";
import { generateText, Output } from "ai";

export async function POST(req: Request) {
  const { jobDescription } = await req.json();

  if (!jobDescription) return new Response(null, { status: 400 });

  const { output } = await generateText({
    model: smartModel,
    output: Output.object({
      schema: questionsSchema,
    }),
    system: interviewSystemPrompt,
    prompt: jobDescription,
  });

  return Response.json(output.questions);
}
