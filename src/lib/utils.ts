import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isSubActive(dateString: string | null | undefined) {
  return !!dateString && new Date(dateString) > new Date();
}