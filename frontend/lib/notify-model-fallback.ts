import { toast } from "sonner";

export function notifyModelFallback(response: Response) {
  if (response.headers.get("X-Model-Fallback") === "true") {
    toast.info("Rate limit hit, switched to a lighter model.");
  }
}
