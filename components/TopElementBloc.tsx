import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Définir les types pour les props
type TopElementBlocProps = {
    title: string;
    images: string[] | undefined;
    type: "artists" | "tracks" | "albums";
};

const TopElementBloc: React.FC<TopElementBlocProps> = ({ title, images = [], type }) => {
    // Définir les couleurs du gradient en fonction du type
    const getGradientColors = () => {
        switch (type) {
            case "artists":
                return ["#004d00", "#001a00"] as const; // Vert
            case "tracks":
                return ["#4d0000", "#1a0000"] as const; // Rouge
            case "albums":
                return ["#001a4d", "#000d26"] as const; // Bleu
            default:
                return ["#333333", "#111111"] as const; // Couleur par défaut
        }
    };

    // S'assurer que images est un tableau (protection contre undefined)
    const safeImages = images || [];

    // Fonction pour obtenir une URL d'image sécurisée avec un fallback
    const getImageUrl = (index: number, fallback: string = "https://via.placeholder.com/80") => {
        return safeImages.length > index && safeImages[index] ? safeImages[index] : fallback;
    };

    return (
        <LinearGradient colors={getGradientColors()} style={styles.blocContainer}>
            <View style={[
                styles.imageContainer,
                type === "artists" && styles.artistImageContainer,
                type === "albums" && styles.albumImageContainer
            ]}>
                {type === "artists" ? (
                    <>
                        <View style={styles.artistMainImageWrapper}>
                            <Image
                                source={{ uri: getImageUrl(0) }}
                                style={styles.artistMainImage}
                            />
                        </View>
                        <View style={styles.artistSubImagesContainer}>
                            {[1, 2, 3].map((index) => (
                                <Image
                                    key={index}
                                    source={{ uri: getImageUrl(index, "https://via.placeholder.com/30") }}
                                    style={styles.artistSubImage}
                                />
                            ))}
                        </View>
                    </>
                ) : type === "albums" ? (
                    // Disposition spéciale pour les albums
                    <View style={styles.albumsContainer}>
                        <Image
                            source={{ uri: getImageUrl(0) }}
                            style={styles.albumMainImage}
                        />
                        <View style={styles.albumSubImagesContainer}>
                            {[1, 2, 3].map((index) => (
                                <Image
                                    key={index}
                                    source={{ uri: getImageUrl(index, "https://via.placeholder.com/30") }}
                                    style={styles.albumSubImage}
                                />
                            ))}
                        </View>
                    </View>
                ) : (
                    // Disposition pour les titres (tracks)
                    [0, 1, 2, 3].map((index) => (
                        <Image
                            key={index}
                            source={{ uri: getImageUrl(index, "https://via.placeholder.com/40") }}
                            style={styles.trackImage}
                        />
                    ))
                )}
            </View>
            <Text style={styles.title}>{title}</Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    blocContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderRadius: 12,
        marginRight: 16,
        minWidth: 140,
        minHeight: 160,
    },
    imageContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
    },
    // Styles pour les artistes
    artistImageContainer: {
        flexDirection: "column",
        alignItems: "center",
    },
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
    // Styles pour les tracks
    trackImage: {
        width: 40,
        height: 40,
        borderRadius: 6,
        margin: 4,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
    },
    // Styles pour les albums
    albumImageContainer: {
        flexDirection: "column",
        alignItems: "center",
    },
    albumsContainer: {
        alignItems: "center",
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
    albumSubImage: {
        width: 28,
        height: 28,
        borderRadius: 4,
        margin: 2,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
    },
    // Style du titre
    title: {
        marginTop: 12,
        fontSize: 14,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
});

export default TopElementBloc;