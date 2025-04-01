import { SpotifyTrack } from "@api/type/SpotifyTrack";
import { Loader } from "@components/Loader";
import { useGetAllTopTracks } from "@hooks/useGetAllTopTracks";
import React, { useCallback } from "react";
import { FlatList, StyleSheet, SafeAreaView, Text, View } from "react-native";

import theme from "../theme/theme";

import MusicCard from "~/components/MusicCard";

interface TopTrackScreenProps {
  isLoading: boolean;
}

export function TopTrackScreen({ isLoading: externalLoading }: TopTrackScreenProps) {
  // Récupérer les données des titres
  const { topTrackGlobal, isLoadingtopTrackGlobal: dataLoading } = useGetAllTopTracks();

  // Loading combiné
  const isLoading = externalLoading || dataLoading;

  // Fonction pour rendre un élément de liste
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

  return (
    <SafeAreaView style={styles.mainContainer}>
      {isLoading ? (
        <Loader />
      ) : !topTrackGlobal || topTrackGlobal.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aucun titre trouvé</Text>
        </View>
      ) : (
        <FlatList
          data={topTrackGlobal}
          keyExtractor={(item, index) => item?.id || index.toString()}
          renderItem={renderTrackItem}
          style={styles.list}
          contentContainerStyle={styles.container}
          removeClippedSubviews
          maxToRenderPerBatch={5}
          initialNumToRender={10}
          windowSize={5}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.grey,
  },
  container: {
    padding: 16,
    paddingBottom: 100, // Espace supplémentaire en bas pour éviter d'être masqué par la navigation
  },
  list: {
    backgroundColor: theme.colors.grey,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: "#aaa",
    fontSize: 16,
    textAlign: "center",
  },
});
