import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/react";

export function FlightOfferSkeleton() {
  return (
    <Card className="space-y-5 p-4" radius="lg">
      <div className="flex w-full gap-x-4">
        <div className="flex-1">
          <Skeleton className="rounded-lg mb-4">
            <div className="h-4 rounded-lg bg-default-300" />
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300" />
            </Skeleton>
          </div>
        </div>
        <Skeleton className="border-stone-200 borde-0 border-l-1 px-4 max-w-48 flex-1 rounded-lg"></Skeleton>
      </div>
    </Card>
  );
}
