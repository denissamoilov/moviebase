"use client";

import { useQuery } from "@tanstack/react-query";
import useMoviesStore from "./moviesStore";
import { MovieCard } from "./ui/MovieCard/MovieCard";
import { fetchMoviesResponseType, FiltersType } from "@/types";

async function fetchMoviesClient(
  filters: FiltersType
): Promise<fetchMoviesResponseType> {
  const baseUrl = "/api/fetch-movies";

  const params = new URLSearchParams();

  if (filters.genre && filters.genre !== "all") {
    params.append("genre", filters.genre);
  }

  if (filters.minRating) {
    params.append("minRating", filters.minRating);
  }

  const response = await fetch(`${baseUrl}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const MovieList = () => {
  // const setMovies = useMoviesStore((state) => state.setMovies);
  // const movies = useMoviesStore((state) => state.movies);
  // const filters = useMoviesStore((state) => state.filters);
  const filters = useMoviesStore((state) => state.filters);

  const {
    data: movies,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movies", filters],
    queryFn: () => fetchMoviesClient(filters),
  });

  console.log("movies :: ", movies);

  if (isLoading) return <div>Loading...</div>;
  if (isError && error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4">
      {movies &&
        movies.data!.results.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
    </div>
  );
};
