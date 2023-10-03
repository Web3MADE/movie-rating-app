import { getDatabase } from "../clients/database";
import { IMovie } from "../models/models";

export async function rateMovie(id: string, rating: string) {
  try {
    const { movieCollection } = await getDatabase();
    let movie = null;
    if (movieCollection) {
      movie = await movieCollection
        .findOne({
          selector: {
            id: id,
          },
        })
        .exec();
      if (movie) {
        const movieData = movie.toJSON(); // Convert RxDocument to plain object
        const mutableMovieData: IMovie = JSON.parse(JSON.stringify(movieData));
        const updatedMovie = updateAverageRating(mutableMovieData, rating);
        // spread to avoid mutation
        // fix readOnly string array error with genres
        await movieCollection.upsert({
          ...movieData,
          averageRating: updatedMovie.averageRating,
          genres: [...movieData.genres],
          ratings: [...movieData.ratings, rating],
        });

        // Keep temporarily for upsert reference
        movie = await movieCollection
          .findOne({
            selector: {
              id: id,
            },
          })
          .exec()
          .then((doc) => {
            console.log("updated movie ", doc?.toJSON());
          });
      }
    }

    return movie;
  } catch (error) {
    console.log("error ", error);
  }
}

function calculateAverageRating(ratings: string[]): string {
  if (ratings.length === 0) return "0";

  const sum = ratings.reduce((accumulator, rating) => {
    const numericRating = parseFloat(rating);
    return accumulator + (isNaN(numericRating) ? 0 : numericRating);
  }, 0);
  return Math.round(sum / ratings.length).toString();
}

function updateAverageRating(movie: IMovie, newRating: string): IMovie {
  movie.ratings.push(newRating);
  movie.averageRating = calculateAverageRating(movie.ratings);
  return movie;
}
