import type { Airport, Dictionary, Itineraries } from "../types";
import { differenceInCalendarDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { searchLocation } from "../http";
import {
  calculateCarriers,
  calculateNoStops,
  calculateOperatingCarriers,
  formatISODuration,
} from "../utils";
import { ItineraryStops } from "./ItineraryStops";
import { DayOffset } from "./DayOffset";

interface Props {
  data: Itineraries;
  dictionaries: Dictionary;
  showCarrier: boolean;
}

export function FlightItinerary({ data, dictionaries, showCarrier }: Props) {
  const [departure, setDeparture] = useState<Airport | null>(null);
  const [arrival, setArrival] = useState<Airport | null>(null);

  useEffect(() => {
    // const lastItinerary = data.itineraries[data.itineraries.length - 1]; // this is for round trips
    searchLocation(firstSegment.departure.iataCode, "AIRPORT")
      .then((res) => setDeparture(res.data[0]))
      .catch(() => {});
    searchLocation(lastSegment.arrival.iataCode, "AIRPORT")
      .then((res) => setArrival(res.data[0]))
      .catch(() => {});
  }, [data]);

  const firstSegment = data.segments[0];
  const lastSegment = data.segments[data.segments.length - 1];

  const carriers = calculateCarriers(data);
  const operatingCarriers = calculateOperatingCarriers(data);

  const formattedDepartureAt = format(firstSegment.departure.at, "HH:mm");
  const formattedArrivalAt = format(lastSegment.arrival.at, "HH:mm");

  const formattedDuration = formatISODuration(data.duration);

  const daysDiff = differenceInCalendarDays(
    lastSegment.arrival.at,
    firstSegment.departure.at,
  );

  const stops = calculateNoStops(data);

  return (
    <div>
      <div>
        {formattedDepartureAt} - {formattedArrivalAt}
        <DayOffset dayDifference={daysDiff} />
      </div>
      <div className="font-semibold">
        {departure?.name} ({departure?.iataCode}) - {arrival?.name} (
        {arrival?.iataCode})
      </div>
      <div>
        <span>{formattedDuration}</span>
        <span>{stops > 0 ? `(${stops} stops)` : ""}</span>
        <ItineraryStops
          data={data}
          dictionaries={dictionaries}
        ></ItineraryStops>
      </div>

      {showCarrier && (
        <div className="my-2 font-mono">
          {Object.entries(dictionaries.carriers)
            .filter(([key]) => carriers.has(key))
            .map(([key, name]) => `${name} (${key})`)
            .join(", ")}
          {operatingCarriers.size > 0 &&
            `(Operated by ${Object.entries(dictionaries.carriers)
              .filter(([key]) => operatingCarriers.has(key))
              .map(([key, name]) => `${name} (${key})`)
              .join(", ")})`}
        </div>
      )}
    </div>
  );
}
