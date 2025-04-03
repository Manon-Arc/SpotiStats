import { useTopTracks } from "@api/getTopMusic";

export function useGetAllTopTracks() {
  const topTrackGlobal = useTopTracks();

  return {
    topTrackGlobal: topTrackGlobal.data?.items || [],
    isLoadingtopTrackGlobal: topTrackGlobal.isLoading,
    error: topTrackGlobal.error,
  };
}
