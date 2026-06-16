import { APICallError, RetryError } from "ai";

export function isRateLimit(e: unknown): boolean {
  if (APICallError.isInstance(e)) return e.statusCode === 429;
  if (RetryError.isInstance(e)) return e.errors.some(isRateLimit);
  return false;
}

export function aiErrorResponse(e: unknown): Response {
  if (isRateLimit(e)) return new Response("rate limited", { status: 429 });
  console.error(e); // so a real bug still shows up in logs
  return new Response(null, { status: 500 });
}
