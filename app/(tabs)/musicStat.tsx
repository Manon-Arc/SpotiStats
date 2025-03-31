import MusicStatScreen from "@screens/MusicStatScreen";

import { useGetAllTopArtists } from "~/hook/useGetAllTopArtists";
import { useGetAllTopTracks } from "~/hook/useGetAllTopTracks";

export default function MusicStat() {
  const { isLoadingTracks } = useGetAllTopTracks();
  const { isLoadingArtists } = useGetAllTopArtists();

  const isLoading = isLoadingTracks || isLoadingArtists;

  return <MusicStatScreen isLoading={isLoading} />;
}
