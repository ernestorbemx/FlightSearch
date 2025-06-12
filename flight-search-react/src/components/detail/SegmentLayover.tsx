import { formatDuration, intervalToDuration } from "date-fns";
import type { Segments } from "../../types";
import { formatDateDuration } from "../../utils";

interface Props {
  start: Segments;
  end: Segments;
}

export function SegmentLayover({ start, end }: Props) {
  const duration = formatDateDuration(start.arrival.at, end.departure.at);

  return <div>{duration}</div>;
}
