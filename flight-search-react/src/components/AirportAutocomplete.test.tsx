import { render, screen, waitFor } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { describe, it, vi, expect, afterEach, beforeEach } from "vitest";
import { AirportAutoComplete } from "./AirportAutocomplete";

const mockAirports = [
  { name: "Los Angeles International", iataCode: "LAX" },
  { name: "San Francisco International", iataCode: "SFO" },
];

vi.stubGlobal(
  "fetch",
  vi.fn().mockImplementation((url: string) => {
    if (url.includes("airports")) {
      return Promise.resolve({
        json: () => Promise.resolve(mockAirports),
      });
    }
    return Promise.reject("Unknown URL");
  }),
);

vi.mock("use-debounce", () => {
  return {
    useDebounce: (text: string) => [text],
  };
});

describe("AirportAutoComplete", () => {
  let user: UserEvent;
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    user = userEvent.setup();
  });

  it.skip("renders the autocomplete and loads airport options", async () => {
    render(<AirportAutoComplete label="Airport" />);

    const input = screen.getByLabelText("Airport");

    await user.type(input, "Los");

    // Wait for debounce + fetch
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("keyword=Los"),
        expect.any(Object),
      );
    });

    // Wait for results to appear
    await waitFor(() => {
      expect(
        screen.getByText(/Los Angeles International/i),
      ).toBeInTheDocument();
    });
  });

  it.skip("calls onChange with selected airport IATA code", async () => {
    const handleChange = vi.fn();

    render(<AirportAutoComplete label="Airport" onChange={handleChange} />);

    const input = screen.getByLabelText("Airport");

    await user.type(input, "San");

    await waitFor(() => {
      expect(
        screen.getByText(/San Francisco International/i),
      ).toBeInTheDocument();
    });

    const option = screen.getByText(/San Francisco International/i);
    await user.click(option);

    expect(handleChange).toHaveBeenCalledWith("SFO");
  });

  it("displays error message when isInvalid is true", () => {
    render(
      <AirportAutoComplete
        label="Airport"
        isInvalid={true}
        errorMessage="Invalid airport"
      />,
    );

    expect(screen.getByText("Invalid airport")).toBeInTheDocument();
  });
});
