import { QueryClient, dehydrate } from "@tanstack/react-query";
import Movie from "../components/pages/Movie";
import { GET_MOVIE_KEY, getMovie } from "../hooks/useMovie";
import { IPageProps } from "../movies/[id]/page";
import Hydrate from "../providers/Hydrate";

/**
 * Wraps Movie client component with hydrated data
 * @param params contains existing movie id from url
 */
export default async function MovieWrapper({ params }: IPageProps) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([GET_MOVIE_KEY, params.id], getMovie);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Movie id={params.id} />
    </Hydrate>
  );
}
