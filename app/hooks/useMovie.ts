import { useQuery } from "@tanstack/react-query";

export const GET_MOVIE_KEY = ["GET_MOVIE"];
export const getMovie = async ({ queryKey }: { queryKey: any }) => {
  const [_key, id] = queryKey;
  const res = await fetch(`http://localhost:9000/movies/${id}`);

  return res.json();
};

/**
 * Fetch Movie by Id (primary key)
 * contains queryKey to refetch cached data
 * @param id existing movie id
 */
export default function useMovie(id: string) {
  const {
    data: movie,
    isError,
    isLoading,
  } = useQuery([GET_MOVIE_KEY, id], getMovie, {
    refetchOnWindowFocus: false,
  });
  return { movie, isError, isLoading };
}
