import type { Dictionary, Itineraries } from "../types";
import { formatISODuration } from "../utils";

interface Props {
  data: Itineraries;
  dictionaries: Dictionary;
}

export function ItineraryStops({ data, dictionaries }: Props) {
  return (
    <div className="text-stone-500 text-xs ml-2">
      {data.segments
        .flatMap((s) => s.stops)
        .filter((s) => s != null)
        .map((s, ix) => (
          <span>
            Stop #{ix + 1}: {formatISODuration(s.duration)} at{" "}
            {dictionaries.locations[s.iataCode]?.name} {s.iataCode}
          </span>
        ))}
    </div>
  );
}
