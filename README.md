# react-native-fbads

React Native Facebook Audience Network module with a modern JS API and New Architecture-compatible module resolution.

## What is included
- Banner ads (`BannerView`)
- Interstitial ads (`InterstitialAdManager`, `useInterstitialAd`)
- Native ads (`NativeAdsManager`, `withNativeAd`)
- Ad settings bridge (`AdSettings`)
- TurboModule-first lookup with legacy fallback for compatibility

## Requirements
- React Native `>=0.76.0`
- React `>=18.2.0`
- Node.js `>=18`
- iOS deployment target `13.0+`
- Android `minSdk 21`

## Installation
```bash
npm install react-native-fbads
# or
yarn add react-native-fbads
```

### iOS
```bash
cd ios
pod install
cd ..
```

### Android
Autolinking handles package registration. The library manifest includes `com.facebook.ads.InterstitialAdActivity`.

## New Architecture
This package resolves native modules using:
1. `TurboModuleRegistry.get(...)`
2. Fallback to legacy `NativeModules`

That means it works in New Architecture projects and still keeps compatibility with legacy module registration while migrating.

## Quick Start

### 1. Optional global provider (recommended for hooks)
```tsx
import React from 'react';
import { NativeAdsManagerProvider } from 'react-native-fbads';

export default function App() {
  return (
    <NativeAdsManagerProvider>
      {/* app */}
    </NativeAdsManagerProvider>
  );
}
```

### 2. Banner ad
```tsx
import React from 'react';
import { BannerView } from 'react-native-fbads';

export function HomeBanner() {
  return (
    <BannerView
      type="standard"
      placementId="YOUR_BANNER_PLACEMENT_ID"
      onLoad={() => console.log('banner loaded')}
      onError={(e) => console.warn(e.message)}
    />
  );
}
```

### 3. Interstitial ad
```tsx
import React, { useEffect } from 'react';
import { Button } from 'react-native';
import { useInterstitialAd } from 'react-native-fbads';

export function InterstitialExample() {
  const { preloadAd, showPreloadedAd, loading } = useInterstitialAd();

  useEffect(() => {
    void preloadAd('YOUR_INTERSTITIAL_PLACEMENT_ID');
  }, [preloadAd]);

  return (
    <Button
      title={loading ? 'Loading...' : 'Show Interstitial'}
      onPress={() => void showPreloadedAd('YOUR_INTERSTITIAL_PLACEMENT_ID')}
    />
  );
}
```

### 4. Native ad
```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { NativeAdsManager, withNativeAd } from 'react-native-fbads';

const manager = new NativeAdsManager('YOUR_NATIVE_PLACEMENT_ID');

const NativeCard = withNativeAd(({ nativeAd }) => {
  if (!nativeAd) return null;
  return (
    <View>
      <Text>{nativeAd.headline}</Text>
      <Text>{nativeAd.bodyText}</Text>
      <Text>{nativeAd.callToActionText}</Text>
    </View>
  );
});

export function NativeAdScreen() {
  return <NativeCard adsManager={manager} />;
}
```

## AdSettings
```ts
import { AdSettings } from 'react-native-fbads';

AdSettings.addTestDevice('HASH_FROM_LOGS');
AdSettings.setIsChildDirected(false);
AdSettings.setMediationService('my-app');
```

## Expo
- Expo Go is not supported (native code required).
- Use development build / prebuild.
- Add plugin in `app.json`:

```json
{
  "expo": {
    "plugins": ["react-native-fbads"]
  }
}
```

## Troubleshooting
- If native module is not found, run a clean native rebuild.
- If iOS pods fail, run `pod repo update` then `pod install`.
- Use test placement IDs before production rollout.

## License
MIT
