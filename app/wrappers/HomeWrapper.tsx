import { QueryClient, dehydrate } from "@tanstack/react-query";

import Home from "../components/HomePage";
import { GET_MOVIES_KEY, getMovies } from "../hooks/useMovies";
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
