import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { FlightSearch } from "./FlightSearch";
import type { AirportAutoCompleteProps } from "../components/AirportAutocomplete";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual =
    await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock AirportAutoComplete since it's a custom component
vi.mock("../components/AirportAutocomplete", () => ({
  AirportAutoComplete: ({
    label,
    onChange,
    value,
    isInvalid,
    errorMessage,
  }: AirportAutoCompleteProps) => (
    <div>
      <label>{label}</label>
      <input
        data-testid={label}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {isInvalid && <span>{errorMessage}</span>}
    </div>
  ),
}));

describe("<FlightSearch />", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  const setup = () => render(<FlightSearch />);

  it("renders all form fields", () => {
    setup();

    expect(screen.getByText(/Flight Search/i)).toBeInTheDocument();
    expect(screen.getByText(/Departure airport/i)).toBeInTheDocument();
    expect(screen.getByText(/Arrival airport/i)).toBeInTheDocument();
    expect(screen.getByText(/Departure date/i)).toBeInTheDocument();
    expect(screen.getByText(/Arrival date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Currency/i)).toBeInTheDocument();
    expect(screen.getByText(/Number of adults/i)).toBeInTheDocument();
    expect(screen.getByText(/Non stops/i)).toBeInTheDocument();
  });

  it("validates required fields on submit", async () => {
    setup();

    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(
        screen.getByText("Select a departure airport"),
      ).toBeInTheDocument();
      expect(screen.getByText("Select an arrival airport")).toBeInTheDocument();
      expect(screen.getByText("Select a date")).toBeInTheDocument();
    });
  });

  it.skip("submits valid form and navigates to search URL", async () => {
    setup();

    fireEvent.change(screen.getByTestId("Departure airport"), {
      target: { value: "JFK" },
    });
    fireEvent.change(screen.getByTestId("Arrival airport"), {
      target: { value: "LAX" },
    });

    // Set valid departureDate
    const departureDateField = screen.getByLabelText(/Departure date/i);
    fireEvent.blur(departureDateField); // react-aria based DatePicker may not trigger change directly

    // Select currency (Autocomplete is harder to simulate fully, so skip or assume default)
    // Set number of adults
    const numAdultsInput = screen.getByLabelText(/Number of adults/i);
    fireEvent.change(numAdultsInput, { target: { value: 2 } });

    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
      const url = mockNavigate.mock.calls[0][0] as string;
      expect(url).toContain("/search?");
      expect(url).toContain("departure=JFK");
      expect(url).toContain("arrival=LAX");
      expect(url).toContain("numberAdults=2");
    });
  });

  it.skip("resets the form fields when Reset button is clicked", async () => {
    setup();

    fireEvent.click(screen.getByText("Reset"));

    await waitFor(() => {
      expect(screen.getByTestId("Departure airport")).toHaveValue("");
      expect(screen.getByTestId("Arrival airport")).toHaveValue("");
    });
  });
});
