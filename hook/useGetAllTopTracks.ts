import { useTopTracks } from "~/api/getTopMusic";

export function useGetAllTopTracks() {
  const shortTerm = useTopTracks({ time_range: "short_term" });
  const mediumTerm = useTopTracks({ time_range: "medium_term" });
  const longTerm = useTopTracks({ time_range: "long_term" });

  return {
    shortTracks: shortTerm.data?.items || [],
    mediumTracks: mediumTerm.data?.items || [],
    longTracks: longTerm.data?.items || [],
    isLoadingTracks: shortTerm.isLoading || mediumTerm.isLoading || longTerm.isLoading,
    error: shortTerm.error || mediumTerm.error || longTerm.error,
  };
}