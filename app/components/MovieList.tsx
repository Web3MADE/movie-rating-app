import { IMovie } from "@/server/models/models";
import Movie from "./MovieCard";

interface IMovieListProps {
  movies: IMovie[];
}

const MovieList = (props: IMovieListProps) => {
  return (
    <>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          thumbnailSrc={movie.posterUrl}
          title={movie.title}
          averageRating={movie.rating}
          onClick={() => {
            // Handle view details action, like navigation or modal opening
          }}
        />
      ))}
    </>
  );
};

export default MovieList;
