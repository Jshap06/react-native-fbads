import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useInterstitialAd} from 'react-native-fbads';
import {interstitialAdPlacementId} from '../Variables';

export default function InterstitialAd() {
  const {showAd, preloadAd, showPreloadedAd, loading, error} = useInterstitialAd();
  const [status, setStatus] = useState('Idle');

  const handleShowAd = async () => {
    try {
      setStatus('Loading and showing interstitial...');
      const clicked = await showAd(interstitialAdPlacementId);
      setStatus(clicked ? 'Ad closed after click.' : 'Ad closed.');
    } catch (err) {
      setStatus(err.message || 'Failed to show interstitial ad.');
    }
  };

  const handlePreload = async () => {
    try {
      setStatus('Preloading interstitial...');
      await preloadAd(interstitialAdPlacementId);
      setStatus('Interstitial preloaded and ready.');
    } catch (err) {
      setStatus(err.message || 'Failed to preload interstitial ad.');
    }
  };

  const handleShowPreloaded = async () => {
    try {
      setStatus('Showing preloaded interstitial...');
      const clicked = await showPreloadedAd(interstitialAdPlacementId);
      setStatus(clicked ? 'Preloaded ad closed after click.' : 'Preloaded ad closed.');
    } catch (err) {
      setStatus(err.message || 'Failed to show preloaded ad.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleShowAd} disabled={loading}>
        <Text style={styles.buttonText}>Show Interstitial</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePreload} disabled={loading}>
        <Text style={styles.buttonText}>Preload Interstitial</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleShowPreloaded} disabled={loading}>
        <Text style={styles.buttonText}>Show Preloaded</Text>
      </TouchableOpacity>

      {loading ? <ActivityIndicator style={styles.loader} /> : null}
      <Text style={styles.statusText}>{status}</Text>
      {error ? <Text style={styles.errorText}>{error.message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f4f6f8',
  },
  button: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 6,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d8dde2',
  },
  buttonText: {
    textAlign: 'center',
    color: '#0a5cff',
    fontWeight: '600',
  },
  loader: {
    marginTop: 12,
  },
  statusText: {
    marginTop: 12,
    textAlign: 'center',
    color: '#1f2d3d',
  },
  errorText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#c62828',
  },
});
