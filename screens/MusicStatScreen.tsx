import { useMemo } from "react";

import TabViewDate from "~/components/TabViewDate";
import { TabViewElementType } from "~/components/TabViewElementType";
import { useGetAllTopArtistsUser } from "~/hook/useGetAllTopArtistsUser";
import { useGetAllTopTracksUser } from "~/hook/useGetAllTopTracksUser";
import { useStore } from "~/store/zustand";
import Box from "~/theme/Box";

// Définir les props du composant
interface MusicStatScreenProps {
  isLoading: boolean;
}

export default function MusicStatScreen({ isLoading }: MusicStatScreenProps) {
  const activeTabDate = useStore((state) => state.activeTabdDate);
  const { shortTracksUser, mediumTracksUser, longTracksUser } = useGetAllTopTracksUser();
  const { shortArtistsUser, mediumArtistsUser, longArtistsUser } = useGetAllTopArtistsUser();

  const currentTracks = useMemo(() => {
    switch (activeTabDate) {
      case "short":
        return shortTracksUser;
      case "medium":
        return mediumTracksUser;
      case "long":
        return longTracksUser;
      default:
        return shortTracksUser;
    }
  }, [activeTabDate, shortTracksUser, mediumTracksUser, longTracksUser]);

  const currentArtists = useMemo(() => {
    switch (activeTabDate) {
      case "short":
        return shortArtistsUser;
      case "medium":
        return mediumArtistsUser;
      case "long":
        return longArtistsUser;
      default:
        return shortArtistsUser;
    }
  }, [activeTabDate, shortArtistsUser, mediumArtistsUser, longArtistsUser]);

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
