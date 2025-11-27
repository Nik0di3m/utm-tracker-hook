import React from "react";
import { useUtmTracker, UtmTrackerConfig } from "./useUtmTracker";

interface UtmTrackerProviderProps extends UtmTrackerConfig {
  children?: React.ReactNode;
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
 *
 * With custom parameters:
 * ```tsx
 * <UtmTrackerProvider
 *   expiryDays={60}
 *   customParams={['ref', 'campaign_id', 'affiliate_id']}
 * >
 *   {children}
 * </UtmTrackerProvider>
 * ```
 */
export function UtmTrackerProvider({
  children,
  expiryDays = 30,
  customParams = []
}: UtmTrackerProviderProps) {
  // Automatically track UTM parameters
  useUtmTracker({ expiryDays, customParams });

  return <>{children}</>;
}
