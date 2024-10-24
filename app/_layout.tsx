import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import UserProvider from "@/context/UserContext";
import { Switch, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
      <UserProvider>
        <View className="absolute top-16 right-6 z-10">
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modal)/set-task"
            options={{ headerShown: false, presentation: "modal" }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </UserProvider>
    </ThemeProvider>
  );
}
