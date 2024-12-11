import { FiltersType, GenreType, MovieType } from "@/types/movieTypes";
import { create } from "zustand";

interface MoviesState {
  movies: MovieType[];
  setMovies: (movies: MovieType[]) => void;
  genres: GenreType[];
  setGenres: (genres: GenreType[]) => void;
  filters: FiltersType;
  setFiltersQuery: (query: FiltersType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const useMoviesStore = create<MoviesState>((set) => ({
  movies: [],
  setMovies: (movies) => set({ movies }),
  genres: [],
  setGenres: (genres) => set({ genres }),
  filters: { genre: "all", minRating: "" },
  setFiltersQuery: (query) => set({ filters: query }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useMoviesStore;
