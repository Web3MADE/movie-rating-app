import { IMovie } from "../models/models";
import { findMovieById, upsertMovie } from "../repositories/ratings.repository";
import {
  calculateAverageRating,
  rateMovie,
  updateAverageRating,
} from "./ratings.service";

/**@dev mock repository */
jest.mock("../repositories/ratings.repository");
/**@dev mock dexie node module so it can be ignored */
jest.mock("dexie", () => {});

describe("Ratings Service", () => {
  const mockMovie: IMovie = {
    id: "1",
    title: "Beetlejuice",
    year: "1988",
    runtime: "92",
    genres: ["Comedy", "Fantasy"],
    director: "Tim Burton",
    actors: "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page",
    plot: 'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
    posterUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg",
    ratings: ["3", "4"],
    averageRating: "3.5",
  };
  describe("rateMovie function", () => {
    it("should return updated movie when rating is successful", async () => {
      (findMovieById as jest.Mock).mockResolvedValue({
        toJSON: () => mockMovie,
      });
      (upsertMovie as jest.Mock).mockResolvedValue(mockMovie);

      const result = await rateMovie("1", "5");
      expect(result?.averageRating).toBe("4.0");
    });

    it("should return null when movie not found", async () => {
      (findMovieById as jest.Mock).mockResolvedValue(null);
      const result = await rateMovie("1", "5");
      expect(result).toBeNull();
    });
  });

  describe("calculateAverageRating function", () => {
    it("should calculate average rating correctly", () => {
      const ratings = ["3", "4", "5"];
      const average = calculateAverageRating(ratings);
      expect(average).toBe("4.0");
    });

    it('should return "0" for empty ratings array', () => {
      const ratings: string[] = [];
      const average = calculateAverageRating(ratings);
      expect(average).toBe("0");
    });
  });

  describe("updateAverageRating function", () => {
    it("should correctly update the average rating after a new rating is added", () => {
      const newRating = "5";
      const updatedMovie = updateAverageRating(mockMovie, newRating);

      expect(updatedMovie.ratings).toContain(newRating);
      expect(updatedMovie.ratings.length).toBe(mockMovie.ratings.length);
      expect(updatedMovie.averageRating).toBe("4.0");
    });

    it("should handle the addition of a rating to an empty ratings array", () => {
      const movieWithEmptyRatings: IMovie = {
        id: "1",
        title: "Beetlejuice",
        year: "1988",
        runtime: "92",
        genres: ["Comedy", "Fantasy"],
        director: "Tim Burton",
        actors: "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page",
        plot: 'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
        posterUrl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg",
        ratings: [],
        averageRating: "0",
      };
      const newRating = "5";
      const updatedMovie = updateAverageRating(
        movieWithEmptyRatings,
        newRating
      );

      expect(updatedMovie.ratings).toContain(newRating);
      expect(updatedMovie.ratings.length).toBe(1);
      expect(updatedMovie.averageRating).toBe("5.0");
    });
  });
});
