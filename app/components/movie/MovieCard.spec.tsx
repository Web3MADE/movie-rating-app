import { fireEvent, render, screen } from "@testing-library/react";
import MovieCard, { IMovieCardProps } from "./MovieCard";

describe("Movie Component", () => {
  const mockOnClick = jest.fn();

  const movieProps: IMovieCardProps = {
    thumbnailSrc: "/path-to-thumbnail",
    title: "Inception",
    averageRating: "4.5",
    placeholderSrc: "/rakbankimg.jpeg",
    thumbnailClassName: "thumbnail-class",
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

  it("should handle button click correctly", () => {
    const buttonElement = screen.getByRole("button", { name: /view details/i });
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
