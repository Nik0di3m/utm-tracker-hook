# utm-tracker-hook

🔍 Framework-agnostic React Hook for UTM tracking

📌 Automatically saves UTM, GCLID, FBCLID parameters in cookies for 30 days

✨ Works with **Next.js**, **Vite**, **Create React App**, and any React application

📦 Installation

```sh
Copy

npm install utm-tracker-hook
```

## 🚀 How to use?

### Option 1: Using UtmTrackerProvider (Recommended)

Add the provider to your root component to automatically track UTM parameters across your entire app.

#### Next.js (App Router)

```tsx
// app/layout.tsx
import { UtmTrackerProvider } from "@nik0di3m/utm-tracker-hook";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UtmTrackerProvider>{children}</UtmTrackerProvider>
      </body>
    </html>
  );
}
```

#### Next.js (Pages Router)

```tsx
// pages/_app.tsx
import { UtmTrackerProvider } from "@nik0di3m/utm-tracker-hook";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UtmTrackerProvider>
      <Component {...pageProps} />
    </UtmTrackerProvider>
  );
}
```

#### Vite / Create React App

```tsx
// src/App.tsx
import { UtmTrackerProvider } from "@nik0di3m/utm-tracker-hook";

function App() {
  return (
    <UtmTrackerProvider>
      <YourAppContent />
    </UtmTrackerProvider>
  );
}
```

#### Custom cookie expiry

```tsx
<UtmTrackerProvider expiryDays={60}>{children}</UtmTrackerProvider>
```

#### Track custom parameters

You can track additional custom URL parameters beyond the standard UTM parameters:

```tsx
<UtmTrackerProvider
  expiryDays={30}
  customParams={["ref", "campaign_id", "affiliate_id", "promo_code"]}
>
  {children}
</UtmTrackerProvider>
```

#### Allow override existing cookies

By default, the hook implements first-touch attribution (doesn't overwrite existing data). To enable last-touch attribution:

```tsx
<UtmTrackerProvider allowOverride={true}>
  {children}
</UtmTrackerProvider>
```

#### Custom cookie name

Avoid conflicts by using a custom cookie name:

```tsx
<UtmTrackerProvider cookieName="my_app_utm_data">
  {children}
</UtmTrackerProvider>
```

#### Full configuration example

```tsx
<UtmTrackerProvider
  expiryDays={60}
  customParams={["ref", "affiliate_id", "promo_code"]}
  allowOverride={true}
  cookieName="my_utm_tracking"
>
  {children}
</UtmTrackerProvider>
```

For URL:
```
https://yoursite.com?utm_source=google&ref=homepage&promo_code=SUMMER2024
```

The hook will capture:
- Standard: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `fbclid`
- Custom: `ref`, `affiliate_id`, `promo_code`

### Option 2: Using the hook directly

#### Basic usage

```tsx
import { useUtmTracker } from "@nik0di3m/utm-tracker-hook";

export default function MyComponent() {
  const utmData = useUtmTracker();

  // utmData contains: utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid
  return <pre>{JSON.stringify(utmData, null, 2)}</pre>;
}
```

#### With configuration

```tsx
import { useUtmTracker } from "@nik0di3m/utm-tracker-hook";

export default function MyComponent() {
  const utmData = useUtmTracker({
    expiryDays: 60,
    customParams: ["ref", "affiliate_id"],
    allowOverride: true,
    cookieName: "my_utm_data"
  });

  return <pre>{JSON.stringify(utmData, null, 2)}</pre>;
}
```

#### Backward compatible (legacy)

```tsx
// Still works for backward compatibility
const utmData = useUtmTracker(60); // expiryDays only
```

## 📝 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `expiryDays` | `number` | `30` | Cookie expiration time in days |
| `customParams` | `string[]` | `[]` | Additional URL parameters to track |
| `allowOverride` | `boolean` | `false` | Allow overwriting existing cookie data (enables last-touch attribution) |
| `cookieName` | `string` | `"utm_tracking_data"` | Custom cookie name to avoid conflicts |

## ✨ Key Features

- 🎯 **Framework-agnostic** - Works with Next.js, Vite, CRA, and any React app
- 🍪 **Automatic cookie storage** - UTM parameters stored for 30 days (configurable)
- 📊 **Comprehensive tracking** - Captures UTM parameters, GCLID, and FBCLID
- 🎨 **Custom parameters** - Track any additional URL parameters you need
- 🔒 **SSR-safe** - Works seamlessly with server-side rendering
- 📦 **Lightweight** - Minimal dependencies (only `js-cookie`)
- 💪 **TypeScript support** - Fully typed with TypeScript
- ⚡ **Easy integration** - Drop-in provider component or use the hook directly
- 🔄 **Backward compatible** - Legacy API still supported

## 📋 Tracked Parameters

The hook automatically captures and stores the following parameters:

- `utm_source` - Campaign source
- `utm_medium` - Campaign medium
- `utm_campaign` - Campaign name
- `utm_term` - Campaign term
- `utm_content` - Campaign content
- `gclid` - Google Click ID
- `fbclid` - Facebook Click ID
