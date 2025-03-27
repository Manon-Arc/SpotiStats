import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";

import { Box, Text } from "~/theme";

export default function AuthCallback() {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        router.back();
      }, 2000);
      return () => clearTimeout(timeout);
    }, [router])
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "transparentModal",
          animation: "fade",
        }}
      />
      <Box>
        <Text>Successfully authenticated with Spotify!</Text>
        <Text>Redirecting back to the app...</Text>
      </Box>
    </>
  );
}
