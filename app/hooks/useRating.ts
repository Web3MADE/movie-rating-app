import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_MOVIE_KEY } from "./useMovie";

interface IRateMovie {
  id: string;
  rating: string;
}
export const rateMovie = async ({ id, rating }: IRateMovie) => {
  console.log(id, rating);
  const res = await fetch(`http://localhost:9000/ratings/${id}`, {
    method: "PUT",
    body: JSON.stringify({ rating: rating }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export default function useRating() {
  const queryClient = useQueryClient();
  const mutation = useMutation(rateMovie, {
    onSuccess: () => queryClient.invalidateQueries(GET_MOVIE_KEY),
  });

  const rate = (id: string, rating: string) => {
    mutation.mutate({ id, rating });
  };

  return { rate, isLoading: mutation.isLoading, isError: mutation.isError };
}
