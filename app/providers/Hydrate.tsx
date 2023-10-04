"use client";

import { Hydrate as HydrationBoundary } from "@tanstack/react-query";

/**
 * Wraps client components with hydrated data
 * @param props contains hydrated state
 */
export default function Hydrate(props: any) {
  return <HydrationBoundary {...props} />;
}
