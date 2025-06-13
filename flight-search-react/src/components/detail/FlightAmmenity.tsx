import { Tooltip } from "@heroui/react";
import type { Amenity } from "../../types";

interface Props {
  data: Amenity;
}

// Amenity-to-icon mapping (using emoji for simplicity)
const amenityIcons: Record<string, string> = {
  BAGGAGE: "🧳",
  PRE_RESERVED_SEAT: "💺",
  TRAVEL_SERVICES: "🌐",
  BRANDED_FARES: "💼",
  MEAL: "🌮",
};

const AmenityIcon = ({ amenity }: { amenity: string }) => {
  const icon = amenityIcons[amenity];

  if (!icon) {
    return <span title="Unknown amenity">❓</span>; // fallback
  }

  return (
    <span title={amenity} style={{ fontSize: "1.5rem", margin: "0 0.5rem" }}>
      {icon}
    </span>
  );
};

export function FlightAmmenity({ data }: Props) {
  return (
    <div className="flex">
      <Tooltip content={data.description}>
        <div>
          <AmenityIcon amenity={data.amenityType}></AmenityIcon>{" "}
          <span className="text-xs font-semibold">
            {data.isChargeable ? "*" : ""}
          </span>
        </div>
      </Tooltip>
      {/* {data.description} <b>{data.isChargeable ? "*" : ""}</b> | */}
    </div>
  );
}
