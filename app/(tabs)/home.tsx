import { useCurrentTrack } from "@api/getCurrentTrack";
import { useRecentlyPlayedTracks } from "@api/getRecentlyPlayedTrack";
import HomeScreen from "@screens/HomeScreen";
import { useEffect } from "react";

import { useStore } from "~/store/zustand";

export default function Home() {
  const setCurrentTrack = useStore((state) => state.setCurrentTrack);
  const setRecentlyPlayedTracks = useStore((state) => state.setRecentlyPlayedTracks);
  const currentTrack = useCurrentTrack(1000);
  const recentlyPlayedTracks = useRecentlyPlayedTracks({ limit: 10 });
  console.log(recentlyPlayedTracks);

  useEffect(() => {
    // Mettre à jour le morceau en cours
    if (currentTrack?.data) {
      setCurrentTrack(currentTrack.data);
    }
    if (recentlyPlayedTracks?.data) {
      setRecentlyPlayedTracks(recentlyPlayedTracks.data.items);
    }
  }, [currentTrack, recentlyPlayedTracks, setRecentlyPlayedTracks]);

  return <HomeScreen />;
}
