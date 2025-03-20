"use client";

import { Authenticated } from "convex/react";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return <Authenticated>{children}</Authenticated>;
}
