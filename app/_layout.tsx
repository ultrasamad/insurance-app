import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const InitialLayout = () => {
  const { isAuthenticated } = useAuth();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(tabs)" options={{ title: "Authenticated" }} />
        </Stack.Protected>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="index" options={{ title: "Welcome" }} />
          <Stack.Screen name="login" options={{ title: "Login" }} />
          <Stack.Screen name="register" options={{ title: "Register" }} />
        </Stack.Protected>
      </Stack>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
