import { useRecentlyPlayedTracks } from "@api/getRecentlyPlayedTrack";

export function useGetRecentlyPlayedTracks() {
  const recentlyPlayedTracks = useRecentlyPlayedTracks();
  return {
    recentlyPlayedTracks: recentlyPlayedTracks.data,
    isLoadingRecentlyPlayedTracks: recentlyPlayedTracks.isLoading,
    error: recentlyPlayedTracks.error,
  };
}