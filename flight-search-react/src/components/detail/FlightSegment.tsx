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
import { differenceInCalendarDays, format, formatISODuration } from "date-fns";
import { formatDateDuration } from "../../utils";
import { DayOffset } from "../DayOffset";

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
  const [departure, setDeparture] = useState<Airport | null>();
  const [arrival, setArrival] = useState<Airport | null>();

  useEffect(() => {
    searchLocation(segment.departure.iataCode, "AIRPORT")
      .then((res) => setDeparture(res.data[0]))
      .catch(() => {});
    searchLocation(segment.arrival.iataCode, "AIRPORT")
      .then((res) => setArrival(res.data[0]))
      .catch(() => {});
  }, [segment]);

  const formattedDepartureAt = format(segment.departure.at, "HH:mm");
  const formattedArrivalAt = format(segment.arrival.at, "HH:mm");
  const duration = formatDateDuration(segment.departure.at, segment.arrival.at);

  const daysDiff = differenceInCalendarDays(
    segment.arrival.at,
    segment.departure.at,
  );

  return (
    <Card>
      <CardBody className="flex flex-col gap-y-2">
        <div>
          <span>Flight No. {segment.number}</span>
        </div>

        <div className="">
          {departure && (
            <span>
              {departure?.name} ({segment.departure.iataCode})
            </span>
          )}
          <span> - </span>
          {arrival && (
            <span>
              {arrival?.name} ({segment.arrival.iataCode})
            </span>
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
          {travelerPricing.map((tp) => (
            <div key={tp.travelerType}>
              <span className="font-semibold ">{tp.travelerType}</span>
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
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
