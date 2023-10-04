import { useQuery } from "@tanstack/react-query";
import { IHomeWrapperProps } from "../wrappers/HomeWrapper";

export const GET_MOVIES_KEY = ["GET_MOVIES"];
export const getMovies = async ({ queryKey }: { queryKey: any }) => {
  const [_key, page, limit, search] = queryKey;

  const url = new URL(`http://localhost:9000/movies`);
  if (page !== undefined) url.searchParams.append("page", page.toString());
  if (limit !== undefined) url.searchParams.append("limit", limit.toString());
  if (search !== undefined) url.searchParams.append("search", search);

  const res = await fetch(url.toString());

  return res.json();
};

/**
 * Fetch Movies with paginated params. Search ignores page and limit params
 * contains queryKey to refetch cached data
 * @param page page number
 * @param limit limit movies per page
 * @param search search query from url
 */
export default function useMovies({ page, limit, search }: IHomeWrapperProps) {
  const {
    data: movies,
    isError,
    isLoading,
  } = useQuery([GET_MOVIES_KEY, page, limit, search], getMovies, {
    refetchOnWindowFocus: false,
  });
  return { movies, isError, isLoading };
}
