import { Body, Controller, Path, Put, Route } from "tsoa";
import { rateMovie } from "../services/ratings.service";

// TODO: fix 404 error
@Route("ratings")
export class RatingsController extends Controller {
  @Put("{id}")
  public async rateMovie(
    @Path() id: string,
    @Body() rating: string
  ): Promise<void> {
    try {
      await rateMovie(id, rating);
    } catch (error) {
      this.setStatus(500);
      console.error("Caught error", error);
    }
  }
}
