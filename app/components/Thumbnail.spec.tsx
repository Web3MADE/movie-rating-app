import { fireEvent, render, screen } from "@testing-library/react";
import Thumbnail from "./Thumbnail";

describe("Thumbnail Component", () => {
  const mockOnClick = jest.fn();

  const thumbnailProps = {
    src: "/path-to-image",
    alt: "Test Alt Text",
    onClick: mockOnClick,
  };

  beforeEach(() => {
    render(<Thumbnail {...thumbnailProps} />);
  });

  it("should render Image with correct src", () => {
    const imgElement = screen.getByRole("img") as HTMLImageElement;
    const decodedSrc = decodeURIComponent(imgElement.src);
    expect(decodedSrc).toContain(thumbnailProps.src);
  });

  it("should render Image with correct alt text", () => {
    const imgElement = screen.getByAltText(thumbnailProps.alt);
    expect(imgElement).toBeInTheDocument();
  });

  it("should handle image click correctly", () => {
    const imgElement = screen.getByRole("img");
    fireEvent.click(imgElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
