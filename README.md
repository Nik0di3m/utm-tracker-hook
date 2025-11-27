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

### Option 2: Using the hook directly

```tsx
import { useUtmTracker } from "@nik0di3m/utm-tracker-hook";

export default function MyComponent() {
  const utmData = useUtmTracker();

  // utmData contains: utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid
  return <pre>{JSON.stringify(utmData, null, 2)}</pre>;
}
```

## ✨ Key Features

- 🎯 **Framework-agnostic** - Works with Next.js, Vite, CRA, and any React app
- 🍪 **Automatic cookie storage** - UTM parameters stored for 30 days (configurable)
- 📊 **Comprehensive tracking** - Captures UTM parameters, GCLID, and FBCLID
- 🔒 **SSR-safe** - Works seamlessly with server-side rendering
- 📦 **Lightweight** - Minimal dependencies (only `js-cookie`)
- 💪 **TypeScript support** - Fully typed with TypeScript
- ⚡ **Easy integration** - Drop-in provider component or use the hook directly

## 📋 Tracked Parameters

The hook automatically captures and stores the following parameters:

- `utm_source` - Campaign source
- `utm_medium` - Campaign medium
- `utm_campaign` - Campaign name
- `utm_term` - Campaign term
- `utm_content` - Campaign content
- `gclid` - Google Click ID
- `fbclid` - Facebook Click ID
