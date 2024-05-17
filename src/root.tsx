import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import "react-native-get-random-values";
import DeviceInfo from "react-native-device-info";
import "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Platform } from "react-native";
import { enableScreens } from "react-native-screens";
global.DeviceInfo = DeviceInfo;

// Prevent auto-hiding the splash screen.
// We will hide it in the root _layout.tsx when locale and other resources are loaded.
SplashScreen.preventAutoHideAsync()
  .then((result) => console.log(`prevent auto hide: ${result}`))
  .catch(() => {
    // Ignore possible race conditions from reload
  });

export function AppRoot() {
  // @ts-ignore
  const ctx = require.context("./app");
  useEffect(() => {
    if (Platform.OS === "ios") {
      enableScreens(false);
    }
  }, []);
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(AppRoot);
