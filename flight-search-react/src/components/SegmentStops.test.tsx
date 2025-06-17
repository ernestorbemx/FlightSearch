import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SegmentStops } from "./SegmentStops";
import type { Dictionary, Segments } from "../types";
// Mock de formatISODuration
vi.mock("../utils", () => ({
  formatISODuration: vi.fn((duration) => `Formatted(${duration})`),
}));

const mockSegmentWithStops: Segments = {
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
      arrivalAt: "not used",
      departureAt: "not used",
      description: "not used",
    },
  ],
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

describe("<SegmentStops />", () => {
  it("renders stop info when stops exist", () => {
    render(
      <SegmentStops
        data={mockSegmentWithStops}
        dictionaries={mockDictionary}
      />,
    );

    expect(screen.getByText(/Stop #1:/)).toHaveTextContent(
      "Stop #1: Aiport Hartsfield-Jackson Atlanta International Airport ATL Formatted(PT1H30M)",
    );
  });

  it("returns null when no stops field is present", () => {
    const segmentWithoutStops = { ...mockSegmentWithStops };
    delete segmentWithoutStops.stops;

    const { container } = render(
      <SegmentStops data={segmentWithoutStops} dictionaries={mockDictionary} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("handles stop with unknown airport in dictionary", () => {
    const segmentWithUnknownStop: Segments = {
      ...mockSegmentWithStops,
      stops: [
        {
          duration: "PT2H",
          iataCode: "ZZZ",
          arrivalAt: "not used",
          departureAt: "not used",
          description: "not used",
        },
      ],
    };

    render(
      <SegmentStops
        data={segmentWithUnknownStop}
        dictionaries={mockDictionary}
      />,
    );

    expect(screen.getByText(/Stop #1:/)).toHaveTextContent(
      "Stop #1: Aiport ZZZ Formatted(PT2H)",
    );
  });
});
