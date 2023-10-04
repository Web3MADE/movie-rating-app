import { IMovie } from "@/server/models/models";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import * as useMovieModule from "../../hooks/useMovie";
import * as useRatingModule from "../../hooks/useRating";
import Movie from "./Movie";

jest.mock("../../hooks/useMovie");
jest.mock("../../hooks/useRating");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
describe("<Movie />", () => {
  let useMovieMock = jest.fn();
  let useRatingMock = jest.fn();
  let mockRouter = {
    back: jest.fn(),
  };

  beforeEach(() => {
    useMovieMock = jest.fn();
    useRatingMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    jest.spyOn(useMovieModule, "default").mockImplementation(useMovieMock);
    jest.spyOn(useRatingModule, "default").mockImplementation(useRatingMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    useMovieMock.mockReturnValue({
      isLoading: true,
    });
    useRatingMock.mockReturnValue({ rate: jest.fn() });

    render(<Movie id="1" />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    useMovieMock.mockReturnValue({ isError: true });
    useRatingMock.mockReturnValue({ rate: jest.fn() });

    render(<Movie id="1" />);
    expect(screen.getByText("Error loading data")).toBeInTheDocument();
  });

  it("renders movie details and handles back navigation", () => {
    const mockMovie: IMovie = {
      id: "1",
      title: "Inception",
      averageRating: "8.7",
      posterUrl: "/some-url",
      genres: ["Action"],
      year: "2010",
      plot: "A movie about dreams",
      ratings: ["2"],
      actors: "Leonardo DiCaprio",
      director: "Christopher Nolan",
      runtime: "2h 28m",
    };
    useMovieMock.mockReturnValue({ movie: mockMovie, isMovieLoading: false });
    useRatingMock.mockReturnValue({});

    render(<Movie id="1" />);

    const navigateBackButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(navigateBackButton);
    expect(mockRouter.back).toHaveBeenCalled();
  });
});
