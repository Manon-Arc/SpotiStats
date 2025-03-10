import { getData } from "~/hook/localStorage";
import { AccessTokenType } from "~/types/AccessTokenType";

export async function exchangeCodeForToken(
  redirectUri: string,
  client_id: string,
  client_secret: string
) {
  const base64Credentials = btoa(client_id + ":" + client_secret);
  const code = await getData("code").then((data) => data!);
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + base64Credentials,
    },
    body: new URLSearchParams({
      code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }).toString(),
  });
  const data: AccessTokenType = await response.json();
  return data.access_token;
}
