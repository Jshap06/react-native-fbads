const { NativeModules } = require('react-native');

NativeModules.CTKAdSettingsManager = {
  currentDeviceHash: 'test-hash-123',
  addTestDevice: jest.fn(),
  clearTestDevices: jest.fn(),
  setLogLevel: jest.fn(),
  setIsChildDirected: jest.fn(),
  setMediationService: jest.fn(),
  setUrlPrefix: jest.fn(),
  requestTrackingPermission: jest.fn().mockResolvedValue('authorized'),
  getTrackingStatus: jest.fn().mockResolvedValue('authorized'),
};

NativeModules.CTKInterstitialAdManager = {
  showAd: jest.fn().mockResolvedValue(true),
  preloadAd: jest.fn().mockResolvedValue(true),
  showPreloadedAd: jest.fn().mockResolvedValue(true),
};

NativeModules.CTKNativeAdManager = {
  init: jest.fn(),
  registerViewsForInteraction: jest.fn().mockResolvedValue(true),
};

NativeModules.CTKNativeAdEmitter = {
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};

NativeModules.CTKBannerView = {
  name: 'CTKBannerView',
};

NativeModules.CTKNativeAd = {
  name: 'CTKNativeAd',
};
