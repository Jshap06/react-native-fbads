import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BannerView} from 'react-native-fbads';
import {bannerAdPlacementId} from '../Variables';

export default function BannerAd() {
  const [lastError, setLastError] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Banner Ads load with the same placement id using different sizes.
      </Text>
      <View style={styles.bannerContainer}>
        <BannerView
          placementId={bannerAdPlacementId}
          type="standard"
          onPress={() => setLastError('')}
          onError={(error) => setLastError(error.message)}
        />
      </View>
      <View style={styles.bannerContainer}>
        <BannerView
          placementId={bannerAdPlacementId}
          type="large"
          onPress={() => setLastError('')}
          onError={(error) => setLastError(error.message)}
        />
      </View>
      {lastError ? <Text style={styles.errorText}>Last error: {lastError}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f4f6f8',
  },
  infoText: {
    textAlign: 'center',
    color: '#1f2d3d',
    marginBottom: 12,
  },
  bannerContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  errorText: {
    marginTop: 12,
    color: '#c62828',
    textAlign: 'center',
  },
});
