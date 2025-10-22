export async function GET() {
  const token = process.env.MOVIE_DB_API_KEY;

  if (!token) {
    return Response.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return Response.json(
      { error: `HTTP error! status: ${res.status}` },
      { status: res.status }
    );
  }

  const data = await res.json();

  return Response.json({ data });
}
