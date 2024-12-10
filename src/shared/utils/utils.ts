import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
const token = process.env.MOVIE_DB_API_KEY;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getFetchResponse(url: string) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
