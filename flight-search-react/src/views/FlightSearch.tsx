import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { DatePicker } from "@heroui/date-picker";
import { AirportAutoComplete } from "../components/AirportAutocomplete";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { currencies } from "../utils";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Checkbox, NumberInput, type DateValue } from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useNavigate } from "react-router";

const schema = yup
  .object({
    departure: yup.string().required(),
    arrival: yup.string().required(),
    currency: yup.string().required(),
    departureDate: yup.object<DateValue>().required(),
    arrivalDate: yup.object<DateValue>().nullable().optional(),
    numberAdults: yup.number().min(1).max(9).required(),
    nonStop: yup.boolean().required(),
  })
  .required();

export interface FlightSearchParams {
  departure: string;
  arrival: string;
  currency: string;
  departureDate: DateValue;
  arrivalDate?: DateValue;
  numberAdults: number;
  nonStop: boolean;
}

export function FlightSearch() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      numberAdults: 1,
      currency: currencies[0],
      nonStop: true,
      arrival: "",
      arrivalDate: null,
      departure: "",
      departureDate: null!,
    },
  });

  const minDate = watch("departureDate");
  const maxDate = watch("arrivalDate");

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Flight Search</h2>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 flex-wrap">
            <Controller
              name="departure"
              control={control}
              render={({ field: { value, onChange } }) => (
                <AirportAutoComplete
                  label={"Departure airport"}
                  onChange={onChange}
                  value={value}
                  isInvalid={!!errors.departure}
                  errorMessage="Select a departure airport"
                />
              )}
            />
            <Controller
              name="arrival"
              control={control}
              render={({ field: { value, onChange } }) => (
                <AirportAutoComplete
                  label={"Arrival airport"}
                  onChange={onChange}
                  value={value}
                  isInvalid={!!errors.arrival}
                  errorMessage="Select an arrival airport"
                />
              )}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Controller
              name="departureDate"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <DatePicker
                  className="max-w-[284px] sm:min-w-[284px] w-full "
                  label="Departure date"
                  value={value as DateValue}
                  onChange={onChange}
                  onBlur={onBlur}
                  minValue={today(getLocalTimeZone()).add({ days: 1 })}
                  maxValue={maxDate as DateValue}
                  isInvalid={!!errors.departureDate}
                  errorMessage="Select a date"
                />
              )}
            />

            <Controller
              name="arrivalDate"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <DatePicker
                  labelPlacement="inside"
                  className="max-w-[284px] sm:min-w-[284px] w-full "
                  label="Arrival date"
                  minValue={minDate as DateValue}
                  value={value as DateValue}
                  onChange={onChange}
                  onBlur={onBlur}
                  isInvalid={!!errors.arrivalDate}
                  errorMessage="Select a date not lower than departureDate"
                />
              )}
            />
          </div>
          <Controller
            name="currency"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Autocomplete
                defaultSelectedKey={currencies[0]}
                selectedKey={value}
                label="Currency"
                onSelectionChange={onChange}
                onBlur={onBlur}
                isInvalid={!!errors.currency}
                errorMessage="Select a currency"
                size="sm"
                className="max-w-[284px]"
              >
                {currencies.map((currency) => (
                  <AutocompleteItem key={currency}>{currency}</AutocompleteItem>
                ))}
              </Autocomplete>
            )}
          />
          <Controller
            name="numberAdults"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <NumberInput
                label="Number of adults"
                minValue={1}
                maxValue={9}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                size="sm"
                className="max-w-[284px]"
                placeholder="Enter the amount"
              />
            )}
          />
          <Controller
            name="nonStop"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Checkbox
                onValueChange={onChange}
                isSelected={value}
                onBlur={onBlur}
                defaultSelected
                size="sm"
                isInvalid={!!errors.nonStop}
              >
                Non stops
              </Checkbox>
            )}
          />
        </div>
      </CardBody>
      <CardFooter>
        <div>
          <Button
            color="primary"
            variant="ghost"
            onPress={() => {
              reset({
                numberAdults: 1,
                currency: currencies[0],
                nonStop: true,
                arrival: "",
                arrivalDate: null,
                departure: "",
                departureDate: null!,
              });
            }}
          >
            Reset
          </Button>
          <Button
            color="primary"
            /// @ts-expect-error handleSubmit expects to recieve a SyntheticEvent
            onPress={handleSubmit((data) => {
              const params = new URLSearchParams({
                departure: data.departure,
                arrival: data.arrival,
                currency: data.currency,
                departureDate: (data.departureDate as DateValue).toString(),
                numberAdults: String(data.numberAdults),
                nonStop: String(data.nonStop),
              });
              if (data.arrivalDate) {
                params.append(
                  "arrivalDate",
                  (data.arrivalDate as DateValue)?.toString(),
                );
              }
              navigate(`/search?${params.toString()}`);
            })}
          >
            Search
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
