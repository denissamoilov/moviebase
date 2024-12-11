"use client";

import { Button, Input } from "@/shared/ui";
import { Search } from "lucide-react";
import { useCallback, useState } from "react";
import useMoviesStore from "../MovieList/moviesStore";

export const MovieSearch = () => {
  const [query, setQuery] = useState("");

  const setSearchQuery = useMoviesStore((state) => state.setSearchQuery);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  const onSearchHandle = useCallback(() => {
    console.log("query ::", query);
    setSearchQuery(query);
  }, [query, setSearchQuery]);

  const handleClear = useCallback(() => {
    setQuery("");
    setSearchQuery("");
  }, [setSearchQuery]);

  return (
    <div className="flex gap-3 w-full md:max-w-md">
      <Input
        leftIcon={<Search strokeWidth={1.5} size={16} />}
        defaultValue={query}
        onChange={handleChange}
        placeholder="Search for movies..."
        onClear={handleClear}
      />
      <Button onClick={onSearchHandle} disabled={!query}>
        Search
      </Button>
    </div>
  );
};
