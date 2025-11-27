import React from "react";
import { useUtmTracker } from "./useUtmTracker";

interface UtmTrackerProviderProps {
  children?: React.ReactNode;
  expiryDays?: number;
}

/**
 * UtmTrackerProvider - Component for automatic UTM tracking in React applications
 *
 * Usage in your root component (Next.js layout.tsx, App.tsx, etc.):
 * ```tsx
 * import { UtmTrackerProvider } from '@nik0di3m/utm-tracker-hook'
 *
 * export default function App({ children }) {
 *   return (
 *     <UtmTrackerProvider>
 *       {children}
 *     </UtmTrackerProvider>
 *   )
 * }
 * ```
 */
export function UtmTrackerProvider({
  children,
  expiryDays = 30
}: UtmTrackerProviderProps) {
  // Automatically track UTM parameters
  useUtmTracker(expiryDays);

  return <>{children}</>;
}
