import { QueryClient, dehydrate } from "@tanstack/react-query";

import Home from "../components/Home";
import { GET_MOVIES_KEY, getMovies } from "../hooks/useMovies";
import Hydrate from "../providers/Hydrate";

interface IHomeWrapperProps {
  page: number;
  limit: number;
  search?: string;
}

export default async function HomeWrapper({
  page,
  limit,
  search,
}: IHomeWrapperProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([GET_MOVIES_KEY, page, limit], getMovies);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Home />
    </Hydrate>
  );
}
