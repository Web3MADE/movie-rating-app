import { fireEvent, render, screen } from "@testing-library/react";
import MovieImage, { IMovieImageProps } from "./MovieImage";

describe("MovieImage Component", () => {
  const mockOnClick = jest.fn();

  const movieImageProps: IMovieImageProps = {
    src: "/path-to-image",
    alt: "Test Alt Text",
    placeholderSrc: "/rakbankimg.jpeg",
    onClick: mockOnClick,
  };

  beforeEach(() => {
    render(<MovieImage {...movieImageProps} />);
  });

  it("should render Image with correct src", () => {
    const imgElement = screen.getByRole("img") as HTMLImageElement;
    const decodedSrc = decodeURIComponent(imgElement.src);
    expect(decodedSrc).toContain(movieImageProps.src);
  });

  it("should render Image with correct alt text", () => {
    const imgElement = screen.getByAltText(movieImageProps.alt);
    expect(imgElement).toBeInTheDocument();
  });

  it("should handle image click correctly", () => {
    const imgElement = screen.getByRole("img");
    fireEvent.click(imgElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
