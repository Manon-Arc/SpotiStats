import HomeScreen from "@screens/HomeScreen";
import { useGetRecentlyPlayedTracks } from "@hooks/useGetRecentlyPlayedTracks";
import { useGetCurrentPlaybackContext } from "@hooks/useGetCurrentPlaybackContext";
import { useGetAllGenres } from "@hooks/useGetAllGenresUser";
import { useGetAllTopArtistsUser } from "@hooks/useGetAllTopArtistsUser";
import { useGetAllTopTracksUser } from "@hooks/useGetAllTopTracksUser";

export default function Home() {
  const { isLoadingTrack } = useGetCurrentPlaybackContext();
  const { isLoadingRecentlyPlayedTracks } = useGetRecentlyPlayedTracks();
  const { isLoadingGenres } = useGetAllGenres();
  const { isLoadingArtists } = useGetAllTopArtistsUser();
  const { isLoadingTracks } = useGetAllTopTracksUser();

  const isLoading = isLoadingTrack || isLoadingRecentlyPlayedTracks || isLoadingGenres || isLoadingArtists || isLoadingTracks;

  return <HomeScreen isLoading={isLoading} />;
}
