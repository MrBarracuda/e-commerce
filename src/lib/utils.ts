import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "@/env";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isSubActive(dateString: string | null) {
  return !!dateString && new Date(dateString) > new Date();
}

export function absoluteUrl(path: string) {
  return new URL(path, env.NEXT_PUBLIC_APP_URL).href;
}

export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  },
) {
  return new Intl.DateTimeFormat("en-US", {
    ...options,
  }).format(new Date(date));
}

export function formatPrice(
  price: number | string,
  options: Intl.NumberFormatOptions = {},
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: options.currency ?? "USD",
    notation: options.notation ?? "compact",
    ...options,
  }).format(Number(price));
}

export function convertPrice(price: number) {
  return price / 100;
}

export function handleError(err: unknown) {
  if (err instanceof TypeError) {
    console.log(err.message);
  } else if (typeof err === "string") {
    console.log(err.toUpperCase());
  } else {
    throw err;
  }
}

export function formatDateNew(date: Date) {
  return format(date, "PPP");
}
