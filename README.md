# utm-tracker-hook

🔍 Custom React Hook for UTM tracking in Next.js

📌 Automatically saves UTM, GCLID, FBCLID parameters in cookies for 30 days

📦 Installation

```sh
Copy

npm install utm-tracker-hook
```

## 🚀 How to use?

```js
Copy;

import { useUtmTracker } from "utm-tracker-hook";

export default function Page() {
  const utmData = useUtmTracker();

  return <pre>{JSON.stringify(utmData, null, 2)}</pre>;
}
```

## Key Features:

    Automatic cookie storage for UTM parameters (30 day expiration)

    Supports GCLID (Google Click ID) and FBCLID (Facebook Click ID)

    Simple integration with React/Next.js projects

    TypeScript support included
