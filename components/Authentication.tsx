import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";

import { Button } from "~/components/Button";
import { exchangeCodeForTokenPKCE } from "~/hook/getSpotifyAccessToken";
import { getData, storeData } from "~/hook/localStorage";
import { Text } from "~/theme";
import Box from "~/theme/Box";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function Authentication() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_CLIENT_ID!,
      scopes: [
        "user-read-email",
        "playlist-modify-public",
        "user-read-private",
        "playlist-modify-private",
        "user-top-read",
      ],
      usePKCE: true,
      redirectUri: makeRedirectUri({
        path: "callback",
      }),
    },
    discovery
  );

  useEffect(() => {
    console.log(response);
    if (response?.type === "success") {
      (async () => {
        const { code } = response.params;
        await storeData(code, "code");
        // Utilisez le code_verifier du request
        const token = await exchangeCodeForTokenPKCE(
          makeRedirectUri({ path: "callback" }),
          process.env.EXPO_PUBLIC_CLIENT_ID!,
          code,
          request?.codeVerifier || ""
        );
        await AsyncStorage.setItem("token", token);
        router.push("/(tabs)/home");
      })();
    }
  }, [response]);

  return (
    <Box height="40%" width="auto" justifyContent="center" gap="m_16">
      <Text color="white"> Connectez vous avec Spotify</Text>
      <Button
        iconName="social-spotify"
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </Box>
  );
}
