import { useTopArtists } from "@api/getTopArtist";

export function useGetAllTopArtists() {
  const shortTerm = useTopArtists({ time_range: "short_term" });
  const mediumTerm = useTopArtists({ time_range: "medium_term" });
  const longTerm = useTopArtists({ time_range: "long_term" });

  return {
    shortArtistsUser: shortTerm.data?.items || [],
    mediumArtistsUser: mediumTerm.data?.items || [],
    longArtistsUser: longTerm.data?.items || [],
    isLoadingArtists: shortTerm.isLoading || mediumTerm.isLoading || longTerm.isLoading,
    error: shortTerm.error || mediumTerm.error || longTerm.error,
  };
}