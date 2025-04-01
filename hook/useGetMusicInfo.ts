import { useTrackInfo } from "@api/getTrackInfo";

export function useGetMusicInfo(trackId: string) {
  const trackInfo = useTrackInfo(trackId);

  return {
    track: trackInfo.data,
    isLoadingTrack: trackInfo.isLoading,
    error: trackInfo.error,
  };
}
