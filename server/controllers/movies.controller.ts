import { Controller, Get, Route } from "tsoa";
import { IMovie } from "../models/models";
import getMovies from "../services/movies.service";

@Route("movies")
export class MoviesController extends Controller {
  @Get("/")
  public async getMovies(): Promise<IMovie[] | undefined> {
    try {
      return getMovies();
    } catch (error) {
      this.setStatus(500);
      console.error("Caught error", error);
    }
  }
}
