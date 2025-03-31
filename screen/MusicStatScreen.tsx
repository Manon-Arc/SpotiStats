import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import { SpotifyArtistFull, useTopArtists } from "~/api/getTopArtist";
import { SpotifyTrack, useTopTracks } from "~/api/getTopMusic";
import MusicCard from "~/components/MusicCard";
import TabViewDate from "~/components/TabViewDate";
import { TabViewElementType } from "~/components/TabViewElementType";
import { useGetAllTopArtists } from "~/hook/useGetAllTopArtists";
import { useGetAllTopTracks } from "~/hook/useGetAllTopTracks";
import { useStore } from "~/store/zustand";
import { Text } from "~/theme";
import Box from "~/theme/Box";
import theme from "~/theme/theme";

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