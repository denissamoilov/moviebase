"use client";

import { useQuery } from "@tanstack/react-query";
import useMoviesStore from "./moviesStore";
import { MovieCard } from "./ui/MovieCard/MovieCard";
import { fetchMoviesResponseType, FiltersType } from "@/types";
import { useMemo } from "react";

async function fetchMoviesClient(
  searchQuery: FiltersType
): Promise<fetchMoviesResponseType> {
  const baseUrl = "/api/fetch-movies";

  const params = new URLSearchParams();

  if (searchQuery.genre && searchQuery.genre !== "all") {
    params.append("genre", searchQuery.genre);
  }

  if (searchQuery.minRating) {
    params.append("minRating", searchQuery.minRating);
  }

  const response = await fetch(`${baseUrl}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

async function searchMovie(query: string): Promise<fetchMoviesResponseType> {
  const response = await fetch(`/api/search-movie?query=${query}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const MovieList = () => {
  const filterQuery = useMoviesStore((state) => state.filters);
  const searchQuery = useMoviesStore((state) => state.searchQuery);

  const {
    data: fetchedMovies,
    isLoading: fetchIsLoading,
    isError: fetchIsError,
    error: fetchError,
  } = useQuery({
    queryKey: ["movies", filterQuery],
    queryFn: () => fetchMoviesClient(filterQuery),
  });

  const {
    data: searchResults,
    isLoading: searchIsLoading,
    isError: searchIsError,
    error: searchError,
  } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => searchMovie(searchQuery),
    enabled: !!searchQuery,
  });

  const isLoading = useMemo(
    () => fetchIsLoading || searchIsLoading,
    [fetchIsLoading, searchIsLoading]
  );

  const isError = useMemo(
    () => fetchIsError || searchIsError,
    [fetchIsError, searchIsError]
  );

  const error = useMemo(
    () => fetchError || searchError,
    [fetchError, searchError]
  );

  const movies = useMemo(
    () => (searchQuery ? searchResults : fetchedMovies),
    [searchQuery, searchResults, fetchedMovies]
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError && error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-3">
      {movies &&
        movies.data &&
        movies.data!.results.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
    </div>
  );
};
