import { Controller, Get, Path, Queries, Route } from "tsoa";
import { IMovie } from "../models/models";
import { getMovie, getMovies } from "../services/movies.service";

export interface IGetMoviesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}
@Route("movies")
export class MoviesController extends Controller {
  /**
   * Fetches paginated movies.
   * pass optional page, limit and search params (default to 10 movies per page).
   * @param queryParams page, limit and search params
   */
  @Get()
  public async getMovies(
    @Queries() queryParams: IGetMoviesQueryParams
  ): Promise<IMovie[] | undefined> {
    try {
      return getMovies(queryParams);
    } catch (error) {
      this.setStatus(500);
      console.error("Caught error", error);
    }
  }

  /**
   * Fetch Movie by Id (primary key)
   * @param id existing movie id
   */
  @Get("{id}")
  public async getMovie(
    @Path() id: string
  ): Promise<IMovie | undefined | null> {
    try {
      return getMovie(id);
    } catch (error) {
      this.setStatus(500);
      console.error("Caught error", error);
    }
  }
}
