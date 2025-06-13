import type { Dictionary, FlightOffer } from "../../types";
import { formatISODuration } from "../../utils";
import { FlightItineraryDetail } from "./FlightItineraryDetail";
import { FlightPriceBreakdown } from "./FlightPriceBreakdown";
import { Tabs, Tab } from "@heroui/react";

interface Props {
  data: FlightOffer;
  dictionaries: Dictionary;
}
export function FlightOfferDetail({ data, dictionaries }: Props) {
  return (
    <div className="flex flex-wrap gap-8">
      <div className="flex-1">
        <Tabs aria-label="itineraries">
          {/* If is round trip */}
          {data.itineraries.map((i, index) => (
            <Tab key={`itinerary-${index}`} title={`Itinerary ${index + 1}`}>
              <span className="inline-block mb-4">
                Total time for this itinerary:{" "}
                <span className="font-semibold">
                  {formatISODuration(i.duration)}
                </span>
              </span>
              <FlightItineraryDetail
                travelerPricing={data.travelerPricings}
                data={i}
                dictionaries={dictionaries}
              ></FlightItineraryDetail>
            </Tab>
          ))}
        </Tabs>
      </div>
      <div className="w-full max-w-[30rem] min-w-80 md:w-auto">
        <FlightPriceBreakdown
          price={data.price}
          travelerPricing={data.travelerPricings}
        ></FlightPriceBreakdown>
      </div>
    </div>
  );
}
