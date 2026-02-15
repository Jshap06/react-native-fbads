import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  withNativeAd,
  AdIconView,
  TriggerableView,
  MediaView,
} from 'react-native-fbads';

const {width} = Dimensions.get('window');

function NativeAdView({nativeAd}) {
  return (
    <View style={styles.card}>
      <MediaView style={styles.media} />
      <View style={styles.metaRow}>
        <AdIconView style={styles.icon} />
        <View style={styles.metaContent}>
          <TriggerableView style={styles.headline}>
            {nativeAd.headline}
          </TriggerableView>
          <Text style={styles.sponsored}>{nativeAd.sponsoredTranslation}</Text>
          <TriggerableView style={styles.description}>
            {nativeAd.linkDescription}
          </TriggerableView>
        </View>
      </View>
      <View style={styles.ctaRow}>
        <TriggerableView style={styles.cta}>
          {nativeAd.callToActionText}
        </TriggerableView>
      </View>
    </View>
  );
}

export default withNativeAd(NativeAdView);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#d8dde2',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  media: {
    width: width - 42,
    height: width / 2,
  },
  metaRow: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  icon: {
    width: 80,
    height: 80,
    marginLeft: 10,
  },
  metaContent: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'center',
  },
  headline: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2d3d',
  },
  sponsored: {
    color: '#475467',
    marginTop: 4,
  },
  description: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  ctaRow: {
    alignItems: 'center',
    paddingBottom: 12,
  },
  cta: {
    fontSize: 15,
    color: '#0a5cff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: '#b7cdfb',
    borderRadius: 8,
  },
});
