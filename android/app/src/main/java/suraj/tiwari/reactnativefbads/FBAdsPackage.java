/**
 * FBAdsPackage.java
 * suraj.tiwari.reactnativefbads
 *
 * Created by Suraj Tiwari on 07/08/18.
 * Copyright © 2018 Suraj Tiwari All rights reserved.
 */
package suraj.tiwari.reactnativefbads;

import androidx.annotation.Nullable;
import com.facebook.react.BaseReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Main package exporting native modules and views with New Architecture support.
 * Uses BaseReactPackage so modules can be discovered by TurboModuleManager.
 */
public class FBAdsPackage extends BaseReactPackage {
    private static final List<Class<? extends NativeModule>> MODULES = Arrays.asList(
        NativeAdManager.class,
        AdSettingsManager.class,
        InterstitialAdManager.class
    );

    @Override
    public @Nullable NativeModule getModule(String name, ReactApplicationContext reactContext) {
        switch (name) {
            case NativeAdManager.NAME:
                return new NativeAdManager(reactContext);
            case AdSettingsManager.NAME:
                return new AdSettingsManager(reactContext);
            case InterstitialAdManager.NAME:
                return new InterstitialAdManager(reactContext);
            default:
                return null;
        }
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
           new NativeAdViewManager(),
           new BannerViewManager(),
           new AdIconViewManager(),
           new MediaViewManager(),
           new NativeAdChoicesViewManager(reactContext)
        );
    }

    @Override
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
        final Map<String, ReactModuleInfo> moduleInfos = new HashMap<>();

        for (Class<? extends NativeModule> moduleClass : MODULES) {
            final ReactModule reactModule = moduleClass.getAnnotation(ReactModule.class);
            if (reactModule == null) {
                continue;
            }

            moduleInfos.put(
                reactModule.name(),
                new ReactModuleInfo(
                    reactModule.name(),
                    moduleClass.getName(),
                    reactModule.canOverrideExistingModule(),
                    reactModule.needsEagerInit(),
                    reactModule.isCxxModule(),
                    ReactModuleInfo.classIsTurboModule(moduleClass)
                )
            );
        }

        return () -> moduleInfos;
    }
}
