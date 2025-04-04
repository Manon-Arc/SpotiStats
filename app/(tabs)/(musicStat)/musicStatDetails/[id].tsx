import AnimatedHeaderInfo from "@components/AnimatedHeaderInfo";
import AnimatedImageInfo from "@components/AnimatedImageInfo";
import { ArtistComponentInfo } from "@components/ArtistComponent";
import { Button2 } from "@components/Button2";
import CardInfo from "@components/CardInfo";
import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { Animated, Image, Linking, StyleSheet, Text, View } from "react-native";

import { useGetMusicInfo } from "~/hook/useGetMusicInfo";
import { Box, theme } from "~/theme";

export default function MusiqueStatDetail() {
  const { id } = useLocalSearchParams();
  const idString = Array.isArray(id) ? id[0] : id;
  const { track } = useGetMusicInfo(idString);
  const ImageUrl = track?.album.images[0].url;
  const scrollY = useRef(new Animated.Value(0)).current;
  const formatDuration = (ms: number | undefined): string => {
    const duration = ms || 0;
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.greyBright }}>
      {/* Header fixe qui apparaît lors du défilement */}
      <AnimatedHeaderInfo scrollY={scrollY} title={track?.name} />

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}>
        {/* Container pour l'image avec hauteur animée */}
        {ImageUrl && <AnimatedImageInfo uri={ImageUrl} scrollY={scrollY} />}

        {/* Contenu à faire défiler */}
        <View style={styles.content}>
          {/* Autres informations sur la piste */}
          <View style={styles.infoSection}>
            <Text style={styles.title}>{track?.name}</Text>
            <Box flexDirection="row" gap="s_8" width="95%">
              <CardInfo titre={formatDuration(track?.duration_ms)} texte="Durée" />
              <CardInfo titre={track?.popularity.toString()} texte="Popularité allant de 0 à 100" />
            </Box>
            <Box paddingTop="s_8">
              <Text style={styles.h2}>Album</Text>
              <Image source={{ uri: ImageUrl }} style={styles.imageInfo} resizeMode="cover" />
              <Text style={styles.h3}>{track?.album.name}</Text>
            </Box>
            <Box paddingTop="s_8">
              <Text style={styles.h2}>Artistes</Text>
              <Box paddingTop="s_8" flexDirection="row" gap="m_16">
                {track?.artists.map((artist) => (
                  <ArtistComponentInfo key={artist.id} artistId={artist.id} />
                ))}
              </Box>
            </Box>
            {track?.uri && (
              <Box marginBottom="m_16">
                <Text style={styles.h2}>Lien Spotify</Text>
                <Button2
                  title="Ouvrir dans Spotify"
                  style={{ marginTop: "3%" }}
                  onPress={() => {
                    Linking.openURL(track.uri);
                  }}
                  iconName="social-spotify"
                  secondIconName="external-link"
                />
              </Box>
            )}
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
  h3: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: theme.colors.white,
    marginTop: 10,
  },
  imageInfo: {
    resizeMode: "contain",
    width: "30%",
    aspectRatio: 1,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginVertical: 8,
  },
  artistImage: {
    resizeMode: "cover",
    height: 120,
    width: 120,
    borderRadius: 60,
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
