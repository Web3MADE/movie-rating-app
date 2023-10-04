import { IMovie } from "../models/models";
import { findMovieById, upsertMovie } from "../repositories/ratings.repository";

export async function rateMovie(
  id: string,
  rating: string
): Promise<IMovie | null> {
  try {
    let movie = await findMovieById(id);
    if (!movie) return null;
    const movieData = movie.toJSON();
    const mutableMovieData = JSON.parse(JSON.stringify(movieData));
    const updatedMovie = updateAverageRating(mutableMovieData, rating);
    await upsertMovie(updatedMovie, rating);

    return updatedMovie;
  } catch (error) {
    console.error("error ", error);
    throw error;
  }
}

export function calculateAverageRating(ratings: string[]): string {
  if (ratings.length === 0) return "0";
  const sum = ratings.reduce((acc, rating) => acc + parseFloat(rating), 0);
  return (sum / ratings.length).toFixed(1);
}

export function updateAverageRating(movie: IMovie, newRating: string): IMovie {
  movie.ratings.push(newRating);
  movie.averageRating = calculateAverageRating(movie.ratings);

  return movie;
}
