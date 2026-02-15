# Integration Guide

This guide is for production integration in a React Native app, with structure similar to mature ad SDKs (for example AdMob-style setup guides).

## 1. Prerequisites
- React Native `>=0.76.0`
- React `>=18.2.0`
- Node `>=18`
- Android minSdk `21+`
- iOS deployment target `13.0+`

## 2. Install
```bash
npm install react-native-fbads
```

or

```bash
yarn add react-native-fbads
```

## 3. iOS integration

### Install pods
```bash
cd ios
pod install
cd ..
```

### Privacy + tracking (recommended)
If you use tracking permission flow, include `NSUserTrackingUsageDescription` in `Info.plist`.

Example:
```xml
<key>NSUserTrackingUsageDescription</key>
<string>This identifier will be used to deliver personalized ads.</string>
```

## 4. Android integration

### Build requirements
Your app should use modern Android Gradle Plugin and AndroidX.

### Manifest
`InterstitialAdActivity` is already declared by this library manifest and merged into the app manifest at build time.

## 5. New Architecture behavior
This library resolves modules with:
- `TurboModuleRegistry.get(...)`
- fallback to legacy `NativeModules`

This makes migration smoother in mixed/new architecture apps.

## 6. App-level setup patterns

### Pattern A: hooks-first setup (recommended)
```tsx
import React from 'react';
import { NativeAdsManagerProvider } from 'react-native-fbads';

export default function App() {
  return (
    <NativeAdsManagerProvider>
      {/* app navigation */}
    </NativeAdsManagerProvider>
  );
}
```

### Pattern B: legacy API setup
If your app already uses class-based helpers (`NativeAdsManager`, `InterstitialAdManager`), it can continue without breaking changes.

## 7. Production safety checklist
- Use test devices before enabling production placements.
- Validate each placement ID in staging first.
- Handle `onError` callbacks on all ad surfaces.
- Preload interstitials before user-triggered flow.
- Keep ads optional in UX (no hard app-block if ad load fails).

## 8. Integration examples

### Banner
```tsx
<BannerView
  type="standard"
  placementId="YOUR_BANNER_PLACEMENT_ID"
  onLoad={() => {}}
  onError={(e) => console.warn(e.message)}
/>
```

### Interstitial
```tsx
const { preloadAd, showPreloadedAd } = useInterstitialAd();

await preloadAd('YOUR_INTERSTITIAL_PLACEMENT_ID');
await showPreloadedAd('YOUR_INTERSTITIAL_PLACEMENT_ID');
```

### Native ad
```tsx
const manager = new NativeAdsManager('YOUR_NATIVE_PLACEMENT_ID');
const NativeCard = withNativeAd(({ nativeAd }) => {
  if (!nativeAd) return null;
  return <Text>{nativeAd.headline}</Text>;
});

<NativeCard adsManager={manager} />
```

## 9. Expo integration
- Expo Go is not supported.
- Use prebuild/dev-client workflow.
- Add plugin:

```json
{
  "expo": {
    "plugins": ["react-native-fbads"]
  }
}
```

Then rebuild native projects.

## 10. Common issues

### Module not found
- Clean build caches
- Reinstall pods
- Rebuild native app

### Ads not showing
- Ensure placement IDs are valid
- Confirm account + app + placement state in Meta dashboard
- Ensure test device setup for development

### iOS tracking status always unavailable
- iOS version below 14, or missing tracking description key
