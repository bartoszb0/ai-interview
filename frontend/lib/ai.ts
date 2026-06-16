import { groq } from "@ai-sdk/groq";

export const fastModel = groq("meta-llama/llama-4-scout-17b-16e-instruct"); // evaluation — fast, high limits
export const smartModel = groq("openai/gpt-oss-120b"); // question gen + summary — best reasoning
