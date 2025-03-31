import HomeScreen from "@screens/HomeScreen";
import { useGetRecentlyPlayedTracks } from "@hooks/useGetRecentlyPlayedTracks";
import { useGetCurrentPlaybackContext } from "@hooks/useGetCurrentPlaybackContext";

export default function Home() {
  const { isLoadingTrack } = useGetCurrentPlaybackContext();
  const { isLoadingRecentlyPlayedTracks } = useGetRecentlyPlayedTracks();

  const isLoading = isLoadingTrack || isLoadingRecentlyPlayedTracks;

  return <HomeScreen isLoading={isLoading} />;
}
