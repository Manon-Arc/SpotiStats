import { useGetAllTopArtists } from "~/hook/useGetAllTopArtists";
import { useGetAllTopTracks } from "~/hook/useGetAllTopTracks";
import MusicStatScreen from "~/screen/MusicStatScreen";

export default function MusicStat() {
  const { isLoadingTracks } = useGetAllTopTracks();
  const { isLoadingArtists } = useGetAllTopArtists();

  const isLoading = isLoadingTracks || isLoadingArtists;

  return <MusicStatScreen isLoading={isLoading} />;
}
