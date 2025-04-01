import { Animated, StyleSheet, View, Text, Dimensions } from "react-native";
import { useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import { useGetMusicInfo } from "~/hook/useGetMusicInfo";
import { theme } from "~/theme";

const screenHeight = Dimensions.get("window").height;
const HEADER_HEIGHT = 100;
const IMAGE_HEIGHT = screenHeight * 0.5;

export default function MusiqueStatDetail() {
  const { id } = useLocalSearchParams();
  const idString = Array.isArray(id) ? id[0] : id;
  const { track } = useGetMusicInfo(idString);
  const ImageUrl = track?.album.images[0].url;
  const imageSource = typeof ImageUrl === "string" ? { uri: ImageUrl } : ImageUrl;

  const scrollY = useRef(new Animated.Value(0)).current;

  // Animations calculées
  const imageHeight = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT],
    outputRange: [IMAGE_HEIGHT, 0],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT * 0.8],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* Header fixe qui apparaît lors du défilement */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <Text style={styles.headerTitle}>{track?.name}</Text>
      </Animated.View>

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}>
        {/* Container pour l'image avec hauteur animée */}
        <Animated.View style={{ height: imageHeight, overflow: "hidden" }}>
          <Animated.Image source={imageSource} style={styles.image} />
        </Animated.View>

        {/* Contenu à faire défiler */}
        <View style={styles.content}>
          <Text style={styles.title}>{track?.name}</Text>
          <Text style={styles.artist}>{track?.artists?.map((a) => a.name).join(", ")}</Text>
          <Text style={styles.album}>{track?.album?.name}</Text>

          {/* Autres informations sur la piste */}
          <View style={styles.infoSection}>
            <Text>
              Durée: {Math.floor((track?.duration_ms || 0) / 60000)}:
              {(((track?.duration_ms || 0) % 60000) / 1000).toFixed(0).padStart(2, "0")}
            </Text>
            <Text>Popularité: {track?.popularity}</Text>
            {/* Ajoutez d'autres informations ici */}

            {/* Contenu supplémentaire pour permettre le défilement */}
            <View style={{ height: 800 }}>
              <Text style={styles.paragraph}>Informations détaillées sur la piste...</Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    backgroundColor: theme.colors.black,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: theme.colors.white,
  },
  image: {
    width: "100%",
    height: screenHeight * 0.5,
    resizeMode: "cover",
  },
  content: {
    padding: 20,
    backgroundColor: theme.colors.greyBright,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
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
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
});
