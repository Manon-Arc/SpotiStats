import HomeScreen from "@screens/HomeScreen";
import { useGetRecentlyPlayedTracks } from "@hooks/useGetRecentlyPlayedTracks";
import { useGetCurrentPlaybackContext } from "@hooks/useGetCurrentPlaybackContext";
import { useGetAllGenres } from "@hooks/useGetAllGenres";
import { useGetAllTopArtists } from "@hooks/useGetAllTopArtists";
import { useGetAllTopTracks } from "@hooks/useGetAllTopTracks";

export default function Home() {
  const { isLoadingTrack } = useGetCurrentPlaybackContext();
  const { isLoadingRecentlyPlayedTracks } = useGetRecentlyPlayedTracks();
  const { isLoadingGenres } = useGetAllGenres();
  const { isLoadingArtists } = useGetAllTopArtists();
  const { isLoadingTracks } = useGetAllTopTracks();

  const isLoading = isLoadingTrack || isLoadingRecentlyPlayedTracks || isLoadingGenres || isLoadingArtists || isLoadingTracks;

  return <HomeScreen isLoading={isLoading} />;
}
