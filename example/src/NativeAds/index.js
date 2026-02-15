import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeAdsManager} from 'react-native-fbads';
import {nativeAdPlacementId} from '../Variables';

import NativeAdView from './NativeAdView';

export default function NativeAd() {
  const adsManager = useMemo(
    () => new NativeAdsManager(nativeAdPlacementId),
    []
  );

  useEffect(() => {
    return () => {
      adsManager.dispose();
    };
  }, [adsManager]);

  return (
    <View style={styles.container}>
      <NativeAdView adsManager={adsManager} adChoicePosition="bottomRight" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f4f6f8',
    padding: 20,
  },
});
