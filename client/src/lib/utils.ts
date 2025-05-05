import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const copyLink = (shortLink: string) => {
  navigator.clipboard.writeText(shortLink);
  toast("Copied text successfully");
};

export const linkGenerator = (shortLink: string) => {
  return `${import.meta.env.VITE_WEB_URL}/link/${shortLink}`;
};
