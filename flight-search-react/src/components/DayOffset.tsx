interface Props {
  dayDifference: number;
}
export function DayOffset({ dayDifference }: Props) {
  return (
    <span className="text-stone-500 text-xs ml-1">
      {dayDifference == 1 && "next day"}
      {dayDifference > 1 && `+${dayDifference - 1} days`}
    </span>
  );
}
