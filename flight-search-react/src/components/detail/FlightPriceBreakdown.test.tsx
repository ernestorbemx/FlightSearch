import { render, screen } from "@testing-library/react";
import { FlightPriceBreakdown } from "./FlightPriceBreakdown";
import type { FlightPrice, TravelerPricing } from "../../types";
import { describe, expect, it } from "vitest";

const mockPrice: FlightPrice = {
  base: 100,
  grandTotal: 150,
  total: 150,
  currency: "USD",
  billingCurrency: "USD",
  taxes: [{ amount: 30, code: "TAX1" }],
  fees: [{ amount: 20, type: "Service" }],
};

const mockTravelerPricing: TravelerPricing[] = [
  {
    travelerType: "Adult",
    price: {
      base: 100,
      total: 150,
      currency: "USD",
      billingCurrency: "USD",
      grandTotal: 150,
      fees: [],
      taxes: [],
    },
    fareDetailsBySegment: [],
  },
];

describe("FlightPriceBreakdown", () => {
  it("renders base price, fees, taxes, and total correctly", () => {
    render(
      <FlightPriceBreakdown
        price={mockPrice}
        travelerPricing={mockTravelerPricing}
      />,
    );

    expect(screen.getByText("Base price"));
    expect(screen.getByText("100 USD"));

    expect(screen.getByText("Fees"));
    expect(screen.getByText("Service:"));
    expect(screen.getByText("20 USD"));
    expect(screen.getByText("Total fees: 20 USD"));

    expect(screen.getByText("Taxes"));
    expect(screen.getByText("TAX1:"));
    expect(screen.getByText("30 USD"));
    expect(screen.getByText("Total taxes: 30 USD"));

    expect(screen.getByText("Other charges"));
    expect(screen.getByText("0.00 USD")); // 150 - 100 - 30 - 20 = 0

    expect(screen.getByText("Total price"));
    expect(screen.getByText("150 USD"));
  });

  it("renders pricing per traveler", () => {
    render(
      <FlightPriceBreakdown
        price={mockPrice}
        travelerPricing={mockTravelerPricing}
      />,
    );

    expect(screen.getByText("Pricing per traveler"));
    expect(screen.getByText("Adult 1 - 150 USD"));
    screen.debug();
  });

  it("shows 'Not available' when fees and taxes are missing", () => {
    const priceWithoutFeesTaxes: FlightPrice = {
      base: 100,
      total: 100,
      currency: "USD",
      billingCurrency: "USD",
      grandTotal: 100,
    };

    render(
      <FlightPriceBreakdown
        price={priceWithoutFeesTaxes}
        travelerPricing={mockTravelerPricing}
      />,
    );

    expect(screen.getAllByText("Not available")).toHaveLength(2);
  });
});
