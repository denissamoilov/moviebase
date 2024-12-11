import { MovieList } from "@/features/MovieList/MovieList";
import { MovieSearch } from "@/features/MovieSearch/MovieSearch";
import { MovieFilter } from "@/features/MovieFilter/MovieFilter";
import { oswald } from "@/shared/utils";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { fetchMovies } from "./actions/fetchMovies";
import { fetchGenres } from "./actions/fetchGenres";
import { FiltersType } from "@/types";

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: FiltersType;
}) {
  const queryClient = new QueryClient();

  const filterQuery = {
    // query: searchParams.query || "",
    genre: searchParams.genre || "all",
    minRating: searchParams.minRating || "",
  };

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["movies", filterQuery],
      queryFn: () => fetchMovies(filterQuery),
    }),
    queryClient.prefetchQuery({
      queryKey: ["genres"],
      queryFn: fetchGenres,
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="text-white p-4">
        <div className="flex flex-col gap-3 md:gap-6 mb-8">
          <h1
            className={`${oswald.className} text-display-small md:text-display-large`}
          >
            Movie Hub
          </h1>
          <p className="md:text-lg">
            Movie Haven is your ultimate destination for discovering and
            exploring a vast library of films. With our intuitive search and
            filter features, you can easily find your favorite movies by title
            or genre. Dive into the world of cinema and enjoy a seamless
            browsing experience as you curate your personal watchlist!
          </p>
        </div>
        {/* <h2>TODO:</h2>
        <ol>
          <li>Search by title</li>
          <li>Filter by genre</li>
        </ol> */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-3 md:gap-6 justify-between">
            <MovieSearch />
            <MovieFilter />
          </div>
          <MovieList />
        </div>
      </div>
    </HydrationBoundary>
  );
}
