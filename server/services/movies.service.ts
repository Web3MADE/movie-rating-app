import { getDatabase } from "../clients/database";
import { IGetMoviesQueryParams } from "../controllers/movies.controller";
import { IMovie } from "../models/models";

export async function getMovies({
  page = 1,
  limit = 10,
  search = "",
}: IGetMoviesQueryParams) {
  try {
    const { movieCollection } = await getDatabase();
    let movies: IMovie[] = [];

    if (movieCollection) {
      const regexp = new RegExp(`.*${search}.*`, "i");

      movies = await movieCollection
        .find({
          selector: {
            title: { $regex: regexp },
          },
        })
        .exec();

      const start = (page - 1) * limit;
      const sortedMovies = movies
        .sort((a, b) => Number(b.averageRating) - Number(a.averageRating))
        .slice(start, Math.min(start + limit, movies.length));

      return sortedMovies;
    }
    return movies;
  } catch (error) {
    console.log("error ", error);
  }
}

export async function getMovie(id: string) {
  try {
    const { movieCollection } = await getDatabase();
    let movie: IMovie | null = null;

    if (movieCollection) {
      movie = await movieCollection
        .findOne({
          selector: {
            id: id,
          },
        })
        .exec();
    }

    return movie;
  } catch (error) {
    console.log("error ", error);
  }
}
