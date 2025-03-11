"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

type UtmParams = Record<string, string | null>;

export function useUtmTracker(expiryDays: number = 30) {
  const searchParams = useSearchParams();
  const [utmData, setUtmData] = useState<UtmParams>({});

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR safe

    // Check if UTM data is already stored in cookies
    const storedUtms = Cookies.get("utm_data");
    if (storedUtms) {
      setUtmData(JSON.parse(storedUtms));
      return;
    }

    // Parse UTM params from URL
    const utms: UtmParams = {
      utm_source: searchParams.get("utm_source"),
      utm_medium: searchParams.get("utm_medium"),
      utm_campaign: searchParams.get("utm_campaign"),
      utm_term: searchParams.get("utm_term"),
      utm_content: searchParams.get("utm_content"),
      gclid: searchParams.get("gclid"),
      fbclid: searchParams.get("fbclid"),
    };

    // Store UTM data in cookies for 30 days
    Cookies.set("utm_data", JSON.stringify(utms), { expires: expiryDays });

    // Update state
    setUtmData(utms);
  }, [searchParams, expiryDays]);

  return utmData;
}
