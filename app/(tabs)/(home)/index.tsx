import { useRecentlyPlayedTracks } from "@api/getRecentlyPlayedTrack";
import HomeScreen from "@screens/HomeScreen";
import { useGetCurrentPlaybackContext } from "~/hook/useGetCurrentPlaybackContext";

export default function Home() {
  useGetCurrentPlaybackContext();
  useRecentlyPlayedTracks({ limit: 10 });
  return <HomeScreen />;
}
