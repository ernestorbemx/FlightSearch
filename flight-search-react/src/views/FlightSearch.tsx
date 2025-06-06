import { Card, CardBody, CardHeader } from "@heroui/card";
import { DatePicker } from "@heroui/date-picker";
import { AirportAutoComplete } from "../components/AirportAutocomplete";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { currencies } from "../utils";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Checkbox, NumberInput, type DateValue } from "@heroui/react";

const schema = yup
  .object({
    departure: yup.string().required(),
    arrival: yup.string().optional(),
    currency: yup.string().required(),
    departureDate: yup.object().required(),
    arrivalDate: yup.object().nullable().optional(),
    numberAdults: yup.number().min(1).max(10).required(),
    nonStop: yup.boolean().required(),
  })
  .required();
export function FlightSearch() {
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
        <h2 className="text-2xl">Flight Search</h2>
      </CardHeader>
      <CardBody>
        <Controller
          name="departure"
          control={control}
          render={({ field: { value, onChange } }) => (
            <AirportAutoComplete
              label={"Departure airport"}
              onChange={onChange}
              value={value}
              isInvalid={!!errors.departureDate}
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
              errorMessage="Select an arrival airport"
            />
          )}
        />
        <Controller
          name="departureDate"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <DatePicker
              className="max-w-[284px]"
              label="Departure date"
              value={value as DateValue}
              onChange={onChange}
              onBlur={onBlur}
              maxValue={maxDate}
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
              className="max-w-[284px]"
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

        <Controller
          name="currency"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <Autocomplete
              defaultSelectedKey={currencies[0]}
              className="max-w-xs"
              selectedKey={value}
              label="Select an currency"
              onSelectionChange={onChange}
              onBlur={onBlur}
              isInvalid={!!errors.currency}
              errorMessage="Select a currency"
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
              maxValue={10}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              className="max-w-xs"
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
            onPress={handleSubmit((data) => {
              console.log(data);
            })}
          >
            Search
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
