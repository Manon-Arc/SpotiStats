import { useTopTracksUser } from "~/api/getTopMusicUser";

export function useGetAllTopTracksUser() {
  const shortTerm = useTopTracksUser({ time_range: "short_term" });
  const mediumTerm = useTopTracksUser({ time_range: "medium_term" });
  const longTerm = useTopTracksUser({ time_range: "long_term" });

  return {
    shortTracksUser: shortTerm.data?.items || [],
    mediumTracksUser: mediumTerm.data?.items || [],
    longTracksUser: longTerm.data?.items || [],
    isLoadingTracks: shortTerm.isLoading || mediumTerm.isLoading || longTerm.isLoading,
    error: shortTerm.error || mediumTerm.error || longTerm.error,
  };
}