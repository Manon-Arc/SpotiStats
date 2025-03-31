import { useMemo } from "react";

import TabViewDate from "~/components/TabViewDate";
import { TabViewElementType } from "~/components/TabViewElementType";
import { useGetAllTopArtists } from "~/hook/useGetAllTopArtists";
import { useGetAllTopTracks } from "~/hook/useGetAllTopTracks";
import { useStore } from "~/store/zustand";
import Box from "~/theme/Box";

// Définir les props du composant
interface MusicStatScreenProps {
  isLoading: boolean;
}

export default function MusicStatScreen({ isLoading }: MusicStatScreenProps) {
  const activeTabDate = useStore((state) => state.activeTabdDate);
  const { shortTracks, mediumTracks, longTracks } = useGetAllTopTracks();
  const { shortArtists, mediumArtists, longArtists } = useGetAllTopArtists();

  const currentTracks = useMemo(() => {
    switch (activeTabDate) {
      case "short":
        return shortTracks;
      case "medium":
        return mediumTracks;
      case "long":
        return longTracks;
      default:
        return shortTracks;
    }
  }, [activeTabDate, shortTracks, mediumTracks, longTracks]);

  const currentArtists = useMemo(() => {
    switch (activeTabDate) {
      case "short":
        return shortArtists;
      case "medium":
        return mediumArtists;
      case "long":
        return longArtists;
      default:
        return shortArtists;
    }
  }, [activeTabDate, shortArtists, mediumArtists, longArtists]);

  return (
    <Box style={{ flex: 1, backgroundColor: "black" }}>
      <TabViewElementType
        currentTracksData={currentTracks}
        currentArtistsData={currentArtists}
        isLoading={isLoading}
      />

      <TabViewDate />
    </Box>
  );
}