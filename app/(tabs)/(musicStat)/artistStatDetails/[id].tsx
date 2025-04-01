import AnimatedHeaderInfo from "@components/AnimatedHeaderInfo";
import AnimatedImageInfo from "@components/AnimatedImageInfo";
import CardInfo from "@components/CardInfo";
import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import { useGetArtistInfo } from "~/hook/useGetArtistInfo";
import { Box, theme } from "~/theme";

export default function ArtistStatDetails() {
  const { id } = useLocalSearchParams();
  const idString = Array.isArray(id) ? id[0] : id;
  const { artist } = useGetArtistInfo(idString);
  const ImageUrl = artist?.images[0].url;
  const scrollY = useRef(new Animated.Value(0)).current;
  console.log(idString);
  return (
    <View style={{ backgroundColor: theme.colors.greyBright, flex: 1 }}>
      <AnimatedHeaderInfo scrollY={scrollY} title={artist?.name} />

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}>
        {/* Container pour l'image avec hauteur animée */}
        {ImageUrl && <AnimatedImageInfo uri={ImageUrl} scrollY={scrollY} />}
        <View style={styles.content}>
          <View style={styles.infoSection}>
            <Text style={styles.title}>{artist?.name}</Text>
            <Box flexDirection="row" gap="s_8" width="95%">
              <CardInfo
                titre={artist?.popularity.toString()}
                texte="Popularité allant de 0 à 100"
              />
              <CardInfo titre={artist?.followers.total.toString()} texte="Abonnés" />
            </Box>
            <Box>
              <Text style={styles.h2}>Genres</Text>
              <Box flexDirection="row" flexWrap="wrap" paddingVertical="s_8">
                {artist?.genres.map((item, index) => (
                  <View key={index} style={styles.genreTag}>
                    <Text style={styles.h3}>{item}</Text>
                  </View>
                ))}
              </Box>
            </Box>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 10,
    backgroundColor: theme.colors.grey,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: theme.colors.white,
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 10,
    color: theme.colors.white,
  },
  genreTag: {
    backgroundColor: theme.colors.greyBright,
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  h3: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.white,
  },
  imageInfo: {
    resizeMode: "contain",
    width: "30%", // Plus petit que les 40% précédents
    aspectRatio: 1, // Maintient les proportions
    borderRadius: 8,
    alignSelf: "flex-start",
    marginVertical: 8,
  },
  artistImage: {
    resizeMode: "cover",
    height: 120,
    width: 120,
    borderRadius: 60, // La moitié de la largeur/hauteur
    marginVertical: 10,
  },
  artist: {
    fontSize: 18,
    marginBottom: 4,
  },
  album: {
    fontSize: 16,
    marginBottom: 16,
  },
  infoSection: {
    marginTop: 20,
  },
});
