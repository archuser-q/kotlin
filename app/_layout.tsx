import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "../global.css";

export default function RootLayout() {
  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        staleTime: 5*10*1000,
        gcTime: 6*10*1000,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
      }
    }
  })
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
    
  );
}