import { SpotifyArtist } from "@api/type/SpotifyArtist";
import { SpotifyTrack } from "@api/type/SpotifyTrack";
import { useCallback, useState } from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

import { Loader } from "./Loader";
import theme from "../theme/theme";

import MusicCard from "~/components/MusicCard";

interface TabViewElementTypeProps {
  currentTracksData: SpotifyTrack[];
  currentArtistsData: SpotifyArtist[];
  isLoading: boolean;
}

export function TabViewElementType({
  currentTracksData,
  currentArtistsData,
  isLoading,
}: TabViewElementTypeProps) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "tracks", title: "Titres" },
    { key: "artists", title: "Artistes" },
  ]);

  const renderTrackItem = useCallback(
    ({ item, index: idx }: { item: SpotifyTrack; index: number }) => (
      <MusicCard
        ImageUrl={item?.album?.images?.[0]?.url || ""}
        Titre={item?.name || ""}
        Artiste={item?.artists?.[0]?.name || ""}
        Placement={idx + 1}
        Id={item.id || ""}
        Type="track"
      />
    ),
    []
  );

  // Fonction de rendu pour les artistes
  const renderArtistItem = useCallback(
    ({ item, index: idx }: { item: SpotifyArtist; index: number }) => (
      <MusicCard
        ImageUrl={item?.images?.[0]?.url || ""}
        Titre={item?.name || ""}
        Artiste={(item?.genres || []).slice(0, 2).join(", ")}
        Placement={idx + 1}
        Id={item?.id || ""}
        Type="artist"
      />
    ),
    []
  );

  // Composants pour les différentes scènes du TabView
  const TracksRoute = useCallback(
    () =>
      isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={currentTracksData}
          keyExtractor={(item, index) => item?.id || index.toString()}
          renderItem={renderTrackItem}
          style={{ backgroundColor: theme.colors.grey, flex: 1 }}
          contentContainerStyle={styles.container}
          removeClippedSubviews
          maxToRenderPerBatch={5}
          initialNumToRender={10}
          windowSize={5}
        />
      ),
    [isLoading, currentTracksData, renderTrackItem]
  );

  const ArtistsRoute = useCallback(
    () =>
      isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={currentArtistsData}
          keyExtractor={(item, index) => item?.id || index.toString()}
          renderItem={renderArtistItem}
          style={{ backgroundColor: theme.colors.grey, flex: 1 }}
          contentContainerStyle={styles.container}
          removeClippedSubviews
          maxToRenderPerBatch={5}
          initialNumToRender={10}
          windowSize={5}
        />
      ),
    [isLoading, currentArtistsData, renderArtistItem]
  );

  const renderScene = SceneMap({
    tracks: TracksRoute,
    artists: ArtistsRoute,
  });

  // Style personnalisé pour la barre d'onglets
  const renderTabBar = useCallback(
    (props: any) => (
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        style={styles.tabBar}
        labelStyle={styles.tabLabel}
        activeColor="#fff"
        inactiveColor="#aaa"
      />
    ),
    []
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get("window").width }}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  tabBar: {
    backgroundColor: "#121212",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  indicator: {
    backgroundColor: "#1DB954",
    height: 2,
  },
  tabLabel: {
    fontWeight: "bold",
    textTransform: "none",
  },
});
