import { QueryClient, dehydrate } from "@tanstack/react-query";
import MoviePage from "../components/MoviePage";
import { getMovie } from "../hooks/useMovie";
import { GET_MOVIES_KEY } from "../hooks/useMovies";
import Hydrate from "../providers/Hydrate";

export default async function MovieWrapper() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(GET_MOVIES_KEY, getMovie);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <MoviePage />
    </Hydrate>
  );
}
