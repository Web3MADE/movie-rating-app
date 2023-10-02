import { getDatabase } from "../clients/database";
import { IMovie } from "../models/models";

export interface IGetMoviesProps {
  page?: number;
  limit?: number;
}

export async function getMovies({ page = 1, limit = 10 }: IGetMoviesProps) {
  try {
    const { movieCollection } = await getDatabase();
    let sortedMovies: IMovie[] = [];

    if (movieCollection) {
      const skip = (page - 1) * limit;
      sortedMovies = await movieCollection
        .find()
        .sort({ rating: "desc" })
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
