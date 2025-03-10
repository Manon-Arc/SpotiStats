import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";

import { Button } from "~/components/Button";
import { exchangeCodeForToken } from "~/hook/getSpotifyAccessToken";
import { storeData } from "~/hook/localStorage";
import { Text } from "~/theme";
import Box from "~/theme/Box";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const client_id = process.env.EXPO_PUBLIC_CLIENT_ID;
const client_secret = process.env.EXPO_PUBLIC_CLIENT_SECRET;

export default function Authentication() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: client_id!,
      scopes: [
        "user-read-email",
        "playlist-modify-public",
        "user-read-private",
        "playlist-modify-private",
      ],
      // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri({
        path: "callback",
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      (async () => {
        const { code } = response.params;
        await storeData(code, "code");
        const token = await exchangeCodeForToken(
          makeRedirectUri({ path: "callback" }),
          client_id!,
          client_secret!
        );
        await storeData(token, "token");
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
