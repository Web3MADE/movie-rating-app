import * as moviesRepository from "../repositories/movies.repository";
import { getMovie, getMovies } from "./movies.service";
/**@dev mock repository */
jest.mock("../repositories/movies.repository");
/**@dev mock dexie node module so it can be ignored */
jest.mock("dexie", () => {});
describe("Movies Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getMovies function", () => {
    it("should return sorted movies based on average rating when successful", async () => {
      const mockMovies = [
        { title: "Movie1", averageRating: "2" },
        { title: "Movie2", averageRating: "4" },
        { title: "Movie3", averageRating: "3" },
      ];
      (moviesRepository.findMovies as jest.Mock).mockResolvedValueOnce(
        mockMovies
      );

      const result = await getMovies({ page: 1, limit: 2, search: "Mov" });
      expect(result).toEqual([
        { title: "Movie2", averageRating: "4" },
        { title: "Movie3", averageRating: "3" },
      ]);
      expect(moviesRepository.findMovies).toHaveBeenCalledWith({
        title: { $regex: /.*Mov.*/i },
      });
    });

    it("should throw an error if findMovies fails", async () => {
      (moviesRepository.findMovies as jest.Mock).mockRejectedValueOnce(
        new Error("Test Error")
      );

      await expect(
        getMovies({ page: 1, limit: 2, search: "Mov" })
      ).rejects.toThrow("Test Error");
    });
  });

  describe("getMovie function", () => {
    it("should return a movie when successful", async () => {
      const mockMovie = { title: "Movie1", averageRating: "2" };
      (moviesRepository.findOneMovie as jest.Mock).mockResolvedValueOnce(
        mockMovie
      );

      const result = await getMovie("1");
      expect(result).toEqual(mockMovie);
      expect(moviesRepository.findOneMovie).toHaveBeenCalledWith({ id: "1" });
    });

    it("should throw an error if findOneMovie fails", async () => {
      (moviesRepository.findOneMovie as jest.Mock).mockRejectedValueOnce(
        new Error("Test Error")
      );

      await expect(getMovie("1")).rejects.toThrow("Test Error");
    });
  });
});
