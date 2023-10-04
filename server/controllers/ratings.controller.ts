import { Body, Controller, Path, Put, Route } from "tsoa";
import { rateMovie } from "../services/ratings.service";

@Route("ratings")
export class RatingsController extends Controller {
  /**
   * Upsert movie rating, based on its id
   * The averageRating field is updated on the movie document
   * @param id existing movie id
   * @param body new rating value
   */
  @Put("{id}")
  public async rateMovie(
    @Path() id: string,
    @Body() body: { rating: string }
  ): Promise<void> {
    try {
      await rateMovie(id, body.rating);
    } catch (error) {
      this.setStatus(500);
      console.error("Caught error", error);
    }
  }
}
