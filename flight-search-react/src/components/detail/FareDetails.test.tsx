import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FareDetails } from "./FareDetails";
import type { FareDetailsBySegment } from "../../types";

// Mocks simples de los datos
const baseFareDetails: FareDetailsBySegment = {
  isAllotment: true,
  brandedFare: "asd",
  class: "CLASS",
  fareBasis: "npi",
  segmentId: "1",
  cabin: "ECONOMY",
  includedCheckedBags: {
    quantity: 1,
    weight: 10,
    weightUnit: "KG",
  },
  includedCabinBags: {
    quantity: 0,
    weight: 10,
    weightUnit: "KG",
  },
  // amenities: [
  //   {
  //     amenityType: "MEAL",
  //     description: "In-flight meal",
  //     isChargeable: false,
  //   },
  //   {
  //     amenityType: "PRE_RESERVED_SEAT",
  //     description: "Pre-reserved seat selection",
  //     isChargeable: true,
  //   },
  // ],
};

describe("FareDetails", () => {
  it("renders cabin and class with chips", () => {
    render(<FareDetails data={baseFareDetails} />);

    expect(screen.getAllByText("ECONOMY")).toHaveLength(2); // Cabin and Class
    expect(screen.getByText("Cabin Type:")).toBeInTheDocument();
    expect(screen.getByText("Class:")).toBeInTheDocument();
  });

  it("renders checked and cabin bags with correct chip colors", () => {
    render(<FareDetails data={baseFareDetails} />);

    expect(screen.getByText("Included checked bags:")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument(); // checked bags

    expect(screen.getByText("Included Cabin bags:")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument(); // cabin bags
  });

  it.skip("renders amenities and chargeable indicator", () => {
    render(<FareDetails data={baseFareDetails} />);

    expect(screen.getByText("🌮")).toBeInTheDocument(); // MEAL
    expect(screen.getByText("💺")).toBeInTheDocument(); // PRE_RESERVED_SEAT
    expect(screen.getByText("*")).toBeInTheDocument(); // Chargeable mark
    expect(screen.getByText("* Is chargeable")).toBeInTheDocument();
  });

  it("does not render amenities or bag info if not provided", () => {
    const minimalData: FareDetailsBySegment = {
      cabin: "BUSINESS",
      isAllotment: true,
      brandedFare: "asd",
      class: "CLASS",
      fareBasis: "npi",
      segmentId: "1",
    };

    render(<FareDetails data={minimalData} />);

    expect(screen.getAllByText("BUSINESS")).toHaveLength(2);
    expect(
      screen.queryByText("Included checked bags:"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Included Cabin bags:")).not.toBeInTheDocument();
    expect(screen.queryByText("🌮")).not.toBeInTheDocument();
    expect(screen.queryByText("* Is chargeable")).not.toBeInTheDocument();
  });
});
