import { formatDuration } from "date-fns";
import type { FlightOffer, Itineraries } from "./types";
import { parse } from "tinyduration";
import { Duration } from "luxon";

export const currencies = ["USD", "MXN", "EUR"];

export function calculateCarriers(itinerary: Itineraries) {
  return itinerary.segments.reduce(
    (s1, s2) => s1.add(s2.carrierCode),
    new Set<string>(),
  );
}

export function calculateCarriersForOffer(data: FlightOffer) {
  return data.itineraries
    .flatMap((i) => i.segments)
    .reduce((s1, s2) => s1.add(s2.carrierCode), new Set<string>());
}

export function calculateNoStops(itinerary: Itineraries) {
  return itinerary.segments
    .map((s) => Number(s.numberOfStops))
    .reduce((prev, curr) => (prev += curr), 0);
}

export function formatISODuration(date: string) {
  const duration = parse(date);
  return formatDuration(duration, {
    format: ["days", "hours", "minutes"],
  });
}

export function calculateOfferDuration(data: FlightOffer) {
  return formatDuration(
    data.itineraries
      .map((i) => Duration.fromISO(i.duration))
      .reduce((d1, d2) => d1.plus(d2))
      .normalize()
      .toObject(),
    {
      format: ["days", "hours", "minutes"],
    },
  );
}
