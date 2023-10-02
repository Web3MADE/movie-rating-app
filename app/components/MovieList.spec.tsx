import { render, screen } from "@testing-library/react";
import { IMovie } from "../../server/models";
import MovieList from "./MovieList";

jest.mock("./Movie", () => {
  return function DummyMovie(props: any) {
    return <div data-testid="movie">{props.title}</div>;
  };
});

describe("MovieList Component", () => {
  const mockMovies: IMovie[] = [
    {
      id: 1,
      posterUrl: "url1",
      title: "Title1",
      rating: 4.5,
      runtime: "200",
      actors: "actor1",
      genres: ["genre1"],
      plot: "plot1",
      year: "2021",
      director: "test",
    },
    {
      id: 2,
      posterUrl: "url2",
      title: "Title2",
      rating: 3.5,
      runtime: "200",
      actors: "actor1",
      genres: ["genre1"],
      plot: "plot1",
      year: "2021",
      director: "test",
    },
  ];

  beforeEach(() => {
    render(<MovieList movies={mockMovies} />);
  });

  it("should render a list of movies", () => {
    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });

  it("should match the number of rendered movies with the length of movies prop", () => {
    const renderedMovies = screen.getAllByTestId("movie");
    expect(renderedMovies).toHaveLength(mockMovies.length);
  });
});
