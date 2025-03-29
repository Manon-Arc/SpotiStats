import React from "react";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";
import { Box } from "~/theme"; // Assurez-vous que ce chemin d'importation est correct

type RecentlyTrackCardProps = {
  ImageUrl: string | ImageSourcePropType;
  Titre: string;
  Artiste: string;
  Played_ago: string; // Changé en string pour afficher "5 min", "2 h", etc.
};

export default function RecentlyTrackCard({ ImageUrl, Titre, Artiste, Played_ago }: RecentlyTrackCardProps) {
  const imageSource = typeof ImageUrl === "string" ? { uri: ImageUrl } : ImageUrl;

  return (
    <Box flexDirection="row" flex={1} alignItems="center">
      <TouchableOpacity style={styles.container} activeOpacity={0.7}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {Titre}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {Artiste}
          </Text>
        </View>
        <View style={styles.timeContainer}>
          <Entypo name="back-in-time" size={20} color="grey" />
          <Text style={styles.timeText}>{Played_ago}</Text>
        </View>
      </TouchableOpacity>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    marginVertical: 8,
    padding: 12,
    flex: 1,
    overflow: "hidden",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  artist: {
    color: "#B3B3B3",
    fontSize: 14,
  },
  timeContainer: {
    alignItems: "center",
    marginLeft: 8,
  },
  timeText: {
    color: "#B3B3B3",
    fontSize: 12,
    marginTop: 2,
  },
});