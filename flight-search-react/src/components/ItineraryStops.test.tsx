import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ItineraryStops } from "./ItineraryStops";
import type { Dictionary, Itineraries } from "../types";

// Mock del formateador de duración
vi.mock("../utils", () => ({
  formatISODuration: vi.fn((duration) => `Formatted(${duration})`),
}));

const mockItinerary: Itineraries = {
  segments: [
    {
      id: "seg1",
      numberOfStops: 1,
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
      stops: [
        {
          duration: "PT1H30M",
          iataCode: "ATL",
          arrivalAt: "",
          departureAt: "",
          description: "",
        },
      ],
    },
    {
      id: "seg2",
      numberOfStops: 0,
      departure: {
        at: "2025-06-01T13:00:00Z",
        iataCode: "ORD",
        terminal: "2",
      },
      arrival: {
        at: "2025-06-01T15:00:00Z",
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
      number: 2055,
      duration: "PT2H",
    },
  ],
  duration: "Doesnt care",
};

const mockDictionary: Dictionary = {
  locations: {
    ATL: {
      name: "Hartsfield-Jackson Atlanta International Airport",
      iataCode: "not used",
      id: "not used",
      subType: "AIRPORT",
      type: "location",
    },
  },
  carriers: {},
  aircraft: {},
  currencies: {},
};

describe("<ItineraryStops />", () => {
  it("renders all stops with formatted duration and airport name", () => {
    render(
      <ItineraryStops data={mockItinerary} dictionaries={mockDictionary} />,
    );

    expect(screen.getByText(/Stop #1:/)).toHaveTextContent(
      "Stop #1: Formatted(PT1H30M) at Hartsfield-Jackson Atlanta International Airport ATL",
    );
  });

  it("renders nothing if no stops exist", () => {
    const noStopsItinerary: Itineraries = {
      ...mockItinerary,
      segments: mockItinerary.segments.map((s) => ({ ...s, stops: [] })),
    };

    const { container } = render(
      <ItineraryStops data={noStopsItinerary} dictionaries={mockDictionary} />,
    );

    expect(container.firstElementChild).toBeEmptyDOMElement();
  });
});
