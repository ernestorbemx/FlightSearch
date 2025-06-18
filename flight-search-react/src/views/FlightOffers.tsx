import { useEffect, useMemo, useState } from "react";
import { http } from "../http";
import {
  type AmadeusResponseMeta,
  type FlightOffer as IFlightOffer,
} from "../types";
import { FlightOffer } from "../components/FlightOffer";
import { Button } from "@heroui/button";
import { Link, useSearchParams } from "react-router";
import * as yup from "yup";
import { Alert, Select, SelectItem } from "@heroui/react";
import { useFlightStore } from "../stores/flight-store";
import { calculateOfferDuration } from "../utils";
import axios, { isAxiosError } from "axios";
import { FlightOfferSkeleton } from "../components/skeletons/FlightOfferSkeleton";
import { CaretLeftFilled } from "../components/icons/CaretLeftIcon";

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
    returnDate: yup.string().matches(DATE_REGEX).nullable(),
    departureDate: yup.string().matches(DATE_REGEX).required(),
    numberAdults: yup.number().min(1).max(9).required(),
    nonStop: yup.boolean().required(),
  })
  .required();

type Comparator = (a: IFlightOffer, b: IFlightOffer) => number;

type SortingStrategy = {
  label: string;
  key: string;
  sorter: Comparator;
};

const sortingStrategies: SortingStrategy[] = [
  {
    label: "Price (ascending)",
    key: "price",
    sorter(a, b) {
      return a.price.grandTotal - b.price.grandTotal;
    },
  },
  {
    label: "Price (descending)",
    key: "price2",
    sorter(a, b) {
      return b.price.grandTotal - a.price.grandTotal;
    },
  },
  {
    label: "Time (ascending)",
    key: "time",
    sorter(a, b) {
      return calculateOfferDuration(a) - calculateOfferDuration(b);
    },
  },
  {
    label: "Time (descending)",
    key: "time2",
    sorter(a, b) {
      return calculateOfferDuration(b) - calculateOfferDuration(a);
    },
  },
];

export function FlightOffers() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [sorting, setSorting] = useState<SortingStrategy>(sortingStrategies[0]);
  const [missingParams, setMissingParams] = useState(false);
  const setDictionaries = useFlightStore((s) => s.setDictionaries);
  const [offers, setOffers] = useState<AmadeusResponseMeta<IFlightOffer[]>>();
  const sortedOffers = useMemo(
    () => offers?.data.map((item) => item).sort(sorting.sorter) ?? [],
    [offers, sorting],
  );
  useEffect(() => {
    const nonStop = searchParams.get("nonStop");
    const numberAdults = searchParams.get("numberAdults");
    const returnDate = searchParams.get("arrivalDate");
    const currency = searchParams.get("currency");
    const departureAirport = searchParams.get("departure");
    const arrivalAirport = searchParams.get("arrival");
    const departureDate = searchParams.get("departureDate"); // optional
    setLoading(true);

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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, value]) => value != null)
          .map(([key, value]) => [key, String(value)]),
      ).toString();
      http
        .get<AmadeusResponseMeta<IFlightOffer[]>>(`/flights?${params}`)
        .then((res) => {
          setOffers(res.data);
          setDictionaries(res.data.dictionaries);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("Request aborted");
          } else {
            if (isAxiosError(err)) {
              if (err.response) {
                const data = err.response.data;
                if (data?.errors) {
                  if (Array.isArray(data.errors)) {
                    setError(data.errors[0]?.detail);
                  } else {
                    setError(
                      Object.entries(data.errors as Record<string, string>)
                        .map(([k, v]) => `${v}`)
                        .join(", "),
                    );
                  }
                  return;
                }
                setError(data?.message);
                return;
              }
              setError(err.message);
              return;
            }
            setError(err);
          }
        })
        .finally(() => setLoading(false));
    } catch (e) {
      if (yup.ValidationError.isError(e)) {
        setMissingParams(true);
      }
    }
  }, [searchParams, setDictionaries]);
  return (
    <div>
      <Link to="/">
        <Button variant="light" className="flex items-center" color="default">
          <CaretLeftFilled />
          Return
        </Button>
      </Link>
      <div className="flex justify-end my-4">
        {/* setSorting(sortingStrategies.find(s => s.key == key)!) */}
        <Select
          // onSelectionChange={(keys) => console.log(keys.currentKey)}
          onSelectionChange={(keys) =>
            setSorting(sortingStrategies.find((s) => s.key == keys.currentKey)!)
          }
          className="max-w-xs"
          defaultSelectedKeys={["price"]}
          label="Sort by"
          labelPlacement="outside-left"
          size="sm"
        >
          {sortingStrategies.map((sorting) => (
            <SelectItem key={sorting.key}>{sorting.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-col gap-y-4">
        {error && (
          <Alert
            color="danger"
            title={`Error occured while performing search of flights: ${error}`}
          />
        )}
        {loading &&
          Array.from({ length: 3 }, (_, i) => <FlightOfferSkeleton key={i} />)}
        {missingParams && (
          <Alert
            color="danger"
            title={`Provided url params are not correct`}
          ></Alert>
        )}
        {offers &&
          sortedOffers.map((o) => (
            <FlightOffer
              key={o.id}
              data={o}
              dictionaries={offers.dictionaries}
            ></FlightOffer>
          ))}
      </div>
    </div>
  );
}
