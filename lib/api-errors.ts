import { APICallError } from "ai";

export default function isRateLimit(e: unknown): boolean {
  if (APICallError.isInstance(e)) return e.statusCode === 429;
  return false;
}
