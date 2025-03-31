import { useCurrentTrack } from "@api/getCurrentTrack";

export function useGetCurrentPlaybackContext() {
  const currentPlaybackContext = useCurrentTrack();
  return {
    currentTrack: currentPlaybackContext.data,
    isLoadingTrack: currentPlaybackContext.isLoading,
    error: currentPlaybackContext.error,
  };
}
