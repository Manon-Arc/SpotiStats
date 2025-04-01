import { SpotifyUserProfile } from "@api/type/SpotifyUserProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserProfile = async (): Promise<SpotifyUserProfile> => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("Token d'authentification non trouvé");
  }

  try {
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

// Hook pour utiliser la requête avec TanStack Query
export const useSpotifyAuth = () => {
  const {
    data: userProfile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("refreshToken");
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return {
    userProfile,
    isLoading,
    error,
    logout,
  };
};
