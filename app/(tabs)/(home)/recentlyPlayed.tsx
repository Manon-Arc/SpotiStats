import { useGetRecentlyPlayedTracks } from "@hooks/useGetRecentlyPlayedTracks";
import RecentlyPlayedScreen from "@screens/RecentlyPlayedScreen";

export default function RecentlyPlayed() {
  const { isLoadingRecentlyPlayedTracks } = useGetRecentlyPlayedTracks(50);

  return <RecentlyPlayedScreen isLoading={isLoadingRecentlyPlayedTracks} />;
}
