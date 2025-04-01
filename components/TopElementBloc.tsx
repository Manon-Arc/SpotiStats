import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "~/theme";
import { router } from "expo-router";

// Définir les types pour les props
type TopElementBlocProps = {
    title: string;
    images: string[] | undefined;
    type: "artists" | "tracks" | "albums";
    isGlobal?: boolean;
};

const TopElementBloc: React.FC<TopElementBlocProps> = ({ title, images = [], type, isGlobal }) => {
    // Définir les couleurs du gradient en fonction du type
    const getGradientColors = () => {
        switch (type) {
            case "artists":
                return [theme.colors.greyBright, "#007000"] as const; // Vert
            case "tracks":
                return [theme.colors.greyBright, "#7d0101"] as const; // Rouge
            default:
                return [theme.colors.greyBright, "#333333"] as const; // Couleur par défaut
        }
    };

    // S'assurer que images est un tableau (protection contre undefined)
    const safeImages = images || [];

    // Fonction pour obtenir une URL d'image sécurisée avec un fallback
    const getImageUrl = (index: number, fallback: string = "https://via.placeholder.com/80") => {
        return safeImages.length > index && safeImages[index] ? safeImages[index] : fallback;
    };

    const handlePress = () => {
        console.log("handlePress");
        if (!isGlobal) {
            router.push("/(tabs)/(musicStat)/musicStat");
        } else {
            console.log("handlePress isGlobal");
            router.push("/(tabs)/(home)/topMonde");
        }
    };

    return (
        <Pressable
            onPress={() => handlePress()}
            style={({ pressed }) => [
                styles.pressableContainer,
                pressed && isGlobal ? { opacity: 0.9 } : {}
            ]}
        >
            <LinearGradient
                colors={getGradientColors()}
                style={styles.blocContainer}
                start={{ x: 0.5, y: 0.5 }}
                end={{ x: -0.5, y: -0.5 }}
            >
                <View style={styles.contentContainer}>
                    <View style={[
                        styles.imageContainer,
                        type === "artists" && styles.artistImageContainer,
                    ]}>
                        {type === "artists" ? (
                            // Nouvelle disposition des artistes sur 3 lignes
                            <View style={styles.artistsGrid}>
                                {/* Première ligne: image centrale */}
                                <View style={styles.artistsRow1}>
                                    <Image
                                        source={{ uri: getImageUrl(0) }}
                                        style={styles.artistLargeImage}
                                    />
                                </View>

                                {/* Deuxième ligne: 2 images non alignées en hauteur */}
                                <View style={styles.artistsRow2}>
                                    <View style={styles.artistRow2Left}>
                                        <Image
                                            source={{ uri: getImageUrl(1, "https://via.placeholder.com/45") }}
                                            style={styles.artistMediumImage}
                                        />
                                    </View>
                                    <View style={styles.artistRow2Right}>
                                        <Image
                                            source={{ uri: getImageUrl(2, "https://via.placeholder.com/40") }}
                                            style={styles.artistSmallImage}
                                        />
                                    </View>
                                </View>

                                {/* Troisième ligne: image vers la gauche */}
                                <View style={styles.artistsRow3}>
                                    <Image
                                        source={{ uri: getImageUrl(3, "https://via.placeholder.com/35") }}
                                        style={styles.artistXSmallImage}
                                    />
                                </View>
                            </View>
                        ) : (
                            // Disposition en grille 2x2 pour les tracks
                            <View style={styles.tracksGrid}>
                                <View style={styles.tracksRow}>
                                    {/* Image principale (plus grande) */}
                                    <Image
                                        source={{ uri: getImageUrl(0) }}
                                        style={styles.trackLargeImage}
                                    />
                                    {/* Deuxième image (taille moyenne-grande) */}
                                    <Image
                                        source={{ uri: getImageUrl(1, "https://via.placeholder.com/50") }}
                                        style={styles.trackMediumLargeImage}
                                    />
                                </View>
                                <View style={styles.tracksRow2}>
                                    {/* Troisième image (taille moyenne) */}
                                    <Image
                                        source={{ uri: getImageUrl(2, "https://via.placeholder.com/45") }}
                                        style={styles.trackMediumImage}
                                    />
                                    {/* Quatrième image (plus petite) */}
                                    <Image
                                        source={{ uri: getImageUrl(3, "https://via.placeholder.com/40") }}
                                        style={styles.trackSmallImage}
                                    />
                                </View>
                            </View>
                        )}
                    </View>
                </View>

                {/* Zone inférieure pour le titre */}
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
        flexDirection: 'column',
    },
    contentContainer: {
        flex: 0.65,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        paddingTop: 45,
    },
    titleContainer: {
        flex: 0.35,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        paddingHorizontal: 10,
        // backgroundColor: "red"
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    // Styles pour les artistes (nouvelle disposition)
    artistImageContainer: {
        width: '100%',
        height: '100%',
    },
    artistsGrid: {
        width: '100%',
        height: '100%',
        flexDirection: "column",
        justifyContent: "center",
    },
    // Première ligne: image au centre
    artistsRow1: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "center",
    },
    artistLargeImage: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.3)",
    },
    // Deuxième ligne: 2 images non alignées
    artistsRow2: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    artistRow2Left: {
        paddingTop: 10,
    },
    artistRow2Right: {
        paddingBottom: 10,
    },
    artistMediumImage: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.25)",
    },
    artistSmallImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
    },
    // Troisième ligne: image vers la gauche
    artistsRow3: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingRight: 45,
        alignItems: "center",
    },
    artistRow3Spacer: {
        flex: 1,
    },
    artistXSmallImage: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.15)",
    },
    // Styles existants pour les artistes (conservés pour référence)
    artistMainImageWrapper: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: "hidden",
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.3)",
    },
    artistMainImage: {
        width: "100%",
        height: "100%",
        borderRadius: 40,
    },
    artistSubImagesContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 4,
    },
    artistSubImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: 2,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
    },
    // Styles pour les tracks (inchangés)
    tracksGrid: {
        width: '100%',
        height: '100%',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    tracksRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        width: '100%',
        marginBottom: 8,
    },
    tracksRow2: {
        flexDirection: "row",
        justifyContent: "center",
        width: '100%',
        marginBottom: 8,
    },
    trackLargeImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 8,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.3)",
    },
    trackMediumLargeImage: {
        width: 60,
        height: 60,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.25)",
    },
    trackMediumImage: {
        width: 55,
        height: 55,
        borderRadius: 6,
        marginRight: 8,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
    },
    trackSmallImage: {
        width: 45,
        height: 45,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.15)",
    },
    // Styles pour les albums (inchangés)
    albumImageContainer: {
        flexDirection: "column",
        alignItems: "center",
    },
    albumsContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        height: '100%',
    },
    albumMainImage: {
        width: 80,
        height: 80,
        borderRadius: 6,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.3)",
    },
    albumSubImagesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: 100,
    },
    title: {
        fontSize: 20,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    pressableContainer: {
        borderRadius: 12,
        marginRight: 16,
    }
});

export default TopElementBloc;