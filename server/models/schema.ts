import { RxJsonSchema } from "rxdb";
import { IMovie } from "./models";

export const movieSchema: RxJsonSchema<IMovie> = {
  title: "movie schema",
  description: "describes a simple movie",
  version: 0,
  type: "object",
  primaryKey: "rating",
  properties: {
    id: {
      type: "integer",
    },
    title: {
      type: "string",
    },
    year: {
      type: "string",
    },
    runtime: {
      type: "string",
    },
    genres: {
      type: "array",
      items: {
        type: "string",
      },
    },
    director: {
      type: "string",
    },
    actors: {
      type: "string",
    },
    plot: {
      type: "string",
    },
    posterUrl: {
      type: "string",
    },
    rating: {
      type: "string",
    },
  },
  required: [
    "id",
    "title",
    "year",
    "runtime",
    "genres",
    "director",
    "actors",
    "plot",
    "posterUrl",
    "rating",
  ],
};
