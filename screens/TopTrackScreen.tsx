import { SpotifyTrack } from "@api/type/SpotifyTrack";
import Header from "@components/Header";
import { Loader } from "@components/Loader";
import { useGetAllTopTracks } from "@hooks/useGetAllTopTracks";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import theme from "../theme/theme";

import MusicCard from "~/components/MusicCard";
import { Box } from "~/theme";

interface TopTrackScreenProps {
  isLoading?: boolean;
}

export function TopTrackScreen({ isLoading: externalLoading = false }: TopTrackScreenProps) {
  // Fonction de navigation retour
  const goBack = () => {
    router.back();
  };

  // Récupérer les données des titres avec un renommage plus clair de la variable loading
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
        Id={item?.id || ""}
        Type="track"
      />
    ),
    []
  );

  // Rendu du composant vide
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Aucun titre trouvé</Text>
    </View>
  );

  return (
    <Box style={styles.mainContainer}>
      <Header title="Top Titres" onBack={goBack} />

      {isLoading ? (
        <Loader />
      ) : !topTrackGlobal || topTrackGlobal.length === 0 ? (
        renderEmptyComponent()
      ) : (
        <FlatList
          data={topTrackGlobal}
          keyExtractor={(item) => item?.id || Math.random().toString()}
          renderItem={renderTrackItem}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          removeClippedSubviews
          maxToRenderPerBatch={5}
          initialNumToRender={10}
          windowSize={5}
          ListHeaderComponent={<View style={styles.listHeader} />}
        />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.grey,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Espace supplémentaire en bas
  },
  listHeader: {
    height: 16, // Espace entre le header et le premier élément
  },
  list: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: theme.colors.white,
    fontSize: 16,
    textAlign: "center",
  },
});
