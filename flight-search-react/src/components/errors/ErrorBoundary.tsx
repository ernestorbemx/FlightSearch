import { isRouteErrorResponse, useRouteError } from "react-router";
import { AcmeLogo } from "../AppNavbar";

export function ErrorBoundary() {
  const error = useRouteError();
  console.log({ error });
  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="flex flex-col items-center gap-y-8">
        {isRouteErrorResponse(error) ? (
          <div className="flex  flex-col items-center">
            <h1 className="text-2xl font-semibold text-red-500">
              {error.status} {error.statusText}
            </h1>
            <p className="text-stone-700">{error.data}</p>
          </div>
        ) : (
          <>
            {error instanceof Error ? (
              <div className="flex  flex-col items-center">
                <h1 className="text-2xl font-semibold text-red-500">Error</h1>
                <p>Message: "{error.message}"</p>
                <p>The stack trace is:</p>
                <pre className="bg-stone-200 p-2 rounded-md mt-4">
                  {error.stack}
                </pre>
              </div>
            ) : (
              <div className="flex  flex-col items-center">
                <h1 className="text-2xl font-semibold text-red-500">
                  Unexpected error
                </h1>
                <p>
                  Well, it's embarassing but we weren't expecting this to
                  happen.
                </p>
                <p>Please contact with support to get help.</p>
              </div>
            )}
          </>
        )}
        <div className="flex items-center text-sm text-primary-800">
          <AcmeLogo />
          <p className="font-bold text-inherit">ACMETrips</p>
        </div>
      </div>
    </div>
  );
}
