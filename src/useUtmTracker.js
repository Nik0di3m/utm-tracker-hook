"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUtmTracker = useUtmTracker;
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const js_cookie_1 = __importDefault(require("js-cookie"));
function useUtmTracker(expiryDays = 30) {
    const searchParams = (0, navigation_1.useSearchParams)();
    const [utmData, setUtmData] = (0, react_1.useState)({});
    (0, react_1.useEffect)(() => {
        if (typeof window === "undefined")
            return; // SSR safe
        // Check if UTM data is already stored in cookies
        const storedUtms = js_cookie_1.default.get("utm_data");
        if (storedUtms) {
            setUtmData(JSON.parse(storedUtms));
            return;
        }
        // Parse UTM params from URL
        const utms = {
            utm_source: searchParams.get("utm_source"),
            utm_medium: searchParams.get("utm_medium"),
            utm_campaign: searchParams.get("utm_campaign"),
            utm_term: searchParams.get("utm_term"),
            utm_content: searchParams.get("utm_content"),
            gclid: searchParams.get("gclid"),
            fbclid: searchParams.get("fbclid"),
        };
        // Store UTM data in cookies for 30 days
        js_cookie_1.default.set("utm_data", JSON.stringify(utms), { expires: expiryDays });
        // Update state
        setUtmData(utms);
    }, [searchParams, expiryDays]);
    return utmData;
}
