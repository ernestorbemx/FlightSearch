import type { FareDetailsBySegment } from "../../types";
import { FlightAmmenity } from "./FlightAmmenity";

interface Props {
  data: FareDetailsBySegment;
}
export function FareDetails({ data }: Props) {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full">
        <span className="">Cabin Type: </span>
        <span>{data.cabin}</span>
      </div>
      <div className="w-full">
        <span className="">Class: </span>
        <span>{data.class}</span>
      </div>
      {data.includedCheckedBags && (
        <div className="w-full">
          <span className="">Included checked bags: </span>
          <span>{data.includedCheckedBags.quantity}</span>
        </div>
      )}
      {data.includedCheckedBags && (
        <div className="w-full">
          <span className="">Included Cabin bags: </span>
          <span>{data.includedCheckedBags.quantity}</span>
        </div>
      )}
      {data.amenities && (
        <div className="">
          <div className="flex flex-wrap">
            {data.amenities.map((a) => (
              <FlightAmmenity data={a} />
            ))}
          </div>
          <b>* Is chargeable</b>
        </div>
      )}
    </div>
  );
}
