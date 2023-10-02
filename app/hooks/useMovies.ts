import { useQuery } from "@tanstack/react-query";

// TODO: set API URL + include /api in url, in next config
export const getMovies = async () => {
  const res = await fetch("http://localhost:9000/movies");

  return res.json();
};
export const GET_MOVIES_KEY = ["GET_MOVIES"];

export default function useMovies() {
  const {
    data: movies,
    isError,
    isLoading,
  } = useQuery(GET_MOVIES_KEY, getMovies, {
    refetchOnWindowFocus: false,
  });
  return { movies, isError, isLoading };
}
