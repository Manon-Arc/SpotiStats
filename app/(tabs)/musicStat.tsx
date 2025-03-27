import { useEffect } from "react";

import { useTopTracks } from "~/api/getTopMusic";
import MusicStatScreen from "~/screen/MusicStatScreen";
import { useStore } from "~/store/zustand";

export default function MusicStat() {
  const setShortTermTopTracks = useStore((state) => state.setShortTermTopTracks);
  const setMediumTermTopTracks = useStore((state) => state.setMediumTermTopTracks);
  const setLongTermTopTracks = useStore((state) => state.setLongTermTopTracks);
  const shortTermsData = useTopTracks({ limit: 50, offset: 0, time_range: "short_term" });
  const mediumTermsData = useTopTracks({ limit: 50, offset: 0, time_range: "medium_term" });
  const longTermsData = useTopTracks({ limit: 50, offset: 0, time_range: "long_term" });

  useEffect(() => {
    if (shortTermsData?.data) {
      setShortTermTopTracks(shortTermsData.data.items);
    }
    if (mediumTermsData?.data) {
      setMediumTermTopTracks(mediumTermsData.data.items);
    }
    if (longTermsData?.data) {
      setLongTermTopTracks(longTermsData.data.items);
    }
  }, [
    shortTermsData,
    setShortTermTopTracks,
    mediumTermsData,
    setMediumTermTopTracks,
    longTermsData,
    setLongTermTopTracks,
  ]);
  return <MusicStatScreen />;
}
