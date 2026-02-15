import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const SCREEN = {
  NATIVE: 'native',
  BANNER: 'banner',
  INTERSTITIAL: 'interstitial',
};

export default function Main({onOpenScreen}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audience Network Demos</Text>
      <TouchableOpacity
        accessibilityRole="button"
        style={styles.button}
        onPress={() => onOpenScreen(SCREEN.NATIVE)}
      >
        <Text style={styles.buttonText}>Native Ads</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        style={styles.button}
        onPress={() => onOpenScreen(SCREEN.BANNER)}
      >
        <Text style={styles.buttonText}>Banner Ads</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        style={styles.button}
        onPress={() => onOpenScreen(SCREEN.INTERSTITIAL)}
      >
        <Text style={styles.buttonText}>Interstitial Ads</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f4f6f8',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2d3d',
    marginBottom: 24,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d8dde2',
  },
  buttonText: {
    textAlign: 'center',
    color: '#0a5cff',
    fontWeight: '600',
    fontSize: 16,
  },
});
