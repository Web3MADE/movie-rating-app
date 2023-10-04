import { render, screen, waitFor } from "@testing-library/react";
import useMovies from "../../hooks/useMovies";
import Home from "./Home";

/**@dev inform jest useMovies is es6 module being mocked via esModule */
jest.mock("../../hooks/useMovies", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockUseMovies = useMovies as jest.MockedFunction<typeof useMovies>;

describe("Home", () => {
  it("renders loading state", () => {
    mockUseMovies.mockReturnValue({
      movies: [],
      isLoading: true,
      isError: false,
    });
    render(<Home page={1} limit={10} search="" />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockUseMovies.mockReturnValue({
      movies: [],
      isLoading: false,
      isError: true,
    });
    render(<Home page={1} limit={10} search="" />);
    expect(screen.getByText(/error loading data/i)).toBeInTheDocument();
  });

  it("renders movies and navigation", async () => {
    mockUseMovies.mockReturnValue({
      movies: [
        {
          id: "1",
          title: "Inception",
          averageRating: "8.7",
          posterUrl: "/some-url",
        },
        {
          id: "2",
          title: "Titanic",
          averageRating: "8.5",
          posterUrl: "/some-url",
        },
      ],
      isLoading: false,
      isError: false,
    });
    render(<Home page={1} limit={10} search="" />);
    await waitFor(() => {
      expect(screen.getByText("Inception")).toBeInTheDocument();
      expect(screen.getByText("Titanic")).toBeInTheDocument();
      expect(screen.getByText(/next/i)).toBeInTheDocument();
      expect(screen.getByText(/previous/i)).toBeInTheDocument();
    });
  });
});
