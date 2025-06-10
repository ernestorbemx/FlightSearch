import { Card, CardBody } from "@heroui/card";
import { type Dictionary, type FlightOffer as IFlightOffer } from "../types";
import { FlightItinerary } from "./FlightItinerary";
import { calculateCarriersForOffer } from "../utils";
import { useEffect, useState } from "react";
interface Props {
  data: IFlightOffer;
  dictionaries: Dictionary;
}
export function FlightOffer({ data, dictionaries }: Props) {
  //   const totalDuration = calculateOfferDuration(data);
  const [carriers, setCarriers] = useState<string[]>(
    Array.from(calculateCarriersForOffer(data)),
  );

  useEffect(() => {
    setCarriers(Array.from(calculateCarriersForOffer(data)));
  }, [data]);

  return (
    <Card>
      <CardBody className="px-4">
        <div className="flex gap-x-16">
          <div className="flex-1">
            {carriers.length == 1 && (
              <span className="text-lg font-semibold font-mono">
                {dictionaries.carriers[carriers[0]]}({carriers[0]})
              </span>
            )}
            {data.itineraries.map((i, ix) => (
              <div key={ix}>
                <FlightItinerary
                  showCarrier={carriers.length > 1}
                  data={i}
                  dictionaries={dictionaries}
                ></FlightItinerary>
                {ix < data.itineraries.length - 1 && (
                  <hr className="my-4 bg-stone-200" />
                )}
              </div>
            ))}
          </div>
          <div className="border-stone-200 borde-0 border-l-1 px-4 max-w-48">
            <h4 className="font-semibold">Cost</h4>
            <div className="text-2xl font-semibold">
              {data.price.grandTotal}{" "}
              {data.price.billingCurrency ?? data.price.currency} total
            </div>
            <div className="text-stone-500 text-lg">
              {data.travelerPricings[0].price.total}{" "}
              {data.travelerPricings[0].price.billingCurrency ??
                data.travelerPricings[0].price.currency}{" "}
              per traveler
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
