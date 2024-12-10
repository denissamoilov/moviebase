"use server";

import { getFetchResponse } from "@/shared/utils/utils";
import { fetchGenresResponseType } from "@/types";

export async function fetchGenres(): Promise<fetchGenresResponseType> {
  const baseUrl = "https://api.themoviedb.org/3/genre/movie/list?language=en";

  const response = await getFetchResponse(baseUrl);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("Genres fetched successfully:", data);

  return { data: { ...data } };
}
