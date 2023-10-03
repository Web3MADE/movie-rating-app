import { Body, Controller, Path, Put, Route } from "tsoa";
import { rateMovie } from "../services/ratings.service";

@Route("ratings")
export class RatingsController extends Controller {
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
