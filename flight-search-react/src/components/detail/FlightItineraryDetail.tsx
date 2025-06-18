import { Fragment } from "react/jsx-runtime";
import type { Dictionary, Itineraries, TravelerPricing } from "../../types";
import { FlightSegment } from "../detail/FlightSegment";
import { SegmentLayover } from "./SegmentLayover";

interface Props {
  data: Itineraries;
  dictionaries: Dictionary;
  travelerPricing: TravelerPricing[];
}

export function FlightItineraryDetail({
  data,
  dictionaries,
  travelerPricing,
}: Props) {
  return (
    <div className="flex flex-col gap-y-4 w-full md:w-auto min-w-96">
      {/* {data.segments.reduce((s1, s2) => {
        s1.push(
          <FlightSegment
            key={s2.id}
            dictionaries={dictionaries}
            segment={s2}
            travelerPricing={travelerPricing}
          ></FlightSegment>,
        );
        return s1;
      }, [] as ReactNode[])} */}
      {data.segments.map((s, ix) => (
        <Fragment key={s.id}>
          <FlightSegment
            key={s.id}
            dictionaries={dictionaries}
            segment={s}
            travelerPricing={travelerPricing}
          ></FlightSegment>
          {data.segments[ix + 1] && (
            <SegmentLayover start={s} end={data.segments[ix + 1]} />
          )}
        </Fragment>
      ))}
    </div>
  );
}
