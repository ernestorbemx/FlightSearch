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
      {data.stops.map((s, ix) => (
        <span>
          Stop #{ix + 1}: Aiport {dictionaries.locations[s.iataCode]?.name}{" "}
          {s.iataCode} {formatISODuration(s.duration)}{" "}
        </span>
      ))}
    </div>
  );
}
