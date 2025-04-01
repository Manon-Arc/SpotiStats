import React from "react";
import { View, StyleSheet, Image } from "react-native";
import RecentlyTrackCard from "./RecentlyTrackCard";
import { Box } from "~/theme";
import { Button2 } from "@components/Button2";
import { router } from "expo-router";
import { RecentlyPlayedTracks } from "@api/type/RecentlyPlayedTracks";
import { calculateTimeSince } from "~/lib/TimeConverter";


// Type correct pour les props du bloc
type RecentlyPlayedBlocProps = {
  tracks: RecentlyPlayedTracks[] | undefined;
};

export default function RecentlyPlayedBloc({ tracks }: RecentlyPlayedBlocProps) {
  // Vérifier si tracks existe et est un tableau
  if (!tracks || !Array.isArray(tracks)) {
    return <View style={styles.container1} />;
  }
  // Divise les tracks en deux groupes de 5
  const firstFiveTracks = tracks.slice(0, 5);
  const secondFiveTracks = tracks.slice(5, 10);

  return (
    <>
      <View style={styles.container1}>
        {firstFiveTracks.map((item, index) => {
          const track = item;
          // Vérifier que les propriétés nécessaires existent
          if (!track.track?.album?.images[0]?.url || !track?.track.name || !track?.track.artists[0]?.name) {

            return null;
          }

          return (

            <RecentlyTrackCard
              key={`${track.track.id}-${index}`}
              ImageUrl={track.track.album.images[0].url}
              Titre={track.track.name}
              Artiste={track.track.artists[0].name}
              Played_ago={calculateTimeSince(track.played_at)}
            />
          );
        })}
      </View>
      <View style={styles.container2}>
        <Box style={{ flexDirection: "row", gap: 8, justifyContent: "space-between" }}>
          {secondFiveTracks.map((item, index) => {
            const track = item.track;
            // Vérifier que les propriétés nécessaires existent
            if (!track?.album?.images?.[0]?.url || !track?.name || !track?.artists?.[0]?.name) {
              return null;
            }

            return (
              <Box key={`${track.id}-${index}`}>
                <Image source={{ uri: track?.album?.images[0].url }} style={styles.image} />
              </Box>
            );
          })}
        </Box>
        <Box>
          <Button2
            title="Tout voir"
            onPress={() => {
              router.push("/(tabs)/(home)/recentlyPlayed");
            }}
          />
        </Box>
      </View >
    </>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    flexDirection: "column",
  },
  container2: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 4,
  },
});