import { IMovie } from "../api/models";
import Movie from "./Movie";

interface IMovieListProps {
  movies: IMovie[];
}

const MovieList = (props: IMovieListProps) => {
  return (
    <div className="movie-list">
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
    </div>
  );
};

export default MovieList;
