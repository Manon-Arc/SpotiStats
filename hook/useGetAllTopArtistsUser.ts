import { useTopArtistsUser } from "~/api/getTopArtistUser";

export function useGetAllTopArtists() {
  const shortTerm = useTopArtistsUser({ time_range: "short_term" });
  const mediumTerm = useTopArtistsUser({ time_range: "medium_term" });
  const longTerm = useTopArtistsUser({ time_range: "long_term" });

  return {
    shortArtistsUser: shortTerm.data?.items || [],
    mediumArtistsUser: mediumTerm.data?.items || [],
    longArtistsUser: longTerm.data?.items || [],
    isLoadingArtists: shortTerm.isLoading || mediumTerm.isLoading || longTerm.isLoading,
    error: shortTerm.error || mediumTerm.error || longTerm.error,
  };
}