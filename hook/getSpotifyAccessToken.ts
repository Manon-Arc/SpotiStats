import { getData, storeData } from "~/hook/localStorage";
import { AccessTokenType } from "~/types/AccessTokenType";

export const exchangeCodeForTokenPKCE = async (
  redirectUri: string,
  clientId: string,
  code: string,
  codeVerifier: string
): Promise<string> => {
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);
  params.append("code_verifier", codeVerifier); // C'est la clé de PKCE

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error_description || "Erreur lors de l'échange du code");
    }
    const refreshToken: string = data.refresh_token;
    await storeData("refreshToken", refreshToken);
    return data.access_token;
  } catch (error) {
    console.error("Erreur lors de l'échange du code:", error);
    throw error;
  }
};

export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = await getData("refreshToken");

  if (!refreshToken) {
    throw new Error("Aucun refresh token disponible");
  }

  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);
  params.append("client_id", process.env.EXPO_PUBLIC_CLIENT_ID!);

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error_description || "Erreur lors du rafraîchissement du token");
    }

    // Sauvegarder le nouveau token et éventuellement le nouveau refresh token
    await storeData("token", data.access_token);
    if (data.refresh_token) {
      await storeData(data.refresh_token, "refreshToken");
    }

    return data.access_token;
  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token:", error);
    throw error;
  }
};
