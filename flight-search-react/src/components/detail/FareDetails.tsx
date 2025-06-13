import { Chip } from "@heroui/react";
import type { FareDetailsBySegment } from "../../types";
import { FlightAmmenity } from "./FlightAmmenity";

interface Props {
  data: FareDetailsBySegment;
}
export function FareDetails({ data }: Props) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-x-2">
        <div className="">
          <span className="">Cabin Type: </span>
          <span>
            <Chip color="primary">{data.cabin}</Chip>
          </span>
        </div>
        <div className="">
          <span className="">Class: </span>
          <span>
            <Chip color="secondary">{data.cabin}</Chip>
          </span>
        </div>
      </div>

      {data.includedCheckedBags && (
        <div className="w-full">
          <span className="">Included checked bags: </span>
          <span>
            <Chip
              size="sm"
              color={
                data.includedCheckedBags.quantity == 0 ? "danger" : "success"
              }
            >
              {data.includedCheckedBags.quantity}
            </Chip>
          </span>
        </div>
      )}
      {data.includedCabinBags && (
        <div className="w-full">
          <span className="">Included Cabin bags: </span>
          <Chip
            size="sm"
            color={data.includedCabinBags.quantity == 0 ? "danger" : "success"}
          >
            {data.includedCabinBags.quantity}
          </Chip>
        </div>
      )}
      {data.amenities && (
        <div className="">
          <div className="flex flex-wrap">
            {data.amenities.map((a) => (
              <FlightAmmenity data={a} />
            ))}
          </div>
          <span className="text-xs font-semibold">* Is chargeable</span>
        </div>
      )}
    </div>
  );
}
