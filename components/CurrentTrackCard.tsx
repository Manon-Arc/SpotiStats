import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CurrentPlaybackContext } from '@api/type/CurrentPlaybackContext';

type CurrentTrackCardProps = {
    currentTrackContext: CurrentPlaybackContext | null;
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
        <View style={styles.currentTrackCard}>
            {albumCover && (
                <Image source={{ uri: albumCover }} style={styles.albumCover} />
            )}

            <View style={styles.trackInfo}>
                <Text style={styles.trackName}>{trackName}</Text>
                <Text style={styles.artistName}>{artistNames}</Text>

                <View style={styles.progressContainer}>
                    <View style={styles.progressBackground}>
                        <View
                            style={[
                                styles.progressBar,
                                { width: `${progressPercent}%` }
                            ]}
                        />
                    </View>
                    <View style={styles.timeInfo}>
                        <Text style={styles.timeText}>{formatTime(progress_ms)}</Text>
                        <Text style={styles.timeText}>{formatTime(item.duration_ms)}</Text>
                    </View>
                </View>

                <Text style={styles.playingStatus}>
                    {is_playing ? 'En lecture' : 'En pause'}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#282828',
        borderRadius: 8,
    },
    noMusicText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
    currentTrackCard: {
        backgroundColor: '#282828',
        borderRadius: 8,
        padding: 15,
        flexDirection: 'row',
        marginBottom: 20,
    },
    albumCover: {
        width: 100,
        height: 100,
        borderRadius: 4,
    },
    trackInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    trackName: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    artistName: {
        color: '#B3B3B3',
        fontSize: 14,
        marginBottom: 10,
    },
    progressContainer: {
        marginTop: 10,
    },
    progressBackground: {
        height: 4,
        backgroundColor: '#535353',
        borderRadius: 2,
    },
    progressBar: {
        height: 4,
        backgroundColor: '#1DB954',
        borderRadius: 2,
    },
    timeInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    timeText: {
        color: '#B3B3B3',
        fontSize: 12,
    },
    playingStatus: {
        color: '#1DB954',
        fontSize: 12,
        marginTop: 10,
        fontWeight: 'bold',
    },
});

export default CurrentTrackCard;