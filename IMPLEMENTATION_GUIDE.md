# Implementation Guide

This guide focuses on real app implementation patterns and integration decisions.

## 1. Decide your API style

### Hooks-first (recommended for new screens)
Use:
- `NativeAdsManagerProvider`
- `useInterstitialAd`
- `useNativeAdsManager`

### Legacy-compatible (recommended for existing apps)
Use:
- `NativeAdsManager`
- `InterstitialAdManager`
- `withNativeAd`

Both styles are supported.

## 2. Banner implementation

```tsx
import React from 'react';
import { View } from 'react-native';
import { BannerView } from 'react-native-fbads';

export function FeedFooterAd() {
  return (
    <View>
      <BannerView
        type="standard"
        placementId="YOUR_BANNER_PLACEMENT_ID"
        onError={(error) => {
          console.warn('Banner error', error.message);
        }}
      />
    </View>
  );
}
```

Implementation notes:
- `type` must be `standard` or `large`.
- Keep banner outside critical interaction area.

## 3. Interstitial implementation

```tsx
import React, { useEffect } from 'react';
import { Button } from 'react-native';
import { useInterstitialAd } from 'react-native-fbads';

export function NextLevelButton() {
  const { preloadAd, showPreloadedAd, loading } = useInterstitialAd();

  useEffect(() => {
    void preloadAd('YOUR_INTERSTITIAL_PLACEMENT_ID');
  }, [preloadAd]);

  const onPress = async () => {
    try {
      await showPreloadedAd('YOUR_INTERSTITIAL_PLACEMENT_ID');
    } finally {
      void preloadAd('YOUR_INTERSTITIAL_PLACEMENT_ID');
    }
  };

  return <Button title={loading ? 'Loading...' : 'Continue'} onPress={() => void onPress()} />;
}
```

Implementation notes:
- Preload early.
- Never block navigation forever if ad fails.

## 4. Native ad implementation

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { NativeAdsManager, withNativeAd } from 'react-native-fbads';

const manager = new NativeAdsManager('YOUR_NATIVE_PLACEMENT_ID', 5);

const NativeFeedCard = withNativeAd(({ nativeAd }) => {
  if (!nativeAd) return null;

  return (
    <View>
      <Text>{nativeAd.headline}</Text>
      <Text>{nativeAd.bodyText}</Text>
      <Text>{nativeAd.callToActionText}</Text>
    </View>
  );
});

export function NativeAdSlot() {
  return <NativeFeedCard adsManager={manager} />;
}
```

Implementation notes:
- Keep the `NativeAdsManager` instance stable (do not recreate on every render).
- Use valid placement IDs per environment.

## 5. Ad settings implementation

```ts
import { AdSettings } from 'react-native-fbads';

export function configureAdsForEnvironment() {
  if (__DEV__) {
    AdSettings.addTestDevice('YOUR_TEST_DEVICE_HASH');
  }

  AdSettings.setMediationService('my-rn-app');
  AdSettings.setIsChildDirected(false);
}
```

## 6. Error handling strategy
- Always handle `onError` callbacks for banners.
- Wrap async interstitial calls in `try/catch`.
- Keep ad features fail-safe (UX should continue when ad fails).

## 7. Rollout strategy
- Start with one placement per format.
- Validate fill rate and crash-free sessions in staging.
- Enable production placements after staged validation.

## 8. New Architecture notes
- JS side resolves TurboModule first and falls back to legacy module bridge.
- Native registration remains compatible with autolinking and standard RN package setup.

## 9. Integration verification checklist
- iOS: pod install completed and app builds.
- Android: app manifest merged successfully.
- Banner loads on at least one test placement.
- Interstitial preload/show flow is stable.
- Native ad renders with non-null ad payload.
