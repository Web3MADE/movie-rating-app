import { QueryClient, dehydrate } from "@tanstack/react-query";
import getMovies, { GET_MOVIES_KEY } from "../api/services/movies.service";
import Home from "../components/Home";
import Hydrate from "../providers/Hydrate";

export default async function HomeWrapper() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(GET_MOVIES_KEY, getMovies);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Home />
    </Hydrate>
  );
}
