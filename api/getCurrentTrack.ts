import { CurrentPlaybackContext } from "@api/type/CurrentPlaybackContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import apiClient from "~/api/apiClient";

// Fonction pour récupérer le morceau en cours d'écoute
const fetchCurrentTrack = async (): Promise<CurrentPlaybackContext | null> => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("Token d'authentification non trouvé");
  }

  try {
    const { data } = await apiClient.get("me/player/currently-playing", {});

    return data;
  } catch (error) {
    // Si status 204, cela signifie qu'aucun morceau n'est en cours de lecture
    if (axios.isAxiosError(error) && error.response?.status === 204) {
      return null;
    }
    throw error;
  }
};

// Hook pour utiliser la requête avec TanStack Query
export const useCurrentTrack = () => {
  return useQuery({
    queryKey: ["currentTrack"],
    queryFn: fetchCurrentTrack,
    // Refetch toutes les x secondes pour avoir la position mise à jour
    refetchInterval: 1000,
    // Ne pas refetch quand la fenêtre perd le focus
    refetchOnWindowFocus: false,
  });
};
