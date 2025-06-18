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
import { addToast, Divider, Skeleton } from "@heroui/react";
import { AirplaneIcon } from "./icons/AirplaneIcon";
import { isAxiosError } from "axios";

interface Props {
  data: Itineraries;
  dictionaries: Dictionary;
  showCarrier: boolean;
}

export function FlightItinerary({ data, dictionaries, showCarrier }: Props) {
  const [loading, setLoading] = useState(false);
  const [departure, setDeparture] = useState<Airport | null>(null);
  const [arrival, setArrival] = useState<Airport | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      searchLocation(firstSegment.departure.iataCode, "AIRPORT")
        .then((res) => setDeparture(res.data[0]))
        .catch((e) => {
          if (isAxiosError(e)) {
            addToast({
              title: `Error while searching airport ${firstSegment.departure.iataCode}`,
              description: `Error: ${e}`,
              color: "danger",
            });
          }
        }),
      searchLocation(lastSegment.arrival.iataCode, "AIRPORT")
        .then((res) => setArrival(res.data[0]))
        .catch((e) => {
          if (isAxiosError(e)) {
            addToast({
              title: `Error while searching airport ${lastSegment.arrival.iataCode}`,
              description: `Error: ${e}`,
              color: "danger",
            });
          }
        }),
    ])
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [data]);

  const firstSegment = data.segments[0];
  const lastSegment = data.segments[data.segments.length - 1];

  const carriers = calculateCarriers(data);
  const operatingCarriers = calculateOperatingCarriers(data);

  const formattedDepartureAt = format(
    firstSegment.departure.at,
    "MMM do, yyyy HH:mm",
  );
  const formattedArrivalAt = format(lastSegment.arrival.at, "HH:mm");

  const formattedDuration = formatISODuration(data.duration);

  const daysDiff = differenceInCalendarDays(
    lastSegment.arrival.at,
    firstSegment.departure.at,
  );

  const stops = calculateNoStops(data);

  return (
    <div>
      <div className="font-semibold flex items-center">
        {loading && (
          <Skeleton
            data-testid="skeleton-airline"
            className="inline-flex w-3/5 rounded-lg"
          >
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
        )}
        {!loading && (
          <div className="flex items-center">
            {departure && (
              <>
                {departure?.name} ({departure?.iataCode})
              </>
            )}
            <div className="inline-flex mx-2 items-center gap-x-2">
              <Divider className="w-4"></Divider>
              <AirplaneIcon />
              <Divider className="w-4"></Divider>
            </div>
            {arrival && (
              <>
                {arrival?.name} ({arrival?.iataCode})
              </>
            )}
            <span className="ml-1 font-semibold">
              {stops > 0 ? ` (${stops} stops)` : ""}
            </span>
          </div>
        )}
      </div>
      <div>
        <ItineraryStops
          data={data}
          dictionaries={dictionaries}
        ></ItineraryStops>
      </div>
      <div>
        {formattedDepartureAt} - {formattedArrivalAt}
        <DayOffset dayDifference={daysDiff} />
      </div>
      <div>
        <span>{formattedDuration}</span>
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
