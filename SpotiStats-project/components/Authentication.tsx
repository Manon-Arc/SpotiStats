import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { Button } from 'react-native';

import { exchangeCodeForToken } from '~/hooks/getSpotifyAccessToken';
import { storeData } from '~/hooks/localStorage';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const client_id = process.env.EXPO_PUBLIC_CLIENT_ID;
const client_secret = process.env.EXPO_PUBLIC_CLIENT_SECRET;

export default function Authentication() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: client_id!,
      scopes: [
        'user-read-email',
        'playlist-modify-public',
        'user-read-private',
        'playlist-modify-private',
      ],
      // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri({
        path: 'callback',
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      (async () => {
        const { code } = response.params;
        await storeData(code, 'code');
        const token = await exchangeCodeForToken(
          makeRedirectUri({ path: 'callback' }),
          client_id!,
          client_secret!
        );
        await storeData(token, 'token');
      })();
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
