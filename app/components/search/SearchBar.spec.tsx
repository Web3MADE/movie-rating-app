import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
describe("SearchBar Component", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    render(<SearchBar />);
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
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

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
  });
});
