import { getFetchResponse } from "@/shared/utils/utils";

export async function searchMovie(query: string) {
  const baseUrl = "https://api.themoviedb.org/3/search/movie";

  console.log("query :: ", query);

  const params = new URLSearchParams({
    include_adult: "false",
    language: "en-US",
    query: query,
  });

  const response = await getFetchResponse(`${baseUrl}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
