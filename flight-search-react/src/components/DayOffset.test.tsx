import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DayOffset } from "./DayOffset";

describe("<DayOffset />", () => {
  it('renders "next day" when dayDifference is 1', () => {
    render(<DayOffset dayDifference={1} />);
    expect(screen.getByText("next day")).toBeInTheDocument();
  });

  it('renders "+X days" when dayDifference is greater than 1', () => {
    render(<DayOffset dayDifference={3} />);
    expect(screen.getByText("+2 days")).toBeInTheDocument();
  });

  it("renders nothing when dayDifference is 0", () => {
    const { container } = render(<DayOffset dayDifference={0} />);
    expect(container.firstElementChild).toBeEmptyDOMElement();
  });

  it("renders nothing when dayDifference is negative", () => {
    const { container } = render(<DayOffset dayDifference={-5} />);
    expect(container.firstElementChild).toBeEmptyDOMElement();
  });
});
