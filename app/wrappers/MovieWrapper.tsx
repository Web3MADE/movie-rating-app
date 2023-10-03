import { QueryClient, dehydrate } from "@tanstack/react-query";
import Movie from "../components/Movie";
import { GET_MOVIE_KEY, getMovie } from "../hooks/useMovie";
import { IPageProps } from "../movies/[id]/page";
import Hydrate from "../providers/Hydrate";

export default async function MovieWrapper({ params }: IPageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [GET_MOVIE_KEY, params.id],
    queryFn: getMovie,
  });
  const dehydratedState = dehydrate(queryClient);
  console.log("called ", params.id);

  return (
    <Hydrate state={dehydratedState}>
      <Movie id={params.id} />
    </Hydrate>
  );
}
