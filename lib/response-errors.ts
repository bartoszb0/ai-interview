import { toast } from "sonner";

export function handleResponseError(response: Response, message: string): void {
  if (response.status === 429) {
    toast.error("Rate limit hit, try again in a moment");
  } else {
    toast.error(message);
  }
}
