import { IGetMoviesQueryParams } from "../controllers/movies.controller";
import { findMovies, findOneMovie } from "../repositories/movies.repository";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../utils/constants";
/**@notice getMovies with paginated params. Search ignores page and limit params */
export async function getMovies({
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT,
  search = "",
}: IGetMoviesQueryParams) {
  try {
    const regexp = new RegExp(`.*${search}.*`, "i");
    const movies = await findMovies({ title: { $regex: regexp } });
    const start = (page - 1) * limit;
    const sortedMovies = movies
      .sort((a, b) => Number(b.averageRating) - Number(a.averageRating))
      .slice(start, start + limit);
    return sortedMovies;
  } catch (error) {
    console.error("error ", error);
    throw error;
  }
}
/**@notice getMovie by Id */
export async function getMovie(id: string) {
  try {
    return await findOneMovie({ id });
  } catch (error) {
    console.error("error ", error);
    throw error;
  }
}
