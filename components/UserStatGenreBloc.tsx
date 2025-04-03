import { GenreCount } from "@api/type/GenreCount";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Box, theme } from "~/theme";

type UserStatGenreBlocProps = {
  genres?: GenreCount[];
  maxGenres?: number;
};

export default function UserStatGenreBloc({ genres = [], maxGenres = 5 }: UserStatGenreBlocProps) {
  // Trier les genres par pourcentage et prendre les N premiers
  const topGenres = [...genres].sort((a, b) => b.percentage - a.percentage).slice(0, maxGenres);

  // Trouver le pourcentage maximum pour calculer les largeurs relatives
  return (
    <Box flex={1} padding="m_16" backgroundColor="grey">
      <Text style={styles.sectionTitle}>
        Vos genres favoris <Text style={styles.periodText}>depuis 4 semaines</Text>
      </Text>

      {/* Conteneur principal des barres de progression */}
      <View style={styles.genresContainer}>
        {topGenres.length === 0 ? (
          <Text style={styles.noDataText}>Aucune donnée disponible</Text>
        ) : (
          topGenres.map((genre, index) => {
            // Calcul de la largeur de la barre basée sur le pourcentage relatif
            return (
              <View key={genre.name} style={styles.genreItem}>
                {/* Information sur le genre */}
                <View style={styles.genreInfo}>
                  <Text style={styles.genreName}>{genre.name}</Text>
                  <Text style={styles.genrePercentage}>{Math.round(genre.percentage)}%</Text>
                </View>

                {/* Barre de progression */}
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBar,

                      // Couleurs différentes selon la position
                      index === 0
                        ? styles.progressBarFirst
                        : index === 1
                          ? styles.progressBarSecond
                          : styles.progressBarOther,
                    ]}
                  />
                </View>
              </View>
            );
          })
        )}
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.white,
    marginBottom: 16,
  },
  periodText: {
    color: theme.colors.whiteDark,
    fontSize: 20,
    fontWeight: "bold",
  },
  genresContainer: {
    marginTop: 8,
    width: "100%",
  },
  genreItem: {
    marginBottom: 12,
    width: "100%",
  },
  genreInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  genreName: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
  genrePercentage: {
    color: theme.colors.greenBright,
    fontSize: 14,
    fontWeight: "bold",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 4,
    overflow: "hidden",
    width: "100%",
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
  progressBarFirst: {
    backgroundColor: "#1DB954", // Vert Spotify
  },
  progressBarSecond: {
    backgroundColor: "#4CAF50", // Vert un peu plus clair
  },
  progressBarOther: {
    backgroundColor: "#7CB342", // Vert encore plus clair
  },
  noDataText: {
    color: theme.colors.whiteDark,
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
