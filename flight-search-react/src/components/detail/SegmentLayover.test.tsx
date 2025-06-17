import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SegmentLayover } from "./SegmentLayover";
import type { Segments } from "../../types";

const start: Segments = {
  departure: {
    iataCode: "MEX",
    terminal: "1",
    at: "2025-06-23T01:55:00",
  },
  arrival: {
    iataCode: "YYC",
    at: "2025-06-23T07:25:00",
  },
  carrierCode: "WS",
  number: 2215,
  aircraft: {
    code: "73H",
  },
  operating: {
    carrierCode: "WS",
  },
  duration: "PT5H30M",
  id: "10",
  numberOfStops: 0,
};

const end: Segments = {
  departure: {
    iataCode: "MEX",
    terminal: "1",
    at: "2025-06-24T07:25:00",
  },
  arrival: {
    iataCode: "YYC",
    at: "2025-06-23T07:25:00",
  },
  carrierCode: "WS",
  number: 2215,
  aircraft: {
    code: "73H",
  },
  operating: {
    carrierCode: "WS",
  },
  duration: "PT5H30M",
  id: "10",
  numberOfStops: 0,
};

describe("Test SegmentLayover component", () => {
  it("renders", async () => {
    render(<SegmentLayover start={start} end={end} />);
    expect(screen.getByText("1 day"));
  });
});
