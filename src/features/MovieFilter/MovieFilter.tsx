"use client";

import { Input, Select } from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { memo, useCallback, useEffect, useState } from "react";
import useMoviesStore from "../MovieList/moviesStore";
import { fetchGenresResponseType } from "@/types/movieTypes";

async function fetchGenresClient(): Promise<fetchGenresResponseType> {
  const response = await fetch("/api/fetch-genres");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const MovieFilter = memo(() => {
  const filtersQuery = useMoviesStore((state) => state.filters);
  const setFiltersQuery = useMoviesStore((state) => state.setFiltersQuery);
  const setGenres = useMoviesStore((state) => state.setGenres);

  const {
    data: genres,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenresClient,
  });

  useEffect(() => {
    if (genres) {
      setGenres(genres.data.genres); // Set genres in the store
    }
  }, [genres, setGenres]);

  if (isLoading) return <div>Loading...</div>;
  if (isError && error) return <div>Error: {error.message}</div>;

  console.log("genres :: ", genres);

  const handleGenreChange = useCallback((value: string) => {
    setFiltersQuery({ ...filtersQuery, genre: value });
  }, []);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltersQuery({ ...filtersQuery, minRating: event.target.value });
  };

  return (
    <div className="flex gap-3">
      <div className="w-full">
        <Select
          className="grow"
          value={filtersQuery.genre}
          onChange={handleGenreChange}
          options={[
            { value: "all", label: "All Genres" },
            ...genres!.data.genres.map(({ id, name }) => ({
              value: id.toString(),
              label: name,
            })),
          ]}
        />
      </div>

      <Input
        type="number"
        value={filtersQuery.minRating}
        onChange={handleRatingChange}
        placeholder="Minimum Rating"
        min="0"
        max="10"
        className="flex-1"
      />
    </div>
  );
});
