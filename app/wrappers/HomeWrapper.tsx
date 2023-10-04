import { QueryClient, dehydrate } from "@tanstack/react-query";

import Home from "../components/pages/Home";
import { GET_MOVIES_KEY, getMovies } from "../hooks/useMovies";
import Hydrate from "../providers/Hydrate";

export interface IHomeWrapperProps {
  page: number;
  limit: number;
  search?: string;
}

/**
 * Wraps Home client component with hydrated data
 * @param page page number
 * @param limit limit movies per page
 * @param search search query from url
 */
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
      <Home page={page} limit={limit} search={search} />
    </Hydrate>
  );
}
