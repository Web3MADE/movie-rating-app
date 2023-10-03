import { useMutation, useQueryClient } from "@tanstack/react-query";

export const RATE_MOVIE_KEY = ["RATE_MOVIE"];
export const rateMovie = async (id: string, rating: string) => {
  const res = await fetch(`http://localhost:9000/ratings/${id}`, {
    method: "PUT",
    body: JSON.stringify({ rating }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export default async function useRating(id: string, rating: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation(await rateMovie(id, rating), {
    onSuccess: () => {
      queryClient.invalidateQueries(RATE_MOVIE_KEY);
    },
  });

  return mutation;
}
