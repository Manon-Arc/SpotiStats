import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

import { Box, theme } from "~/theme";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

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
  screenHeightValue = 0.6,
}: AnimatedHeaderInfoProps) {
  const IMAGE_HEIGHT = screenHeight * screenHeightValue;
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT * 0.3],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  return (
    <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
      <Box style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}>
          <AntDesign name="arrowleft" style={styles.arrowIcon} size={20} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <Box width={20} />
      </Box>
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
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    width: "100%",
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: theme.colors.white,
  },
  arrowIcon: {
    color: theme.colors.white,
  },
});
