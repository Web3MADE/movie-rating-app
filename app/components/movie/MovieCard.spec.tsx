import { render, screen } from "@testing-library/react";
import MovieCard, { IMovieCardProps } from "./MovieCard";

describe("Movie Component", () => {
  const movieProps: IMovieCardProps = {
    thumbnailSrc: "/path-to-thumbnail",
    title: "Inception",
    averageRating: "4.5",
    placeholderSrc: "/rakbankimg.jpeg",
    thumbnailClassName: "thumbnail-class",
    objectFit: "cover",
    id: "1",
  };

  beforeEach(() => {
    render(<MovieCard {...movieProps} />);
  });

  it("should render thumbnail with correct alt text", () => {
    const thumbnailElement = screen.getByAltText(movieProps.title);
    expect(thumbnailElement).toBeInTheDocument();
  });

  it("should render title correctly", () => {
    const titleElement = screen.getByText(movieProps.title);
    expect(titleElement).toBeInTheDocument();
  });

  it("should render average rating correctly", () => {
    const averageRatingElement = screen.getByText(
      `Average Rating: ${movieProps.averageRating}`
    );
    expect(averageRatingElement).toBeInTheDocument();
  });
});
