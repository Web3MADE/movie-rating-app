import { Controller, Path, Post, Route } from "tsoa";
import { rateMovie } from "../services/ratings.service";

@Route("ratings")
export class RatingsController extends Controller {
  @Post("{id}/rate/{rating}")
  public async rateMovie(
    @Path() id: string,
    @Path() rating: string
  ): Promise<void> {
    try {
      await rateMovie(id, rating);
    } catch (error) {
      this.setStatus(500);
      console.error("Caught error", error);
    }
  }
}
