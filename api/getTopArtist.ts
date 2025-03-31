import { useQuery } from "@tanstack/react-query";

import { SpotifyExternalUrls, SpotifyImage } from "./getTopMusic";

import apiClient from "~/api/apiClient";

export type SpotifyFollowers = {
  href: string | null;
  total: number;
};

export type SpotifyArtistFull = {
  external_urls: SpotifyExternalUrls;
  followers: SpotifyFollowers;
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type TopArtistsResponse = {
  items: SpotifyArtistFull[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string | null;
  previous: string | null;
};

// Paramètres pour la requête
export type TopArtistsParams = {
  limit?: number;
  offset?: number;
  time_range?: "short_term" | "medium_term" | "long_term";
};

// Fonction pour récupérer les tops artistes
const fetchTopArtists = async (params: TopArtistsParams = {}): Promise<TopArtistsResponse> => {
  try {
    const { data } = await apiClient.get("/me/top/artists", {
      params: {
        limit: params.limit || 50,
        offset: params.offset || 0,
        time_range: params.time_range || "short_term",
      },
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des tops artistes:", error);
    throw error;
  }
};

// Hook pour utiliser la requête avec TanStack Query
export const useTopArtists = (params: TopArtistsParams = {}) => {
  return useQuery({
    queryKey: ["topArtists", params],
    queryFn: () => fetchTopArtists(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
