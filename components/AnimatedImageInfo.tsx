import { Animated, Dimensions, StyleSheet } from "react-native";

const screenHeight = Dimensions.get("window").height;

type AnimatedImageSpotifyProps = {
  uri: string;
  scrollY: Animated.Value;
  screenHeightPercentage?: number;
};

export default function AnimatedImageInfo({
  uri,
  scrollY,
  screenHeightPercentage = 0.5,
}: AnimatedImageSpotifyProps) {
  const IMAGE_HEIGHT = screenHeight * screenHeightPercentage;

  const imageHeight = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT],
    outputRange: [IMAGE_HEIGHT, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={{ height: imageHeight, overflow: "hidden" }}>
      <Animated.Image source={{ uri }} style={[styles.image, { height: IMAGE_HEIGHT }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    resizeMode: "cover",
  },
});
