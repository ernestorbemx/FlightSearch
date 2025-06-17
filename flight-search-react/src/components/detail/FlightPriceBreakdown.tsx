import { Card, CardBody, CardHeader } from "@heroui/card";
import type { FlightPrice, TravelerPricing } from "../../types";

interface Props {
  price: FlightPrice;
  travelerPricing: TravelerPricing[];
}
export function FlightPriceBreakdown({
  price: price,
  travelerPricing: tp,
}: Props) {
  const totalTaxes = price.taxes?.reduce((f1, f2) => (f1 += f2.amount), 0) ?? 0;
  const totalFees = price.fees?.reduce((f1, f2) => (f1 += f2.amount), 0) ?? 0;
  const otherCharges = price.total - price.base - totalTaxes - totalFees;
  const currency = price.billingCurrency ?? price.currency;
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Price breakdown</h2>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col w-full">
          <div className="flex gap-x-2">
            <span className="flex-1">Base price</span>
            <span>
              {price.base} {currency}
            </span>
          </div>

          <div className="flex gap-x-2 flex-wrap">
            <span className="w-full">Fees</span>
            <div className="flex flex-col w-full items-end">
              {!price.fees && <span>Not available</span>}
              {price.fees && (
                <>
                  {price.fees.map((f) => (
                    <div key={f.type}>
                      <span>{f.type}: </span>
                      <span>
                        {f.amount} {currency}
                      </span>
                    </div>
                  ))}
                  <span>
                    Total fees: {totalFees} {currency}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-x-2 flex-wrap">
            <span className="w-full">Taxes</span>
            <div className="flex flex-col w-full items-end">
              {!price.taxes && <span>Not available</span>}
              {price.taxes && (
                <>
                  {price.taxes?.map((tax) => (
                    <div key={tax.code}>
                      <span>{tax.code}: </span>
                      <span>
                        {tax.amount} {currency}
                      </span>
                    </div>
                  ))}
                  <span>
                    Total taxes: {totalTaxes} {currency}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-x-2">
            <span className="flex-1">Other charges</span>
            <span>
              {otherCharges} {currency}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-2 font-bold">
            <span className="flex-1">Total price</span>
            <span>
              {price.total} {currency}
            </span>
          </div>
          <hr className="my-4" />
          <span className="text-medium font-semibold">
            Pricing per traveler
          </span>
          <div className="flex flex-col">
            {tp.map((f, ix) => (
              <div className="text-sm" key={ix}>
                <span>
                  {f.travelerType} {ix + 1} - {f.price.total}{" "}
                  {f.price.billingCurrency ?? f.price.currency}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
