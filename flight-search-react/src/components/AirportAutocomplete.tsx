import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { useAsyncList } from "@react-stately/data";
import type { Airport } from "../types";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { addToast } from "@heroui/react";

export interface AirportAutoCompleteProps {
  label: string;
  value?: string;
  onChange?: (iatCode: string | null) => unknown;
  isInvalid?: boolean;
  errorMessage?: string;
}

export function AirportAutoComplete({
  value,
  onChange,
  label,
  isInvalid,
  errorMessage,
}: AirportAutoCompleteProps) {
  const [internalValue, setInternalValue] = useState<string | null>(
    value ?? null,
  );
  const [text, setText] = useState<string>();

  useEffect(() => {
    setInternalValue(value ?? null);
  }, [value]);

  const list = useAsyncList<Airport>({
    async load({ signal, filterText }) {
      if (!filterText) {
        return {
          items: [] as Airport[],
        };
      }

      try {
        const res = await fetch(
          `http://127.0.0.1:8080/airports?keyword=${filterText}&subtype=AIRPORT&pageSize=10&offset=0`,
          { signal },
        );
        const json = await res.json();

        return {
          items: json as Airport[],
        };
      } catch (e) {
        addToast({
          title: "Error while searching for airport",
          description: `Error: ${e}`,
          color: "danger",
        });
        return {
          items: [],
        };
      }
    },
  });

  const [debouncedText] = useDebounce(text, 1000);

  useEffect(() => {
    list.setFilterText(debouncedText!);
    // console.log(debouncedText)
  }, [debouncedText]);

  return (
    <Autocomplete
      data-testid="autocomplete"
      selectedKey={internalValue}
      onSelectionChange={(key) => {
        setInternalValue(key as string);
        onChange?.(key as string);
        setText(
          (t) => list.items.find((i) => i.iataCode == key)?.iataCode ?? t,
        );
      }}
      className="max-w-[284px] w-full sm:min-w-[284px]"
      inputValue={text}
      isLoading={list.isLoading}
      items={list.items}
      label={label}
      placeholder="Type city or airport to search..."
      variant="bordered"
      labelPlacement="inside"
      onInputChange={setText}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
    >
      {(item) => (
        <AutocompleteItem
          key={item.iataCode}
          id={item.iataCode}
          textValue={`${item.name} - (${item.iataCode})`}
          className="capitalize"
        >
          {`${item.name} - (${item.iataCode})`}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
