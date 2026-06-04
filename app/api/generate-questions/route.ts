import { aiErrorResponse } from "@/lib/api-errors";
import { withModelFallback } from "@/lib/fallback";
import { interviewSystemPrompt } from "@/lib/prompts/interview";
import { questionsSchema } from "@/schemas/questionsSchema";
import { generateText, Output } from "ai";

export async function POST(req: Request) {
  const { jobDescription } = await req.json();

  if (!jobDescription) return new Response(null, { status: 400 });

  try {
    const { result, usedFallback } = await withModelFallback((model) =>
      generateText({
        model,
        output: Output.object({ schema: questionsSchema }),
        system: interviewSystemPrompt,
        prompt: jobDescription,
        maxRetries: 0,
      }),
    );

    return Response.json(result.output.questions, {
      headers: usedFallback ? { "X-Model-Fallback": "true" } : undefined,
    });
  } catch (e) {
    return aiErrorResponse(e);
  }
}
