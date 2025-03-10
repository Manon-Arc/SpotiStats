import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Dimensions, Image, StyleSheet } from "react-native";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";

import { theme } from "~/theme";
import AnimatedBox from "~/theme/AnimatedBox";
import Box from "~/theme/Box";
import Text from "~/theme/Text";

type HorizontalProps = {
  ImageURL: any; // Supports `require()` and URLs
  Titre: string;
  Desc: string;
  ScrollX: Animated.SharedValue<number>;
  ActiveSlideIndex: number;
  SlideIndex: number;
};

const { width, height } = Dimensions.get("window");

export default function HorizontalSliderItem({
  ImageURL,
  Titre,
  Desc,
  ActiveSlideIndex,
  SlideIndex,
}: HorizontalProps) {
  const isActive = ActiveSlideIndex === SlideIndex;

  return (
    <>
      <StatusBar style="light" />
      <Stack.Screen options={{ headerShown: false }} />

      <Box width={width} alignItems="center" justifyContent="center" gap="m_16">
        <LinearGradient colors={["transparent", theme.colors.grey]} style={styles.background} />

        <Image
          source={typeof ImageURL === "string" ? { uri: ImageURL } : ImageURL}
          style={{ width, height: height / 1.5 }}
          resizeMode="cover"
        />

        {isActive ? (
          <Box alignItems="center" gap="s_8">
            <AnimatedBox entering={FadeInDown.delay(500).springify().damping(15)} exiting={FadeOut}>
              <Text variant="title" textAlign="center" color="white">
                {Titre}
              </Text>
            </AnimatedBox>
            <AnimatedBox
              entering={FadeInDown.delay(1000).springify().damping(15)}
              exiting={FadeOut}>
              <Text variant="body" textAlign="center" color="whiteDark">
                {Desc}
              </Text>
            </AnimatedBox>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height: height / 1.5,
    zIndex: 10,
  },
});
