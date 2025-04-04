import { useArtistInfo } from "@api/getArtistInfo";

export function useGetArtistInfo(artistId: string) {
  const artistInfo = useArtistInfo(artistId);
  return {
    artist: artistInfo.data,
    isLoadingArtist: artistInfo.isLoading,
    error: artistInfo.error,
  };
}
