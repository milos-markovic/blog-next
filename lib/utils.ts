import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenByWords(text: string, wordLimit: number) {
  if (!text) return "";

  const words = text.trim().split(/\s+/); // podeli po razmaku

  if (words.length <= wordLimit) {
    return text; // nema potrebe da se skracuje
  }

  return words.slice(0, wordLimit).join(" ") + "...";
}
