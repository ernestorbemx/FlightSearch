import type { SVGProps } from "react";

export function DepartureClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.82 6.08A4 4 0 1 1 13.5 4.5a4 4 0 0 1-1.17 2.83M9.5 4.5L11 3m-.74 6.16l-1-.34a.34.34 0 0 0-.44.18l-.73 1.13l-4-2A2.49 2.49 0 0 0 .53 9.39a.68.68 0 0 0 .45.85l2.61.84l.26.08l.49 1.69a.36.36 0 0 0 .24.25l1.18.38a.37.37 0 0 0 .48-.42L6 11.87l.17.05l2.55.83a.67.67 0 0 0 .85-.41l.9-2.77a.34.34 0 0 0-.21-.41Z"
      ></path>
    </svg>
  );
}
