import { fastModel, smartModel } from "@/lib/ai";
import { isRateLimit } from "@/lib/api-errors";
import type { LanguageModel } from "ai";

export async function withModelFallback<T>(
  run: (model: LanguageModel) => Promise<T>,
) {
  try {
    return { result: await run(smartModel), usedFallback: false };
  } catch (e) {
    if (!isRateLimit(e)) throw e; // real error → bubble to aiErrorResponse → 500
    return { result: await run(fastModel), usedFallback: true }; // smart limited → try fast
    // if fastModel is ALSO limited, run() throws a 429 → caught below → aiErrorResponse → 429
  }
}
