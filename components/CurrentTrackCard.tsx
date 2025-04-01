import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CurrentPlaybackContext } from '@api/type/CurrentPlaybackContext';
import { TabBarIcon } from "@components/TabBarIcon";
import { theme } from '~/theme';

type CurrentTrackCardProps = {
    currentTrackContext: CurrentPlaybackContext | undefined | null;
};

const CurrentTrackCard = ({ currentTrackContext }: CurrentTrackCardProps) => {
    // Afficher un message si aucun morceau n'est en cours
    if (!currentTrackContext || !currentTrackContext.item) {
        return (
            <View style={styles.container}>
                <Text style={styles.noMusicText}>Aucun morceau en cours de lecture</Text>
            </View>
        );
    }

    // Extraction des données du morceau en cours
    const { item, progress_ms, is_playing } = currentTrackContext;
    const albumCover = item.album.images[0]?.url;
    const artistNames = item.artists.map(artist => artist.name).join(', ');
    const trackName = item.name;

    // Calcul du pourcentage de progression
    const progressPercent = item.duration_ms ? (progress_ms / item.duration_ms) * 100 : 0;

    // Formatage du temps
    const formatTime = (ms: number | undefined) => {
        if (ms === undefined) return "0:00";

        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <View style={styles.cardContainer}>
            <View style={styles.currentTrackCard}>
                {/* En-tête avec statut et logo */}
                <View style={styles.headerContainer}>
                    <Text style={styles.playingStatus}>
                        {is_playing ? 'En lecture' : 'En pause'}
                    </Text>
                    <View style={styles.spotifyLogoContainer}>
                        <TabBarIcon iconName="social-spotify" color="#1DB954" library="SimpleLineIcons" />
                    </View>
                </View>
                
                {/* Contenu principal */}
                <View style={styles.contentContainer}>
                    {albumCover && (
                    <View style={{ justifyContent: 'center' }}>
                        <Image source={{ uri: albumCover }} style={styles.albumCover} />
                    </View>
                    )}

                    <View style={styles.trackInfo}>
                        <Text style={styles.trackName} numberOfLines={1}>{trackName}</Text>
                        <Text style={styles.artistName} numberOfLines={1}>{artistNames}</Text>

                        <View style={styles.progressContainer}>
                            <View style={styles.timeInfo}>
                                <Text style={styles.timeText}>{formatTime(progress_ms)}</Text>
                                <Text style={styles.timeText}>{formatTime(item.duration_ms)}</Text>
                            </View>
                            
                            <View style={styles.progressBackground}>
                                <View
                                    style={[
                                    styles.progressBar,
                                    { width: `${progressPercent}%` }
                                    ]}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        alignSelf: 'center',
        width: '100%',
    },
    container: {
        borderRadius: 8,
    },
    noMusicText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
    currentTrackCard: {
        backgroundColor: theme.colors.greyBright,
        borderRadius: 8,
        padding: 15,
        overflow: 'hidden',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    contentContainer: {
        flexDirection: 'row',
    },
    spotifyLogoContainer: {
        borderRadius: 12,
        width: 24,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    albumCover: {
        width: 85,
        height: 85,
        borderRadius: 4,
    },
    trackInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    trackName: {
        color: '#FFFFFF',
        fontSize: 16, 
        fontWeight: 'bold',
        marginBottom: 2,
    },
    artistName: {
        color: theme.colors.whiteDark,
        fontSize: 14,
        marginBottom: 3,
    },
    progressContainer: {
        marginTop: 10,
    },
    progressBackground: {
        height: 4,
        backgroundColor: theme.colors.greenDarker,
        borderRadius: 2,
        marginTop: 2,
    },
    progressBar: {
        height: 4,
        backgroundColor: theme.colors.greenDark,
        borderRadius: 2,
    },
    timeInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    timeText: {
        color: theme.colors.whiteDark,
        fontSize: 12,
    },
    playingStatus: {
        color: '#FFFFFF', 
        fontSize: 18, // Augmenté de 16 à 18px
        fontWeight: 'bold',
    },
});

export default CurrentTrackCard;