import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{
        animation: "fade"
      }}/>
      <Stack.Screen name="addedLocation" options={{
        animation: "fade"
      }}/>
    </Stack>
  );
}