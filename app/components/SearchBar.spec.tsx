import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    render(<SearchBar onSearch={mockOnSearch} />);
  });

  it("should render input and button", () => {
    const inputElement = screen.getByPlaceholderText("Search");
    const buttonElement = screen.getByRole("button", { name: /search/i });
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("should update input value on change", () => {
    const inputElement = screen.getByPlaceholderText(
      "Search"
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "Inception" } });
    expect(inputElement.value).toBe("Inception");
  });

  it("should call onSearch prop on form submission", () => {
    const inputElement = screen.getByPlaceholderText(
      "Search"
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "Inception" } });

    const formElement = screen.getByRole("form");
    fireEvent.submit(formElement);

    expect(mockOnSearch).toHaveBeenCalledWith("Inception");
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
