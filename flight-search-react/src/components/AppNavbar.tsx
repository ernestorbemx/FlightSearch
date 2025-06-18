import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import clsx from "clsx";
import { Link, useLocation } from "react-router";

export const AcmeLogo = () => {
  return (
    <svg
      className="mx-2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
    >
      <path
        fill="currentColor"
        d="M2.5 19h19v2h-19zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43l-1.93.51l4.14 7.17l-4.97 1.33l-1.97-1.54l-1.45.39l1.82 3.16l.77 1.33L21 11.49c.81-.23 1.28-1.05 1.07-1.85"
      ></path>
    </svg>
  );
};

export function AppNavbar() {
  const location = useLocation();

  return (
    <Navbar isBordered={location.pathname != "/"}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACMETrips</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className={clsx("hidden sm:flex gap-4")} justify="center">
        <NavbarBrand className="text-primary-800">
          <AcmeLogo />
          <p className="font-bold text-inherit">ACMETrips</p>
        </NavbarBrand>
        <NavbarItem isActive={location.pathname == "/"}>
          <Link color="foreground" to="/">
            Search
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link color="foreground" to="/">
            Search
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
