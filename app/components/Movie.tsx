"use client";
import { useRouter } from "next/navigation";
import useMovie from "../hooks/useMovie";
import useRating from "../hooks/useRating";
import MovieDetails from "./MovieDetails";
import NavigateBack from "./NavigateBack";

interface IMovieProps {
  id: string;
}

const Movie = ({ id }: IMovieProps) => {
  const {
    movie,
    isError: isMovieError,
    isLoading: isMovieLoading,
  } = useMovie(id);
  const {
    rate,
    isError: isRatingError,
    isLoading: isLoadingError,
  } = useRating(id);
  const router = useRouter();

  function handleNavigateBack() {
    router.back();
  }

  function handleSubmit(newRating: string) {
    rate(id, newRating);
  }

  if (isMovieLoading) return <div>Loading...</div>;

  if (isMovieError) return <div>Error loading data</div>;

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="mr-auto">
        <NavigateBack onClick={handleNavigateBack} />
      </div>
      <div>
        {movie && (
          <MovieDetails
            src={movie.posterUrl}
            placeholderSrc="/rakbankimg.jpeg"
            alt={movie.alt}
            genre={movie.genres[0]}
            releaseDate={movie.year}
            averageRating={movie.averageRating}
            description={movie.plot}
            title={movie.title}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </main>
  );
};

export default Movie;
