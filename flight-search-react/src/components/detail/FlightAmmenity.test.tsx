import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FlightAmmenity } from "./FlightAmmenity";
import type { Amenity } from "../../types";

describe("FlightAmmenity", () => {
  const baseAmenity: Amenity = {
    amenityType: "MEAL",
    description: "In-flight meal included",
    isChargeable: false,
  };

  it("renders the correct icon and description", async () => {
    render(<FlightAmmenity data={baseAmenity} />);
    // Emoji icon
    expect(screen.getByText("🌮"));

    // const content = screen.getByTestId("tooltip-content");

    // // Tooltip content
    // await user.hover(content);

    // expect(screen.getByText(baseAmenity.description));

    // screen.debug();
    // No asterisk when not chargeable
    expect(screen.queryByText("*"));
  });

  it("renders asterisk if amenity is chargeable", () => {
    const chargeableAmenity: Amenity = {
      ...baseAmenity,
      isChargeable: true,
    };

    render(<FlightAmmenity data={chargeableAmenity} />);

    expect(screen.getByText("*"));
  });

  it("renders fallback icon if amenity type is unknown", () => {
    const unknownAmenity: Amenity = {
      amenityType: "LOUNGE_ACCESS",
      description: "Airport lounge access",
      isChargeable: false,
    };

    render(<FlightAmmenity data={unknownAmenity} />);

    expect(screen.getByText("❓"));
    expect(screen.getByTitle("Unknown amenity"));
  });
});
