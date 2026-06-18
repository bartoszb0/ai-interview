import { toast } from "sonner";

const COOLDOWN_MS = 30_000;
let lastShown = 0;

export function notifyModelFallback(response: Response) {
  if (response.headers.get("X-Model-Fallback") !== "true") return;

  const now = Date.now();
  if (now - lastShown < COOLDOWN_MS) return;

  lastShown = now;
  toast.info("Rate limit hit, switched to a lighter model.");
}
