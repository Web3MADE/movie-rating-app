import { RxDocument } from "rxdb";
import { getDatabase } from "../clients/database";
import { IMovie } from "../models/models";

export async function findMovieById(
  id: string
): Promise<RxDocument<IMovie, {}> | null> {
  const { movieCollection } = await getDatabase();
  return movieCollection
    ? movieCollection.findOne({ selector: { id } }).exec()
    : null;
}

export async function upsertMovie(
  movie: IMovie,
  rating: string
): Promise<void> {
  const { movieCollection } = await getDatabase();
  if (movieCollection) {
    const existingMovie = await findMovieById(movie.id);
    if (existingMovie) {
      const movieData = existingMovie.toJSON();
      const updatedMovie = {
        ...movieData,
        averageRating: movie.averageRating,
        ratings: [...movieData.ratings, rating],
        genres: [...movieData.genres],
      };
      await movieCollection.upsert(updatedMovie);
    } else {
      await movieCollection.upsert(movie);
    }
  }
}
