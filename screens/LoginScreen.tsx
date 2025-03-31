import { router } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import { useEffect, useState } from "react";
import { Image } from "react-native";

import Authentication from "~/components/Authentication";
import { getData } from "~/hook/localStorage";
import { Box, Text } from "~/theme";

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRefreshToken = async () => {
      const refreshToken = await getData("refreshToken");
      if (refreshToken) {
        router.push("/(tabs)/(home)");
      }
      setIsLoading(false);
    };

    checkRefreshToken();
  }, []);

  if (isLoading) {
    return (
      <Box flex={1} backgroundColor="black" justifyContent="center" alignItems="center">
        <Text color="white">Chargement...</Text>
      </Box>
    );
  }

  return (
    <Box flex={1} backgroundColor="black" justifyContent="flex-start" alignItems="center">
      <Box flex={0.7} justifyContent="flex-end" alignItems="center" paddingBottom="xxl_100">
        <Image
          source={require("~/assets/SpotiStats.png")}
          style={{ width: 500, height: "50%", resizeMode: "contain" }}
        />
      </Box>
      <Box />
      <Box flex={0.3}>
        <Text variant="title" textAlign="center" color="white">
          Bienvenue sur SpotiStats
        </Text>
      </Box>
      <Box flex={0.3} alignItems="center">
        <Authentication />
      </Box>
    </Box>
  );
}
