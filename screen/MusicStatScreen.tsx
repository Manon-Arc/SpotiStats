import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import { SpotifyArtistFull } from "~/api/getTopArtist";
import { SpotifyTrack } from "~/api/getTopMusic";
import MusicCard from "~/components/MusicCard";
import { useStore } from "~/store/zustand";
import { Text } from "~/theme";
import Box from "~/theme/Box";
import theme from "~/theme/theme";

// Définir les props du composant
interface MusicStatScreenProps {
  isLoading: boolean;
}

export default function MusicStatScreen({ isLoading }: MusicStatScreenProps) {
  // États locaux
  const [activeTab, setActiveTab] = useState("short");

  // Configuration du TabView
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "tracks", title: "Titres" },
    { key: "artists", title: "Artistes" },
  ]);

  // Récupération des données du store de manière sélective
  const shortTermTopTracks = useStore((state) => state.shortTermTopTracks || []);
  const mediumTermTopTracks = useStore((state) => state.mediumTermTopTracks || []);
  const longTermTopTracks = useStore((state) => state.longTermTopTracks || []);
  const shortTermTopArtists = useStore((state) => state.shortTermTopArtists || []);
  const mediumTermTopArtists = useStore((state) => state.mediumTermTopArtists || []);
  const longTermTopArtists = useStore((state) => state.longTermTopArtists || []);

  // Sélection des données actuelles selon l'onglet
  const currentTracks = useMemo(() => {
    switch (activeTab) {
      case "short":
        return shortTermTopTracks;
      case "medium":
        return mediumTermTopTracks;
      case "long":
        return longTermTopTracks;
      default:
        return shortTermTopTracks;
    }
  }, [activeTab, shortTermTopTracks, mediumTermTopTracks, longTermTopTracks]);

  const currentArtists = useMemo(() => {
    switch (activeTab) {
      case "short":
        return shortTermTopArtists;
      case "medium":
        return mediumTermTopArtists;
      case "long":
        return longTermTopArtists;
      default:
        return shortTermTopArtists;
    }
  }, [activeTab, shortTermTopArtists, mediumTermTopArtists, longTermTopArtists]);

  // Fonction de rendu pour les pistes
  const renderTrackItem = useCallback(
    ({ item, index: idx }: { item: SpotifyTrack; index: number }) => (
      <MusicCard
        ImageUrl={item?.album?.images?.[0]?.url || ""}
        Titre={item?.name || ""}
        Artiste={item?.artists?.[0]?.name || ""}
        Placement={idx + 1}
      />
    ),
    []
  );

  // Fonction de rendu pour les artistes
  const renderArtistItem = useCallback(
    ({ item, index: idx }: { item: SpotifyArtistFull; index: number }) => (
      <MusicCard
        ImageUrl={item?.images?.[0]?.url || ""}
        Titre={item?.name || ""}
        Artiste={(item?.genres || []).slice(0, 2).join(", ")}
        Placement={idx + 1}
      />
    ),
    []
  );

  // Composants pour les différentes scènes du TabView
  const TracksRoute = useCallback(
    () =>
      isLoading ? (
        <Box style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1DB954" />
          <Text style={styles.loadingText}>Chargement en cours...</Text>
        </Box>
      ) : (
        <FlatList
          data={currentTracks}
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
    [isLoading, currentTracks, renderTrackItem]
  );

  const ArtistsRoute = useCallback(
    () =>
      isLoading ? (
        <Box style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1DB954" />
          <Text style={styles.loadingText}>Chargement en cours...</Text>
        </Box>
      ) : (
        <FlatList
          data={currentArtists}
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
    [isLoading, currentArtists, renderArtistItem]
  );

  const renderScene = SceneMap({
    tracks: TracksRoute,
    artists: ArtistsRoute,
  });

  // Style personnalisé pour la barre d'onglets
  const renderTabBar = useCallback(
    (props) => (
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
    <Box style={{ flex: 1, backgroundColor: "black" }}>
      {/* TabView pour le sélecteur de type en haut */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={renderTabBar}
      />

      {/* Tabs de période en bas de l'écran */}
      <Box style={styles.periodTabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "short" && styles.activeTab]}
          onPress={() => setActiveTab("short")}>
          <Text style={[styles.tabText, activeTab === "short" && styles.activeTabText]}>
            4 semaines
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "medium" && styles.activeTab]}
          onPress={() => setActiveTab("medium")}>
          <Text style={[styles.tabText, activeTab === "medium" && styles.activeTabText]}>
            6 mois
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "long" && styles.activeTab]}
          onPress={() => setActiveTab("long")}>
          <Text style={[styles.tabText, activeTab === "long" && styles.activeTabText]}>1 an</Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.grey,
  },
  loadingText: {
    color: "white",
    marginTop: 10,
  },
  // Styles pour le TabView
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
  // Styles pour la barre inférieure
  periodTabBar: {
    flexDirection: "row",
    backgroundColor: "#121212",
    height: 50,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: "#1DB954",
  },
  tabText: {
    color: "#aaa",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
