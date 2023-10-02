import { data } from "@/server/models/data";
import MovieDetails from "./MovieDetails";

const movie = data.movies[1];

const MoviePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <h1>Movie Page</h1>

      <div>
        <MovieDetails
          src={movie.posterUrl}
          alt={""}
          genre={movie.genres[0]}
          releaseDate={movie.year}
          averageRating={movie.rating}
          description={movie.plot}
          title={movie.title}
        />
      </div>
    </main>
  );
};

export default MoviePage;
