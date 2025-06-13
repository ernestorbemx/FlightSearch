import { Divider } from "@heroui/react";
import type { Segments } from "../../types";
import { formatDateDuration } from "../../utils";
import { TimerIcon } from "../icons/TimerIcon";

interface Props {
  start: Segments;
  end: Segments;
}

export function SegmentLayover({ start, end }: Props) {
  const duration = formatDateDuration(start.arrival.at, end.departure.at);

  return (
    <div className="text-stone-400 flex flex-col items-center gap-y-2">
      <Divider orientation="vertical" className="h-4" />
      <div className="flex gap-2 justify-center items-center">
        <TimerIcon />
        {duration}
      </div>
      <Divider orientation="vertical" className="h-4" />
    </div>
  );
}
