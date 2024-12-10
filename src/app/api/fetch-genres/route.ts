export async function GET(request: Request) {
  const token = process.env.MOVIE_DB_API_KEY;

  const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
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
  console.log("res ::", data);

  return Response.json({ data });
}