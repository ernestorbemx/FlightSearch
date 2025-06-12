import { Alert, Button } from "@heroui/react";
import { useFlightStore } from "../stores/flight-store";
import { Link } from "react-router";
import { FlightOfferDetail } from "../components/detail/FlightOfferDetail";

export function FlightDetail() {
  const detail = useFlightStore((s) => s.flight);
  const dictionaries = useFlightStore((s) => s.dictionaries);

  return (
    <>
      {detail && dictionaries && (
        <>
          <FlightOfferDetail data={detail} dictionaries={dictionaries} />
        </>
      )}
      {(!detail || !dictionaries) && (
        <Alert
          color="warning"
          title="No offer was selected. Please search again"
          endContent={
            <Link to="/">
              <Button color="warning" size="sm" variant="flat">
                Go to search
              </Button>
            </Link>
          }
        ></Alert>
      )}
    </>
  );
}
