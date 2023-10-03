import { useMutation } from "@tanstack/react-query";

interface IRateMovie {
  id: string;
  rating: string;
}

export const rateMovie = async ({ id, rating }: IRateMovie) => {
  const res = await fetch(`http://localhost:9000/ratings/${id}`, {
    method: "PUT",
    body: JSON.stringify({ rating }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export default function useRating() {
  const mutation = useMutation(rateMovie);

  const rate = (id: string, rating: string) => {
    mutation.mutate({ id, rating });
  };

  return { rate, isLoading: mutation.isLoading, isError: mutation.isError };
}
