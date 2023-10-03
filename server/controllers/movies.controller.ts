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
