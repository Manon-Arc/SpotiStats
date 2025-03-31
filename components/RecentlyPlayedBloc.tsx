import React from "react";
import { View, StyleSheet, Image } from "react-native";
import RecentlyTrackCard from "./RecentlyTrackCard";
import { Box } from "~/theme";
import { Button2 } from "@components/Button2";
import { router } from "expo-router";
import { RecentlyPlayedTracksResponse } from "@api/type/RecentlyPlayedTracksResponse";


// Type correct pour les props du bloc
type RecentlyPlayedBlocProps = {
  tracks: RecentlyPlayedTracksResponse | undefined;
};

// Fonction pour calculer le temps écoulé depuis la lecture
const calculateTimeSince = (playedAt: string): string => {
  const playedTime = new Date(playedAt).getTime();
  const now = new Date().getTime();
  const diffInMinutes = Math.floor((now - playedTime) / (1000 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)} h`;
  } else {
    return `${Math.floor(diffInMinutes / 1440)} j`;
  }
};

export default function RecentlyPlayedBloc({ tracks }: RecentlyPlayedBlocProps) {
  // Vérifier si tracks existe et est un tableau
  if (!tracks || !Array.isArray(tracks)) {
    return <View style={styles.container} />;
  }
  // Divise les tracks en deux groupes de 5
  const firstFiveTracks = tracks.slice(0, 5);
  const secondFiveTracks = tracks.slice(5, 10);

  return (
    <>
      <View style={styles.container}>
        {firstFiveTracks.map((item, index) => {
          const track = item;
          // Vérifier que les propriétés nécessaires existent
          if (!track.album?.images?.[0]?.url || !track?.name || !track?.artists?.[0]?.name) {
            return null;
          }

          return (
            <RecentlyTrackCard
              key={`${track.id}-${index}`}
              ImageUrl={track.album.images[0].url}
              Titre={track.name}
              Artiste={track.artists[0].name}
              Played_ago={calculateTimeSince(item)}
            />
          );
        })}
      </View>
      <View style={styles.container2}>
        {secondFiveTracks.map((item, index) => {
          const track = item.items;
          // Vérifier que les propriétés nécessaires existent
          if (!track?.album?.images?.[0]?.url || !track?.name || !track?.artists?.[0]?.name) {
            return null;
          }

          return (
            <Box key={`${track.id}-${index}`}>
              <Image source={{ uri: track.album.images[0].url }} style={styles.image} />
            </Box>
          );
        })}
        <Button2
          title="Tout voir"
          onPress={() => {
            router.push("/(tabs)/(home)/recentlyPlayed");
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  container2: {
    flex: 1,
    padding: 16,
    flexDirection: "row",
    gap: 8,

  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
});