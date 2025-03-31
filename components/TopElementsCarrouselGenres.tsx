import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GenreCount } from "@api/type/GenreCount";
import { theme } from "~/theme";

// Définir les types pour les props
type TopElementCarrouselGenresProps = {
    items: GenreCount[];
    title?: string;
    maxGenres?: number;
};

const TopElementCarrouselGenres: React.FC<TopElementCarrouselGenresProps> = ({ 
    items, 
    title = "Vos genres préférés",
    maxGenres = 8
}) => {
    // Trier les genres par pourcentage décroissant et limiter au nombre maximal
    const sortedGenres = [...items]
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, maxGenres);
    
    // Trouver le pourcentage maximal pour calculer la taille relative
    const maxPercentage = sortedGenres[0]?.percentage || 1;

    return (
        <LinearGradient 
            colors={["#d4d400", "#666600"]} 
            style={styles.blocContainer}
        >
            <Text style={styles.title}>{title}</Text>
            
            <ScrollView 
                contentContainerStyle={styles.genresContainer}
                showsVerticalScrollIndicator={false}
            >
                {sortedGenres.map((genre, index) => {
                    // Calculer la taille de police relative au pourcentage
                    const fontSize = 14 + Math.min(10, (genre.percentage / maxPercentage) * 10);
                    const fontWeight = index < 3 ? 'bold' : 'normal';
                    
                    return (
                        <View key={genre.name} style={styles.genreItem}>
                            <Text 
                                style={[
                                    styles.genreText, 
                                    { 
                                        fontSize, 
                                        fontWeight: fontWeight as 'bold' | 'normal'
                                    }
                                ]}
                            >
                                {genre.name}
                            </Text>
                            <Text style={styles.percentageText}>
                                {Math.round(genre.percentage)}%
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    blocContainer: {
        padding: 15,
        borderRadius: 12,
        marginRight: 16,
        minWidth: 180,
        minHeight: 200,
        maxHeight: 300,
        justifyContent: "flex-start",
    },
    title: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 16,
    },
    genresContainer: {
        flexGrow: 1,
        justifyContent: "flex-start",
    },
    genreItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
        paddingHorizontal: 4,
        paddingVertical: 2,
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
        backgroundColor: "rgba(0,0,0,0.3)",
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
    }
});

export default TopElementCarrouselGenres;