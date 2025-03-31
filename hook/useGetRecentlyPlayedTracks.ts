import { useRecentlyPlayedTracks } from "@api/getRecentlyPlayedTrack";

export function useGetRecentlyPlayedTracks() {
  const recentlyPlayedTracks = useRecentlyPlayedTracks({ limit: 10 });
  return {
    recentlyPlayedTracks: recentlyPlayedTracks.data?.items,
    isLoadingRecentlyPlayedTracks: recentlyPlayedTracks.isLoading,
    error: recentlyPlayedTracks.error,
  };
}