import type { Amenity } from "../../types";

interface Props {
  data: Amenity;
}

export function FlightAmmenity({ data }: Props) {
  return (
    <div className="flex">
      {data.description} <b>{data.isChargeable ? "*" : ""}</b>-
    </div>
  );
}
