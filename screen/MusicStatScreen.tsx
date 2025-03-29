import { useCallback, useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import MusicCard from "~/components/MusicCard";
import { useStore } from "~/store/zustand";
import { Text } from "~/theme";
import Box from "~/theme/Box";
Dimensions.get("window").width;
interface Track {
  id: string;
  name: string;
  album: {
    images: {
      url: string;
    }[];
  };
  artists: {
    name: string;
  }[];
}

export default function MusicStatScreen() {
  const shortTermTracks = useStore((state) => state.shortTermTopTracks);
  const mediumTermTracks = useStore((state) => state.mediumTermTopTracks);
  const longTermTracks = useStore((state) => state.longTermTopTracks);

  const [activeTab, setActiveTab] = useState("short");

  const renderTrackList = useCallback(
    (tracks: Track[]) => (
      <FlatList
        data={tracks}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item, index }) => (
          <MusicCard
            ImageUrl={item.album.images[0].url}
            Titre={item.name}
            Artiste={item.artists[0].name}
            Placement={index + 1}
          />
        )}
        style={{ backgroundColor: "black", flex: 1 }}
        contentContainerStyle={styles.container}
        removeClippedSubviews
        maxToRenderPerBatch={5}
        initialNumToRender={10}
        windowSize={5}
      />
    ),
    []
  );

  // Obtenir les pistes en fonction de l'onglet actif
  const currentTracks = useMemo(() => {
    switch (activeTab) {
      case "short":
        return shortTermTracks;
      case "medium":
        return mediumTermTracks;
      case "long":
        return longTermTracks;
      default:
        return shortTermTracks;
    }
  }, [activeTab, shortTermTracks, mediumTermTracks, longTermTracks]);

  return (
    <Box style={{ flex: 1, backgroundColor: "black" }}>
      <Box style={{ flex: 1 }}>{renderTrackList(currentTracks)}</Box>

      {/* Tabs en bas de l'écran */}
      <Box style={styles.tabBar}>
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
  tabBar: {
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
