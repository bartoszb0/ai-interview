import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stripHtml = (html: string) => {
  const withNewlines = html.replace(
    /<\/?(p|div|h[1-6]|li|br|ul|ol)[^>]*>/gi,
    "\n",
  );
  const doc = new DOMParser().parseFromString(withNewlines, "text/html");
  return doc.body.textContent?.replace(/\n{3,}/g, "\n\n").trim() || "";
};
