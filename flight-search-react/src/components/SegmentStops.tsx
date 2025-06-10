import type { Dictionary, Segments } from "../types";
import { formatISODuration } from "../utils";

interface Props {
  data: Segments;
  dictionaries: Dictionary;
}

export function SegmentStops({ data, dictionaries }: Props) {
  if (!data.stops) {
    return null;
  }

  return (
    <div>
      {data.stops.map((s) => (
        <span>
          {formatISODuration(s.duration)}{" "}
          {dictionaries.locations[s.iataCode].name} {s.iataCode}
        </span>
      ))}
    </div>
  );
}
