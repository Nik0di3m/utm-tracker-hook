import { useEffect, useState } from "react";
import Cookies from "js-cookie";

type UtmParams = Record<string, string | null>;

export interface UtmTrackerConfig {
  expiryDays?: number;
  customParams?: string[];
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

export function useUtmTracker(config?: UtmTrackerConfig | number) {
  const [utmData, setUtmData] = useState<UtmParams>({});

  // Handle backward compatibility: if config is a number, treat it as expiryDays
  const normalizedConfig: UtmTrackerConfig =
    typeof config === "number" ? { expiryDays: config } : config || {};

  const { expiryDays = 30, customParams = [] } = normalizedConfig;

  // Combine default params with custom params
  const allParams = [...DEFAULT_PARAMS, ...customParams];

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR safe

    // Check if UTM data is already stored in cookies
    const storedUtms = Cookies.get("utm_data");
    if (storedUtms) {
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

    // Store UTM data in cookies
    Cookies.set("utm_data", JSON.stringify(utms), { expires: expiryDays });

    // Update state
    setUtmData(utms);
  }, [expiryDays, allParams.join(",")]);

  return utmData;
}
