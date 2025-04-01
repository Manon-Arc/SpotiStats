import { useRecentlyPlayedTracks } from "@api/getRecentlyPlayedTrack";

export function useGetRecentlyPlayedTracks(limit: number = 10) {
  const recentlyPlayedTracks = useRecentlyPlayedTracks({ limit});
  return {
    recentlyPlayedTracks: recentlyPlayedTracks.data?.items,
    isLoadingRecentlyPlayedTracks: recentlyPlayedTracks.isLoading,
    error: recentlyPlayedTracks.error,
  };
}