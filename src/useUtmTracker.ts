import { useEffect, useState } from "react";
import Cookies from "js-cookie";

type UtmParams = Record<string, string | null>;

export interface UtmTrackerConfig {
  expiryDays?: number;
  customParams?: string[];
  allowOverride?: boolean;
  cookieName?: string;
}

const DEFAULT_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
];

const DEFAULT_COOKIE_NAME = "utm_tracking_data";

export function useUtmTracker(config?: UtmTrackerConfig | number) {
  const [utmData, setUtmData] = useState<UtmParams>({});

  // Handle backward compatibility: if config is a number, treat it as expiryDays
  const normalizedConfig: UtmTrackerConfig =
    typeof config === "number" ? { expiryDays: config } : config || {};

  const {
    expiryDays = 30,
    customParams = [],
    allowOverride = false,
    cookieName = DEFAULT_COOKIE_NAME,
  } = normalizedConfig;

  // Combine default params with custom params
  const allParams = [...DEFAULT_PARAMS, ...customParams];

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR safe

    // Check if UTM data is already stored in cookies
    const storedUtms = Cookies.get(cookieName);

    if (storedUtms && !allowOverride) {
      // If cookie exists and override is not allowed, use stored data
      setUtmData(JSON.parse(storedUtms));
      return;
    }

    // Parse UTM params from URL using native URLSearchParams API
    const searchParams = new URLSearchParams(window.location.search);

    // Build params object dynamically based on allParams
    const utms: UtmParams = {};
    allParams.forEach((param) => {
      utms[param] = searchParams.get(param);
    });

    // If allowOverride is true or no cookie exists, store new data
    // Only store if there's at least one non-null parameter
    const hasAnyParam = allParams.some((param) => utms[param] !== null);

    if (hasAnyParam || !storedUtms) {
      // Store UTM data in cookies
      Cookies.set(cookieName, JSON.stringify(utms), { expires: expiryDays });
      setUtmData(utms);
    } else if (storedUtms) {
      // No new params but cookie exists, use stored data
      setUtmData(JSON.parse(storedUtms));
    }
  }, [expiryDays, allParams.join(","), allowOverride, cookieName]);

  return utmData;
}
