"use server";

import { getFetchResponse } from "@/shared/utils/utils";
import { fetchMoviesResponseType, FiltersType } from "@/types";

export async function fetchMovies({
  genre = "",
  minRating = "",
}: FiltersType): Promise<fetchMoviesResponseType> {
  const baseUrl = "https://api.themoviedb.org/3/discover/movie";

  const params = new URLSearchParams({
    include_adult: "false",
    include_video: "false",
    language: "en-US",
    page: "1",
    sort_by: "popularity.desc",
    with_genres: genre,
    "vote_average.gte": minRating,
  });

  const response = await getFetchResponse(`${baseUrl}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
