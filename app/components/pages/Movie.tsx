"use client";
import { useRouter } from "next/navigation";
import useMovie from "../../hooks/useMovie";
import useRating from "../../hooks/useRating";
import { PLACEHOLDER_IMG } from "../../utils/constants";
import MovieDetails from "../movie/MovieDetails";
import NavigateBack from "../search/NavigateBack";

interface IMovieProps {
  id: string;
}

const Movie = (props: IMovieProps) => {
  const { movie, isError, isLoading } = useMovie(props.id);
  const { rate } = useRating(props.id);
  const router = useRouter();

  function handleNavigateBack() {
    router.back();
  }

  function handleSubmit(newRating: string) {
    rate(props.id, newRating);
  }

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error loading data</div>;

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="mr-auto">
        <NavigateBack onClick={handleNavigateBack} />
      </div>
      <div className="max-w-64">
        {movie && (
          <MovieDetails
            src={movie.posterUrl}
            placeholderSrc={PLACEHOLDER_IMG}
            alt={movie.alt}
            genre={movie.genres[0]}
            releaseDate={movie.year}
            averageRating={movie.averageRating}
            description={movie.plot}
            title={movie.title}
            objectFit={"contain"}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </main>
  );
};

export default Movie;
