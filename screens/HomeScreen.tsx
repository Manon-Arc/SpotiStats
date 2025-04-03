import CurrentTrackCard from "@components/CurrentTrackCard";
import { Loader } from "@components/Loader";
import RecentlyPlayedBloc from "@components/RecentlyPlayedBloc";
import TopElementCarrousel from "@components/TopElementCarrousel";
import { useGetAllGenres } from "@hooks/useGetAllGenresUser";
import { useGetAllTopArtistsUser } from "@hooks/useGetAllTopArtistsUser";
import { useGetAllTopTracks } from "@hooks/useGetAllTopTracks";
import { useGetAllTopTracksUser } from "@hooks/useGetAllTopTracksUser";
import { useGetCurrentPlaybackContext } from "@hooks/useGetCurrentPlaybackContext";
import { useGetRecentlyPlayedTracks } from "@hooks/useGetRecentlyPlayedTracks";
import { View } from "moti";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

import { Box, theme } from "~/theme";

interface HomeScreenProps {
  isLoading: boolean;
}

export default function HomeScreen({ isLoading }: HomeScreenProps) {
  const { currentTrack } = useGetCurrentPlaybackContext();
  const { recentlyPlayedTracks } = useGetRecentlyPlayedTracks();
  const { mediumTracksUser } = useGetAllTopTracksUser();
  const { mediumArtistsUser } = useGetAllTopArtistsUser();
  const { mediumTermGenresUser } = useGetAllGenres();
  const { topTrackGlobal } = useGetAllTopTracks();

  return isLoading ? (
    <View style={styles.loaderContainer}>
      <Loader />
    </View>
  ) : (
    <ScrollView style={styles.container}>
      <Box style={styles.section}>
        <Text style={styles.sectionTitle}>En cours d'écoute</Text>
        <CurrentTrackCard currentTrackContext={currentTrack} />
      </Box>

      <Box style={styles.section}>
        <Text style={styles.sectionTitle}>
          Votre top <Text style={{ color: theme.colors.whiteDark }}>depuis 4 semaines</Text>
        </Text>
        <TopElementCarrousel
          artists={mediumArtistsUser}
          tracks={mediumTracksUser}
          genres={mediumTermGenresUser}
          isGlobal={false}
        />
      </Box>

      <Box style={styles.section}>
        <Text style={styles.sectionTitle}>Ecouté récemment</Text>
        <RecentlyPlayedBloc tracks={recentlyPlayedTracks} />
      </Box>

      <Box style={styles.section}>
        <Text style={styles.sectionTitle}>
          Le top mondial <Text style={{ color: theme.colors.whiteDark }}>aujourd'hui</Text>
        </Text>
        <TopElementCarrousel tracks={topTrackGlobal} isGlobal />
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: theme.colors.grey,
    padding: 15,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.grey,
  },
});
