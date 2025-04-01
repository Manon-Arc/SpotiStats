import apiClient from "@api/apiClient";
import { SpotifyArtist } from "@api/type/SpotifyArtist";
import { useQuery } from "@tanstack/react-query";

export const fetchArtistInfo = async (artistId: string): Promise<SpotifyArtist> => {
  try {
    const { data } = await apiClient.get(`/artists/${artistId}`);
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des informations de l'artiste:", error);
    throw error;
  }
};

export const useArtistInfo = (artistId: string) => {
  return useQuery({
    queryKey: ["artist"],
    queryFn: () => fetchArtistInfo(artistId),
  });
};
