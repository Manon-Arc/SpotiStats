import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RecentlyPlayedTracksResponse } from "@api/type/RecentlyPlayedTracksResponse"

import apiClient from "~/api/apiClient";

// Paramètres pour la requête
export type RecentlyPlayedTracksPrams = {
  limit?: number;
};

// Fonction pour récupérer les tops morceaux
const fetchRecentlyPlayedTrack = async (params: RecentlyPlayedTracksPrams = {}): Promise<RecentlyPlayedTracksResponse> => {
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
export const useRecentlyPlayedTracks = (params: RecentlyPlayedTracksPrams = {}) => {
  return useQuery({
    queryKey: ["recentlyPlayedTracks", params],
    queryFn: () => fetchRecentlyPlayedTrack(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
