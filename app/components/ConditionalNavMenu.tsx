"use client";

import { usePathname } from "next/navigation";
import NavMenu from "./NavMenu";

export default function ConditionalNavMenu() {
  const pathname = usePathname();

  // Hide navbar on landing page and sign-in page
  const hideNavbar = pathname === "/" || pathname?.startsWith("/auth/signin");

  if (hideNavbar) {
    return null;
  }

  return <NavMenu />;
}
