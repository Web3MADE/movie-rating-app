"use client";
import useMovie from "../hooks/useMovie";
import MovieDetails from "./MovieDetails";

interface IMovieProps {
  id: string;
}

const Movie = ({ id }: IMovieProps) => {
  const { movie, isError, isLoading } = useMovie(id);

  console.log(movie);

  async function handleSubmit(newRating: string) {}

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error loading data</div>;

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div>
        {movie && (
          <MovieDetails
            src={movie.posterUrl}
            alt={""}
            genre={movie.genres[0]}
            releaseDate={movie.year}
            averageRating={movie.rating}
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
