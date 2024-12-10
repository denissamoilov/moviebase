"use client";

import { Input, Select } from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { memo, useCallback, useState } from "react";
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
  const setFilters = useMoviesStore((state) => state.setFilters);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [minRating, setMinRating] = useState("0");

  const {
    data: genres,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenresClient,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError && error) return <div>Error: {error.message}</div>;

  const handleGenreChange = useCallback((value: string) => {
    setSelectedGenre(value);
    setFilters({ genre: value, minRating });
  }, []);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ genre: selectedGenre, minRating: event.target.value }); // Update filters
  };

  return (
    <div className="flex gap-3">
      <Select
        value={selectedGenre}
        onChange={handleGenreChange}
        options={[
          { value: "all", label: "All Genres" },
          ...genres!.data.genres.map(({ id, name }) => ({
            value: id.toString(),
            label: name,
          })),
        ]}
      />

      <Input
        type="number"
        value={minRating}
        onChange={handleRatingChange}
        placeholder="Minimum Rating"
        min="0"
        max="10"
      />
    </div>
  );
});
