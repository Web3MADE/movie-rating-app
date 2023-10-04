import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_MOVIE_KEY } from "./useMovie";

interface IRateMovie {
  id: string;
  rating: string;
}
export const rateMovie = async ({ id, rating }: IRateMovie) => {
  await fetch(`http://localhost:9000/ratings/${id}`, {
    method: "PUT",
    body: JSON.stringify({ rating: rating }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Rate Movie by Id (primary key)
 * @param id existing movie id
 * @param rating new rating value
 */
export default function useRating(id: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation(rateMovie, {
    onSuccess: () => queryClient.invalidateQueries([GET_MOVIE_KEY, id]),
  });

  const rate = (id: string, rating: string) => {
    mutation.mutate({ id, rating });
  };

  return { rate };
}
