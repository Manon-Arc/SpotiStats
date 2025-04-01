import MusicStatScreen from "@screens/MusicStatScreen";

import { useGetAllTopArtists } from "~/hook/useGetAllTopArtistsUser";
import { useGetAllTopTracks } from "~/hook/useGetAllTopTracksUser";

export default function MusicStat() {
  const { isLoadingTracks } = useGetAllTopTracks();
  const { isLoadingArtists } = useGetAllTopArtists();

  const isLoading = isLoadingTracks || isLoadingArtists;

  return <MusicStatScreen isLoading={isLoading} />;
}
