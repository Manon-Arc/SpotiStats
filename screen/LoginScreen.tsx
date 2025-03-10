import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Image } from "react-native";

import Authentication from "~/components/Authentication";
import { getData } from "~/hook/localStorage";
import { Box, Text } from "~/theme";

export default function LoginScreen() {
  const [hasToken, setHasToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getData("token");
      setHasToken(!!token);
      setIsLoading(false);
    };

    checkToken();
  }, []);

  if (isLoading) {
    return (
      <Box flex={1} backgroundColor="black" justifyContent="center" alignItems="center">
        <Text color="white">Chargement...</Text>
      </Box>
    );
  }

  if (hasToken) {
    return <Redirect href="/(tabs)/home" />;
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
