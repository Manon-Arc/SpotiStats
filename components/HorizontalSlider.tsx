import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";

import HorizontalSliderItem from "./HorizontalSliderItem";

import { Button } from "~/components/Button";
import { theme } from "~/theme";
import Box from "~/theme/Box";

const { width, height } = Dimensions.get("window");

type SlideType = {
  ImageURL: string;
  Titre: string;
  Desc: string;
};

type HorizontalSliderProps = {
  slides: SlideType[];
};

export default function HorizontalSlider({ slides }: HorizontalSliderProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  const scrollX = useSharedValue(0);

  // Gestion du scroll
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    scrollX.value = contentOffsetX;
    const newIndex = Math.round(contentOffsetX / width);
    setSlideIndex(newIndex);
  };

  return (
    <Box flex={1} position="relative">
      {/* Carrousel plein écran */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        style={styles.scrollView}>
        {slides.map((slide, index) => (
          <Box key={index} width={width} height={height}>
            <HorizontalSliderItem
              ActiveSlideIndex={slideIndex}
              SlideIndex={index}
              {...slide}
              ScrollX={scrollX}
            />
          </Box>
        ))}
      </ScrollView>

      {/* Dots de pagination - Positionnés en bas et centrés */}
      <Box
        position="absolute"
        bottom={150}
        left={0}
        right={0}
        flexDirection="row"
        justifyContent="center">
        {slides.map((_, index) => (
          <Box
            key={index}
            width={10}
            height={10}
            borderRadius="m_6"
            backgroundColor={index === slideIndex ? "greenDark" : "greyBright"}
            marginHorizontal="s_8"
          />
        ))}
      </Box>
      {/* Bouton "Next" affiché uniquement sur le dernier slide */}
      {slideIndex === slides.length - 1 && (
        <Box position="absolute" bottom={60} left={0} right={0} alignItems="center">
          <Button title="Commencer !" onPress={() => router.push("/login")} />
        </Box>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: theme.colors.grey,
  },
});
