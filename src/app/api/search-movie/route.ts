export async function GET(request: Request) {
  const token = process.env.MOVIE_DB_API_KEY;

  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("query") || "";

  const baseUrl = "https://api.themoviedb.org/3/search/movie";

  const params = new URLSearchParams({
    include_adult: "false",
    language: "en-US",
    query: searchQuery,
  });

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
