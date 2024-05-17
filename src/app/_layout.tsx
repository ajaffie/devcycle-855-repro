import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import "react-native-get-random-values";
import DeviceInfo from "react-native-device-info";
import "@react-native-async-storage/async-storage";
global.DeviceInfo = DeviceInfo;

// Prevent auto-hiding the splash screen.
// We will hide it in the root _layout.tsx when locale and other resources are loaded.
SplashScreen.preventAutoHideAsync()
  .then((result) => console.log(`prevent auto hide: ${result}`))
  .catch(() => {
    // Ignore possible race conditions from reload
  });
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  useIsDevCycleInitialized,
  withDevCycleProvider,
} from "@devcycle/react-native-expo-client-sdk";

function RootLayout() {
  const devCycleInit = useIsDevCycleInitialized();
  console.debug("root layout", { devCycleInit });
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}

export default withDevCycleProvider({
  options: {
    reactNative: true,
  },
})(RootLayout);
