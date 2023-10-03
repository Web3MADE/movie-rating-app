import { useQuery } from "@tanstack/react-query";

// TODO: set API URL + include /api in url, in next config
export const GET_MOVIES_KEY = ["GET_MOVIES"];
export const getMovies = async ({ queryKey }: { queryKey: any }) => {
  const [_key, page, limit] = queryKey;

  const url = new URL(`http://localhost:9000/movies`);
  if (page !== undefined) url.searchParams.append("page", page.toString());
  if (limit !== undefined) url.searchParams.append("limit", limit.toString());

  const res = await fetch(url.toString());

  return res.json();
};

export default function useMovies(page?: number, limit?: number) {
  const {
    data: movies,
    isError,
    isLoading,
  } = useQuery([GET_MOVIES_KEY, page, limit], getMovies, {
    refetchOnWindowFocus: false,
  });
  return { movies, isError, isLoading };
}
