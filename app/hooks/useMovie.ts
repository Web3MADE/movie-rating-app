import { useQuery } from "@tanstack/react-query";

export const GET_MOVIE_KEY = ["GET_MOVIE"];
export const getMovie = async () => {
  const res = await fetch("http://localhost:9000/movies");

  return res.json();
};

export default function useMovie() {
  const {
    data: movie,
    isError,
    isLoading,
  } = useQuery(GET_MOVIE_KEY, getMovie, {
    refetchOnWindowFocus: false,
  });
  return { movie, isError, isLoading };
}
