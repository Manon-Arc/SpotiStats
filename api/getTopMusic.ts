import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Types pour la réponse de l'API
export type SpotifyTrack = {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  album: {
    id: string;
    name: string;
    images: { url: string; height: number; width: number }[];
  };
  popularity: number;
};

export type TopTracksResponse = {
  items: SpotifyTrack[];
  total: number;
  limit: number;
  offset: number;
};

// Paramètres pour la requête
export type TopTracksParams = {
  limit?: number;
  offset?: number;
  time_range?: "short_term" | "medium_term" | "long_term";
};

// Fonction pour récupérer les tops morceaux
const fetchTopTracks = async (params: TopTracksParams = {}): Promise<TopTracksResponse> => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("Token d'authentification non trouvé");
  }

  const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      limit: params.limit || 20,
      offset: params.offset || 0,
      time_range: params.time_range || "medium_term",
    },
  });

  return data;
};

// Hook pour utiliser la requête avec TanStack Query
export const useTopTracks = (params: TopTracksParams = {}) => {
  return useQuery({
    queryKey: ["topTracks", params],
    queryFn: () => fetchTopTracks(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
