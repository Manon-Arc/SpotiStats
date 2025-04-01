import { TopTracksResponse } from "@api/type/TopTracksResponse";
import { ApiParams } from "@api/type/apiParams";
import { useQuery } from "@tanstack/react-query";

import apiClient from "~/api/apiClient";

// Fonction pour récupérer les tops morceaux
const fetchTopTracks = async (params: ApiParams = {}): Promise<TopTracksResponse> => {
  try {
    const { data } = await apiClient.get("/me/top/tracks", {
      params: {
        limit: params.limit || 50,
        offset: params.offset || 0,
        time_range: params.time_range || "short_term",
      },
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des tops morceaux:", error);
    throw error;
  }
};

// Hook pour utiliser la requête avec TanStack Query
export const useTopTracks = (params: ApiParams = {}) => {
  return useQuery({
    queryKey: ["topTracks", params],
    queryFn: () => fetchTopTracks(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
