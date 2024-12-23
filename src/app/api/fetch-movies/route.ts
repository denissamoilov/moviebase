export async function GET(request: Request) {
  const token = process.env.MOVIE_DB_API_KEY;

  // DOCS: https://developer.themoviedb.org/reference/discover-movie
  const url = new URL(request.url);
  const genre = url.searchParams.get("genre") || "";
  const minRating = url.searchParams.get("minRating") || "";

  const baseUrl = "https://api.themoviedb.org/3/discover/movie";

  const params = new URLSearchParams({
    include_adult: "false",
    include_video: "false",
    language: "en-US",
    page: "1",
    sort_by: "popularity.desc",
  });
  if (genre) {
    params.append("with_genres", genre);
  }
  if (minRating) {
    params.append("vote_average.gte", minRating);
  }

  const res = await fetch(`${baseUrl}?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  return Response.json({ data });
}
