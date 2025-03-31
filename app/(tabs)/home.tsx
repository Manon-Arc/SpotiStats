import { useCurrentTrack } from "@api/getCurrentTrack";
import { useRecentlyPlayedTracks } from "@api/getRecentlyPlayedTrack";
import HomeScreen from "@screens/HomeScreen";
import { useEffect } from "react";

import { useStore } from "~/store/zustand";
import { useGetCurrentPlaybackContext } from "~/hook/useGetCurrentPlaybackContext";

export default function Home() {
  useGetCurrentPlaybackContext();
  useRecentlyPlayedTracks({ limit: 10 });
  return <HomeScreen />;
}
