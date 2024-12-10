import { FiltersType, MovieType } from "@/types/movieTypes";
import { create } from "zustand";

interface MoviesState {
  movies: MovieType[];
  setMovies: (movies: MovieType[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: FiltersType;
  setFilters: ({ genre, minRating }: FiltersType) => void;
}

const useMoviesStore = create<MoviesState>((set, get) => ({
  movies: [],
  setMovies: (movies) => set({ movies }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  filters: { genre: "", minRating: "0" },
  setFilters: ({ genre, minRating }) => set({ filters: { genre, minRating } }),
}));

export default useMoviesStore;
