import React, {useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AdSettings, NativeAdsManagerProvider} from 'react-native-fbads';

import HomeScreen from './src';
import NativeAdScreen from './src/NativeAds';
import BannerAdScreen from './src/BannerAds';
import InterstitialAdScreen from './src/InterstitialAds';

const SCREEN = {
  HOME: 'home',
  NATIVE: 'native',
  BANNER: 'banner',
  INTERSTITIAL: 'interstitial',
};

export default function App() {
  const [activeScreen, setActiveScreen] = useState(SCREEN.HOME);

  useEffect(() => {
    const configureAds = async () => {
      AdSettings.setLogLevel('debug');
      if (AdSettings.currentDeviceHash) {
        AdSettings.addTestDevice(AdSettings.currentDeviceHash);
      }

      const requestedStatus = await AdSettings.requestTrackingPermission();
      if (requestedStatus === 'authorized' || requestedStatus === 'unavailable') {
        AdSettings.setAdvertiserIDCollectionEnabled(true);
        AdSettings.setAdvertiserTrackingEnabled(true);
      }
    };

    void configureAds();

    return () => {
      AdSettings.clearTestDevices();
    };
  }, []);

  const screenTitle = useMemo(() => {
    switch (activeScreen) {
      case SCREEN.NATIVE:
        return 'Native Ads';
      case SCREEN.BANNER:
        return 'Banner Ads';
      case SCREEN.INTERSTITIAL:
        return 'Interstitial Ads';
      default:
        return 'React Native FBAds';
    }
  }, [activeScreen]);

  const renderScreen = () => {
    switch (activeScreen) {
      case SCREEN.NATIVE:
        return <NativeAdScreen />;
      case SCREEN.BANNER:
        return <BannerAdScreen />;
      case SCREEN.INTERSTITIAL:
        return <InterstitialAdScreen />;
      default:
        return <HomeScreen onOpenScreen={setActiveScreen} />;
    }
  };

  return (
    <NativeAdsManagerProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          {activeScreen !== SCREEN.HOME ? (
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => setActiveScreen(SCREEN.HOME)}
            >
              <Text style={styles.backButton}>Back</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.backPlaceholder} />
          )}
          <Text style={styles.headerTitle}>{screenTitle}</Text>
          <View style={styles.backPlaceholder} />
        </View>
        {renderScreen()}
      </SafeAreaView>
    </NativeAdsManagerProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d8dde2',
    backgroundColor: '#ffffff',
  },
  backButton: {
    fontSize: 14,
    color: '#0a5cff',
    fontWeight: '600',
  },
  backPlaceholder: {
    width: 40,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2d3d',
  },
});
