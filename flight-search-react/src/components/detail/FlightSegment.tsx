import { Card, CardBody } from "@heroui/card";
import {
  type Airport,
  type Dictionary,
  type Segments,
  type TravelerPricing,
} from "../../types";
import { SegmentStops } from "../SegmentStops";
import { FareDetails } from "./FareDetails";
import { useEffect, useState } from "react";
import { searchLocation } from "../../http";
import { differenceInCalendarDays, format } from "date-fns";
import { formatISODuration } from "../../utils";
import { DayOffset } from "../DayOffset";
import { Accordion, AccordionItem, Divider, Skeleton } from "@heroui/react";
import { AirplaneIcon } from "../icons/AirplaneIcon";

interface Props {
  dictionaries: Dictionary;
  segment: Segments;
  travelerPricing: TravelerPricing[];
}

export function FlightSegment({
  dictionaries,
  segment,
  travelerPricing,
}: Props) {
  const [loading, setLoading] = useState<boolean>();
  const [departure, setDeparture] = useState<Airport | null>();
  const [arrival, setArrival] = useState<Airport | null>();

  useEffect(() => {
    setLoading(true);
    Promise.all([
      searchLocation(segment.departure.iataCode, "AIRPORT").then((res) =>
        setDeparture(res.data[0]),
      ),
      searchLocation(segment.arrival.iataCode, "AIRPORT").then((res) =>
        setArrival(res.data[0]),
      ),
    ])
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [segment]);

  const formattedDepartureAt = format(
    segment.departure.at,
    "MMM do, yyyy HH:mm",
  );
  const formattedArrivalAt = format(segment.arrival.at, "HH:mm");
  const duration = formatISODuration(segment.duration);

  const daysDiff = differenceInCalendarDays(
    segment.arrival.at,
    segment.departure.at,
  );

  return (
    <Card>
      <CardBody className="flex flex-col gap-y-2">
        <div>
          <span className="text-sm">Flight No. {segment.number}</span>
        </div>

        <div className="flex items-center text-lg font-semibold">
          {loading && (
            <Skeleton className="inline-flex w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
          )}
          {!loading && (
            <>
              <span>
                {departure
                  ? `${departure?.name} (${segment.departure.iataCode})`
                  : segment.departure.iataCode}
              </span>

              <div className="inline-flex mx-2 items-center gap-x-2">
                <Divider className="w-4"></Divider>
                <AirplaneIcon />
                <Divider className="w-4"></Divider>
              </div>
              <span>
                {arrival
                  ? `${arrival?.name} (${segment.arrival.iataCode})`
                  : segment.arrival.iataCode}
              </span>
            </>
          )}
        </div>
        <div>
          <div>
            <span>
              {formattedDepartureAt} - {formattedArrivalAt}{" "}
              <DayOffset dayDifference={daysDiff}></DayOffset>
            </span>
          </div>
          <div>
            <span>{duration}</span>
          </div>
        </div>

        <div>
          <SegmentStops
            data={segment}
            dictionaries={dictionaries}
          ></SegmentStops>
        </div>
        <div>
          {dictionaries.carriers[segment.carrierCode]} ({segment.carrierCode}) -
          Aircraft: {dictionaries.aircraft[segment.aircraft.code]}
          {segment.operating &&
            segment.carrierCode != segment.operating.carrierCode && (
              <span>
                Operated by:{" "}
                {dictionaries.carriers[segment.operating.carrierCode]} (
                {segment.operating.carrierCode})
              </span>
            )}
        </div>
        <div className="border p-2 rounded-lg">
          <h3 className="text-lg font-semibold">Fare details</h3>
          <Accordion isCompact>
            {travelerPricing.map((tp, ix) => (
              <AccordionItem
                key={`${tp.travelerType}-${ix}`}
                aria-label={`${tp.travelerType}-${ix}`}
                title={`${tp.travelerType} ${ix + 1}`}
              >
                <div>
                  <div className="ml-2">
                    <FareDetails
                      data={
                        tp.fareDetailsBySegment.find(
                          (fare) => fare.segmentId == segment.id,
                        )!
                      }
                    ></FareDetails>
                  </div>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardBody>
    </Card>
  );
}
