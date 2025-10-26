import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563eb", // màu xanh active
        tabBarInactiveTintColor: "gray",   // màu icon không active
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="addedLocation"
        options={{
          title: "Added Location",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="fullLocationInfo"
        options={{
          title: "Location Info",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
