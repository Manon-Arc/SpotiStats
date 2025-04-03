import { GenreCount } from "@api/type/GenreCount";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { theme } from "~/theme";

// Définir les types pour les props
type TopElementCarrouselGenresProps = {
  items: GenreCount[];
  title?: string;
  maxGenres?: number;
  isGlobal?: boolean;
};

const TopElementCarrouselGenres: React.FC<TopElementCarrouselGenresProps> = ({
  items,
  title,
  maxGenres = 8,
  isGlobal,
}) => {
  const handlePress = () => {
    console.log("handlePress");
    if (!isGlobal) {
      console.log("handlePress isGlobal");
      router.push("/(tabs)/userStat");
    }
  };
  const sortedGenres = [...items].sort((a, b) => b.percentage - a.percentage).slice(0, maxGenres);

  const maxPercentage = sortedGenres[0]?.percentage || 1;

  return (
    <Pressable
      onPress={() => handlePress()}
      style={({ pressed }) => [
        styles.pressableContainer,
        pressed && isGlobal ? { opacity: 0.9 } : {},
      ]}
      disabled={isGlobal}>
      <LinearGradient
        colors={[theme.colors.greyBright, "#adad05"]}
        style={styles.blocContainer}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: -0.5, y: -0.5 }}>
        {/* Zone supérieure pour le contenu (65%) */}
        <View style={styles.contentContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {sortedGenres.map((genre, index) => {
              const fontSize = 8 + Math.min(8, (genre.percentage / maxPercentage) * 8);
              const fontWeight = index < 3 ? "bold" : "normal";

              return (
                <View key={genre.name} style={styles.genreItem}>
                  <Text
                    style={[
                      styles.genreText,
                      {
                        fontSize,
                        fontWeight: fontWeight as "bold" | "normal",
                      },
                    ]}>
                    {genre.name}
                  </Text>
                  <Text style={styles.percentageText}>{Math.round(genre.percentage)}%</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* Zone inférieure pour le titre (35%) */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  blocContainer: {
    borderRadius: 12,
    marginRight: 16,
    width: 170,
    height: 250,
    flexDirection: "column",
  },
  contentContainer: {
    flex: 0.7,
    padding: 15,
    paddingBottom: 0,
  },
  titleContainer: {
    flex: 0.3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingHorizontal: 10,
    // backgroundColor: "red"
  },
  title: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  genreItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 4,
  },
  genreText: {
    color: "white",
    flex: 1,
  },
  percentageText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pressableContainer: {
    borderRadius: 12,
    marginRight: 16,
  },
});

export default TopElementCarrouselGenres;
