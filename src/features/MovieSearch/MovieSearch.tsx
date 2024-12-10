"use client";

import { Button, Input } from "@/shared/ui";
import { Search } from "lucide-react";
import { useState } from "react";

type MovieSearchProps = {
  onSearch?: (e: string) => void;
};

export const MovieSearch = ({ onSearch }: MovieSearchProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    // onSearch(event.target.value); // Call the onSearch prop to update the movie list
  };

  return (
    <div className="flex gap-3 w-full max-w-md">
      <Input
        leftIcon={<Search strokeWidth={1.5} size={16} />}
        value={query}
        onChange={handleChange}
        placeholder="Search for movies..."
      />
      <Button>Search</Button>
    </div>
  );
};
