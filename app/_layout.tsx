import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index"/>
        <Stack.Screen name="addedLocation"/>
      </Stack>
    </GestureHandlerRootView>
  );
}