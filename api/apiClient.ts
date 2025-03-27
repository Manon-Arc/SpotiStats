// api/apiClient.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";

import { refreshAccessToken } from "~/hook/getSpotifyAccessToken";

// Création du client axios
const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

// Intercepteur pour ajouter le token à chaque requête
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour détecter les tokens expirés
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si l'erreur est 401 et que nous n'avons pas déjà essayé de rafraîchir
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Rafraîchir le token
        const newToken = await refreshAccessToken();

        // Mettre à jour la requête et réessayer
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Si le rafraîchissement échoue, rediriger vers la page d'authentification
        await AsyncStorage.multiRemove(["token", "refreshToken"]);
        router.push("/login");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
