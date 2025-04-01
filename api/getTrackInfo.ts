import apiClient from "@api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { SpotifyTrack } from "@api/type/SpotifyTrack";

const fetchTrackInfo = async (trackId: string): Promise<SpotifyTrack> => {
  try {
    const { data } = await apiClient.get(`/tracks/${trackId}`);
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des informations de la piste:", error);
    throw error;
  }
};

export const useTrackInfo = (trackId: string) => {
  return useQuery({
    queryKey: ["trackInfo"],
    queryFn: () => fetchTrackInfo(trackId),
  });
};
