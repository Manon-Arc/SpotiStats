import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Box } from "~/theme";

type MusicCardProps = {
  ImageUrl: string | ImageSourcePropType;
  Titre: string;
  Artiste: string;
  Placement: number;
  Id: string;
  Type?: "track" | "artist";
};

export default function MusicCard({
  ImageUrl,
  Titre,
  Artiste,
  Placement,
  Id,
  Type,
}: MusicCardProps) {
  const imageSource = typeof ImageUrl === "string" ? { uri: ImageUrl } : ImageUrl;
  const redirection = () => {
    if (Type === "track") {
      router.push({
        pathname: `/(tabs)/(musicStat)/musicStatDetails/[id]`,
        params: { id: Id },
      });
    } else {
      router.push({
        pathname: `/(tabs)/(musicStat)/artistStatDetails/[id]`,
        params: { id: Id },
      });
    }
  };

  return (
    <Box flexDirection="row" flex={1} alignItems="center">
      <View style={styles.placementContainer}>
        <Text style={styles.placement}>#{Placement}</Text>
      </View>
      <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={() => redirection()}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {Titre}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {Artiste}
          </Text>
        </View>
        <View>
          <Entypo name="chevron-right" size={24} color="grey" />
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
  placementContainer: {
    width: 40,
    alignItems: "center",
    marginRight: 10,
  },
  placement: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
});
