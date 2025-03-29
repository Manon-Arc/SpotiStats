import React from "react";
import { View, StyleSheet } from "react-native";
import RecentlyTrackCard from "./RecentlyTrackCard";
import { SpotifyTrack } from "@api/type/SpotifyTrack";

// Type pour les items de RecentlyPlayedResponse
type RecentlyPlayedItem = {
  track: SpotifyTrack;
  played_at: string;
  context?: {
    type: string;
    uri: string;
    external_urls: {
      spotify: string;
    };
  };
};

// Type correct pour les props du bloc
type RecentlyPlayedBlocProps = {
  tracks: RecentlyPlayedItem[];
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

  return (
    <View style={styles.container}>
      {tracks.map((item, index) => {
        const track = item.track;
        // Vérifier que les propriétés nécessaires existent
        if (!track?.album?.images?.[0]?.url || !track?.name || !track?.artists?.[0]?.name) {
          return null;
        }

        return (
          <RecentlyTrackCard
            key={`${track.id}-${index}`}
            ImageUrl={track.album.images[0].url}
            Titre={track.name}
            Artiste={track.artists[0].name}
            Played_ago={calculateTimeSince(item.played_at)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});