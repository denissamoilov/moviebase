import { MovieList } from "@/features/MovieList/MovieList";
import { MovieSearch } from "@/features/MovieSearch/MovieSearch";
import { MovieFilter } from "@/features/MovieFilter/MovieFilter";
import { oswald } from "@/shared/utils";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchMovies } from "./actions/fetchMovies";
import { fetchGenres } from "./actions/fetchGenres";

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: { genre: string; minRating: string };
}) {
  const queryClient = new QueryClient();

  const filters = {
    genre: searchParams.genre || "all",
    minRating: searchParams.minRating || "0",
  };

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["movies", filters],
      queryFn: () => fetchMovies(filters),
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
        <div className="flex flex-col gap-6 mb-8">
          <h1 className={`${oswald.className} text-display-large`}>
            Movie Hub
          </h1>
          <p className="text-lg">
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
          <div className="flex gap-6 justify-between">
            <MovieSearch />
            <MovieFilter />
          </div>
          <MovieList {...searchParams} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
