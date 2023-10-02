import { Controller, Get, Path, Route } from "tsoa";
import { IMovie } from "../models/models";
import { getMovie, getMovies } from "../services/movies.service";

// TODO: fix query param decorator error
@Route("movies")
export class MoviesController extends Controller {
  @Get()
  public async getMovies(): Promise<IMovie[] | undefined> {
    try {
      return getMovies({ page: 1, limit: 10 });
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
