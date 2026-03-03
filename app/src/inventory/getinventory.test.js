import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useFilter } from "../context/filterContext";
import { useSearch } from "../context/searchContext";
import GetInventory from "./getinventory";

// src/inventory/getinventory.test.js
test('dummy test to make Jest happy', () => {
  expect(true).toBe(true);
});
jest.mock("../context/filterContext");
jest.mock("../context/searchContext");
jest.mock("./addinvent", () => () => <button>Add</button>);
jest.mock("./removeinvent.js", () => () => <button>Remove</button>);
jest.mock("../search/searchbar.js", () => () => <div>Searchbar</div>);

const mockPantryData = [
  { foodName: "Apple", foodType: "Fruit", stock: 10 },
  { foodName: "Carrot", foodType: "Vegetable", stock: 5 },
  { foodName: "Banana", foodType: "Fruit", stock: 3 },
];

describe("GetInventory", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    useFilter.mockReturnValue({ filter: null, setFilter: jest.fn() });
    useSearch.mockReturnValue({ search: "", setSearch: jest.fn() });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders pantry items on mount", async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => mockPantryData,
    });

    render(<GetInventory />);

    await waitFor(() => {
      expect(screen.getByText("Apple")).toBeInTheDocument();
      expect(screen.getByText("Carrot")).toBeInTheDocument();
      expect(screen.getByText("Banana")).toBeInTheDocument();
    });
  });

  test("filters pantry by type", async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => mockPantryData,
    });
    useFilter.mockReturnValue({ filter: "Fruit", setFilter: jest.fn() });

    render(<GetInventory />);

    await waitFor(() => {
      expect(screen.getByText("Apple")).toBeInTheDocument();
      expect(screen.getByText("Banana")).toBeInTheDocument();
      expect(screen.queryByText("Carrot")).not.toBeInTheDocument();
    });
  });

  test("filters pantry by search query", async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => mockPantryData,
    });
    useSearch.mockReturnValue({ search: "apple", setSearch: jest.fn() });

    render(<GetInventory />);

    await waitFor(() => {
      expect(screen.getByText("Apple")).toBeInTheDocument();
      expect(screen.queryByText("Carrot")).not.toBeInTheDocument();
    });
  });

  test("reset button clears filter and search", async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => mockPantryData,
    });
    const setFilter = jest.fn();
    const setSearch = jest.fn();
    useFilter.mockReturnValue({ filter: "Fruit", setFilter });
    useSearch.mockReturnValue({ search: "apple", setSearch });

    render(<GetInventory />);

    const resetButton = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetButton);

    expect(setFilter).toHaveBeenCalledWith(null);
    expect(setSearch).toHaveBeenCalledWith("");
  });

  test("handles input value change for add/remove", async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => mockPantryData,
    });

    render(<GetInventory />);

    await waitFor(() => {
      const inputs = screen.getAllByRole("spinbutton");
      fireEvent.change(inputs[0], { target: { value: "5" } });
      expect(inputs[0].value).toBe("5");
    });
  });
});
