import { Animated, Dimensions, StyleSheet, Text } from "react-native";
import { theme } from "~/theme";

type AnimatedHeaderInfoProps = {
  title?: string;
  scrollY: Animated.Value;
  screenHeightValue?: number;
};

const screenHeight = Dimensions.get("window").height;
const HEADER_HEIGHT = 100;

export default function AnimatedHeaderInfo({
  title = undefined,
  scrollY,
  screenHeightValue = 0.5,
}: AnimatedHeaderInfoProps) {
  const IMAGE_HEIGHT = screenHeight * screenHeightValue;
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT * 0.3],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  return (
    <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
      <Text style={styles.headerTitle}>{title}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    backgroundColor: theme.colors.grey,
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
});
