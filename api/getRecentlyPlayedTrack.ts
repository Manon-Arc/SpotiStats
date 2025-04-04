import { RecentlyPlayedTracksResponse } from "@api/type/RecentlyPlayedTracksResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

import apiClient from "~/api/apiClient";

// Paramètres pour la requête
export type RecentlyPlayedTracksParams = {
  limit?: number;
};

// Fonction pour récupérer les tops morceaux
const fetchRecentlyPlayedTrack = async (
  params: RecentlyPlayedTracksParams = {}
): Promise<RecentlyPlayedTracksResponse> => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("Token d'authentification non trouvé");
  }

  const { data } = await apiClient.get("/me/player/recently-played", {
    params: {
      limit: params.limit || 50,
    },
  });

  return data;
};

// Hook pour utiliser la requête avec TanStack Query
export const useRecentlyPlayedTracks = (params: RecentlyPlayedTracksParams = {}) => {
  return useQuery({
    queryKey: ["recentlyPlayedTracks", params],
    queryFn: () => fetchRecentlyPlayedTrack(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
