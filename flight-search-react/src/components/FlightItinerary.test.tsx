import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { FlightItinerary } from "./FlightItinerary";
import { searchLocation } from "../http";
import type { Dictionary, Itineraries } from "../types";

// Mock child components
vi.mock("./ItineraryStops", () => ({
  ItineraryStops: () => <div data-testid="itinerary-stops">Stops</div>,
}));
vi.mock("./DayOffset", () => ({
  DayOffset: ({ dayDifference }: { dayDifference: number }) => (
    <div data-testid="day-offset">{`+${dayDifference} days`}</div>
  ),
}));

const mockDepartureAirport = {
  name: "JFK Airport",
  iataCode: "JFK",
};

const mockArrivalAirport = {
  name: "LAX Airport",
  iataCode: "LAX",
};

vi.mock("../http", async () => ({
  searchLocation: vi.fn().mockImplementation(async (keyword: string) => {
    if (keyword == "JFK") {
      return mockDepartureAirport;
    }
    if (keyword == "LAX") {
      return mockArrivalAirport;
    }
    throw new Error("Unknown mock airport");
  }),
}));

export const mockItineraries: Itineraries = {
  duration: "PT10H30M",
  segments: [
    {
      id: "seg1",
      numberOfStops: 0,
      departure: {
        at: "2025-06-01T08:00:00Z",
        iataCode: "JFK",
        terminal: "4",
      },
      arrival: {
        at: "2025-06-01T11:00:00Z",
        iataCode: "ORD",
        terminal: "1",
      },
      carrierCode: "AA",
      operating: {
        carrierCode: "AA",
      },
      aircraft: {
        code: "738",
      },
      number: 1001,
      duration: "PT3H",
    },
    {
      id: "seg2",
      numberOfStops: 1,
      departure: {
        at: "2025-06-01T13:00:00Z",
        iataCode: "ORD",
        terminal: "2",
      },
      arrival: {
        at: "2025-06-02T18:30:00Z",
        iataCode: "LAX",
        terminal: "5",
      },
      carrierCode: "DL",
      operating: {
        carrierCode: "DL",
      },
      aircraft: {
        code: "321",
      },
      stops: undefined,
      number: 2055,
      duration: "PT5H30M",
    },
  ],
};

const mockDictionaries: Dictionary = {
  carriers: {
    AA: "American Airlines",
    DL: "Delta Air Lines",
  },
  locations: {},
  aircraft: {},
  currencies: {},
};

describe("<FlightItinerary />", () => {
  beforeEach(() => {
    vi.resetAllMocks();

    (
      searchLocation as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce({
      data: [mockDepartureAirport],
    });
    (
      searchLocation as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce({
      data: [mockArrivalAirport],
    });
  });

  it("renders loading state then airport info", async () => {
    render(
      <FlightItinerary
        data={mockItineraries}
        dictionaries={mockDictionaries}
        showCarrier={true}
      />,
    );

    expect(screen.getByTestId("skeleton-airline")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/JFK Airport/i)).toBeInTheDocument();
      expect(screen.getByText(/LAX Airport/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/\(1 stops\)/i)).toBeInTheDocument();
    expect(screen.getByTestId("itinerary-stops")).toBeInTheDocument();
    expect(screen.getByText(/10 hours 30 minutes/)).toBeInTheDocument();
    expect(screen.getByTestId("day-offset")).toHaveTextContent("+1 days");
  });

  it("shows carrier info if showCarrier is true", async () => {
    render(
      <FlightItinerary
        data={mockItineraries}
        dictionaries={mockDictionaries}
        showCarrier={true}
      />,
    );

    await waitFor(() => {
      expect(
        screen.getByText("American Airlines (AA), Delta Air Lines (DL)"),
      ).toBeInTheDocument();
    });
  });

  it("does not show carrier info if showCarrier is false", async () => {
    render(
      <FlightItinerary
        data={mockItineraries}
        dictionaries={mockDictionaries}
        showCarrier={false}
      />,
    );

    await waitFor(() => {
      expect(
        screen.queryByText(/American Airlines \(AA\)/),
      ).not.toBeInTheDocument();
    });
  });
});
