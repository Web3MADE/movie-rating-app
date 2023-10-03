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
    let sortedMovies: IMovie[] = [];

    if (movieCollection) {
      let query = movieCollection.find();

      if (search) {
        query = query.where("title").regex(new RegExp(search, "i"));
      }

      const skip = (page - 1) * limit;
      sortedMovies = await query
        .sort({ averageRating: "desc" })
        .limit(limit)
        .skip(skip)
        .exec();
    }

    return sortedMovies;
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
