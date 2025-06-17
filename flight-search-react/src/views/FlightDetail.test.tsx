import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { FlightDetail } from "./FlightDetail";
import { MemoryRouter } from "react-router";

// Mock child component
vi.mock("../components/detail/FlightOfferDetail", () => ({
  FlightOfferDetail: ({ data, dictionaries }: any) => (
    <div data-testid="flight-detail-mock">
      Mock FlightOfferDetail with {data.id} and{" "}
      {Object.keys(dictionaries).length} dictionaries
    </div>
  ),
}));

// Mock Zustand store
vi.mock("../stores/flight-store", () => ({
  useFlightStore: vi.fn(),
}));

import { useFlightStore } from "../stores/flight-store";

describe("<FlightDetail />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders FlightOfferDetail when data is available", () => {
    (useFlightStore as any).mockImplementation((selector: any) =>
      selector({
        flight: { id: "F123", price: "200" },
        dictionaries: { carriers: {}, locations: {} },
      }),
    );

    render(
      <MemoryRouter>
        <FlightDetail />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("flight-detail-mock")).toBeInTheDocument();
    expect(screen.queryByText(/No offer was selected/)).not.toBeInTheDocument();
  });

  it("shows alert when no flight or dictionaries are present", () => {
    (useFlightStore as any).mockImplementation((selector: any) =>
      selector({
        flight: null,
        dictionaries: null,
      }),
    );

    render(
      <MemoryRouter>
        <FlightDetail />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("No offer was selected. Please search again"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /go to search/i }),
    ).toBeInTheDocument();
  });
});
