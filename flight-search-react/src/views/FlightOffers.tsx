import { useEffect, useState } from "react";
import { http } from "../http";
import {
  type FlightOffer as IFlightOffer,
  type AmadeusResponseMeta,
} from "../types";
import { FlightOffer } from "../components/FlightOffer";
import { Button } from "@heroui/button";
import { useSearchParams } from "react-router";
import * as yup from "yup";
import { Alert } from "@heroui/react";

// const example: FlightOfferRequest = {
//   currency: "USD",
//   departureAirport: "MEX",
//   departureDate: "2025-06-23",
//   arrivalAirport: "MAD",
//   returnDate: "2025-06-30",
//   numberAdults: 2,
//   nonStop: false,
// };

const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

const schema = yup
  .object({
    departureAirport: yup.string().required(),
    arrivalAirport: yup.string().nullable(),
    currency: yup.string().required(),
    returnDate: yup.string().matches(DATE_REGEX).required(),
    departureDate: yup.string().matches(DATE_REGEX).required(),
    numberAdults: yup.number().min(1).max(9).required(),
    nonStop: yup.boolean().required(),
  })
  .required();

export function FlightOffers() {
  const [searchParams] = useSearchParams();
  const [missingParams, setMissingParams] = useState(false);
  const [offers, setOffers] = useState<AmadeusResponseMeta<IFlightOffer[]>>();

  useEffect(() => {
    const nonStop = searchParams.get("nonStop");
    const numberAdults = searchParams.get("numberAdults");
    const returnDate = searchParams.get("arrivalDate");
    const currency = searchParams.get("currency");
    const departureAirport = searchParams.get("departure");
    const arrivalAirport = searchParams.get("arrival");
    const departureDate = searchParams.get("departureDate"); // optional

    try {
      const result = schema.validateSync({
        nonStop,
        numberAdults,
        currency,
        departureAirport,
        arrivalAirport,
        departureDate,
        returnDate,
      });
      const params = new URLSearchParams(
        Object.entries(result)
          .filter(([value]) => value != null)
          .map(([key, value]) => [key, String(value)]),
      ).toString();
      console.log({ params });
      http
        .get<AmadeusResponseMeta<IFlightOffer[]>>(`/flights?${params}`)
        .then((res) => {
          console.log({ data: res.data, params });
          setOffers(res.data);
        })
        .catch(() => {});
    } catch (e) {
      if (yup.ValidationError.isError(e)) {
        console.log({ e });
        setMissingParams(true);
      }
    }
  }, [searchParams]);

  return (
    <div>
      <Button>Return</Button>
      <div className="flex flex-col gap-y-4">
        {missingParams && (
          <Alert
            color="danger"
            title={`Provided url params are not correct`}
          ></Alert>
        )}
        {offers?.data.map((o) => (
          <FlightOffer
            data={o}
            dictionaries={offers.dictionaries}
          ></FlightOffer>
        ))}
      </div>
    </div>
  );
}
