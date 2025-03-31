import { useEffect } from "react";
import { useRecentlyPlayedTracks } from "@api/getRecentlyPlayedTrack";
import { useStore } from "~/store/zustand";
import RecentlyPlayedScreen from "@screens/RecentlyPlayedScreen";

export default function recentlyPlayed() {
  // const setRecentlyPlayedTracks = useStore((state) => state.setRecentlyPlayedTracks)
  // const recentlyPlayedTracks = useRecentlyPlayedTracks({ limit: 10 })
  // console.log(recentlyPlayedTracks)

  // useEffect(() => {

  //   if (recentlyPlayedTracks?.data) {
  //     setRecentlyPlayedTracks(recentlyPlayedTracks.data.items)
  //   }
  // }, [
  //   recentlyPlayedTracks,
  //   setRecentlyPlayedTracks
  // ]);

  return <RecentlyPlayedScreen />;
}