import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type SpotifyExternalUrls = {
  spotify: string;
};

export type SpotifyArtist = {
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type SpotifyImage = {
  height: number;
  width: number;
  url: string;
};

export type SpotifyAlbum = {
  album_type: string;
  artists: SpotifyArtist[];
  available_markets: string[];
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  is_playable: boolean;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

export type SpotifyTrack = {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  external_urls: SpotifyExternalUrls;
  href: string;
  uri: string;
  popularity: number;
  is_playable?: boolean;
  type: string;
  duration_ms?: number;
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
  console.log(token);

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
