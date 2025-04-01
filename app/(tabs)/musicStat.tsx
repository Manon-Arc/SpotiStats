import MusicStatScreen from "@screens/MusicStatScreen";

import { useGetAllTopArtistsUser } from "~/hook/useGetAllTopArtistsUser";
import { useGetAllTopTracksUser } from "~/hook/useGetAllTopTracksUser";

export default function MusicStat() {
  const { isLoadingTracks } = useGetAllTopTracksUser();
  const { isLoadingArtists } = useGetAllTopArtistsUser();

  const isLoading = isLoadingTracks || isLoadingArtists;

  return <MusicStatScreen isLoading={isLoading} />;
}
