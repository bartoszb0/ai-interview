import { smartModel } from "@/lib/ai";
import { aiErrorResponse } from "@/lib/api-errors";
import { interviewSystemPrompt } from "@/lib/prompts/interview";
import { questionsSchema } from "@/schemas/questionsSchema";
import { generateText, Output } from "ai";

export async function POST(req: Request) {
  const { jobDescription } = await req.json();

  if (!jobDescription) return new Response(null, { status: 400 });

  try {
    const { output } = await generateText({
      model: smartModel,
      output: Output.object({
        schema: questionsSchema,
      }),
      system: interviewSystemPrompt,
      prompt: jobDescription,
      maxRetries: 0,
    });

    return Response.json(output.questions);
  } catch (e) {
    return aiErrorResponse(e);
  }
}
