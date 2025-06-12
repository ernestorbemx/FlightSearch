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
              {price.base} {price.billingCurrency ?? price.currency}
            </span>
          </div>

          <div className="flex gap-x-2 flex-wrap">
            <span className="w-full">Fees</span>
            <div className="flex flex-col w-full items-end">
              {!price.fees && <span>Not specified</span>}
              {price.fees && (
                <>
                  {price.fees.map((f) => (
                    <div>
                      <span>{f.type}: </span>
                      <span>
                        {f.amount} {price.billingCurrency ?? price.currency}
                      </span>
                    </div>
                  ))}
                  <span>
                    Total fees:{" "}
                    {price.fees.reduce((f1, f2) => (f1 += f2.amount), 0)}{" "}
                    {price.billingCurrency ?? price.currency}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-x-2 flex-wrap">
            <span className="w-full">Taxes</span>
            <div className="flex flex-col w-full items-end">
              {!price.taxes && <span>Not specified</span>}
              {price.taxes && (
                <>
                  {price.taxes?.map((tax) => (
                    <div>
                      <span>{tax.code}: </span>
                      <span>
                        {tax.amount} {price.billingCurrency ?? price.currency}
                      </span>
                    </div>
                  ))}
                  <span>
                    Total taxes:{" "}
                    {price.taxes?.reduce((f1, f2) => (f1 += f2.amount), 0)}{" "}
                    {price.billingCurrency ?? price.currency}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-x-2 font-bold">
            <span className="flex-1">Total price</span>
            <span>
              {price.total} {price.billingCurrency ?? price.currency}
            </span>
          </div>
          <hr className="my-4" />
          <span className="text-lg font-semibold">Traveler pricing</span>
          <div className="flex flex-col">
            {tp.map((f) => (
              <div>
                <span>{f.travelerType} - </span>
                <span>
                  {f.price.total} {f.price.billingCurrency ?? f.price.currency}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
