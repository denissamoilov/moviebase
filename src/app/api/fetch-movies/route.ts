export async function GET(request: Request) {
  const token = process.env.MOVIE_DB_API_KEY; // Ensure this is set correctly

  // DOCS: https://developer.themoviedb.org/reference/discover-movie
  // Extract query parameters from the request
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
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

  if (query) {
    params.append("query", query);
  }
  if (genre) {
    params.append("with_genres", genre); // Assuming genre is a comma-separated string of genre IDs
  }
  if (minRating) {
    params.append("vote_average.gte", minRating); // Filter by minimum rating
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
