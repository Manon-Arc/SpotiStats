import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import CurrentTrackCard from '@components/CurrentTrackCard';
import RecentlyPlayedBloc from '@components/RecentlyPlayedBloc';
import { useGetCurrentPlaybackContext } from "@hooks/useGetCurrentPlaybackContext";
import { useGetRecentlyPlayedTracks } from "@hooks/useGetRecentlyPlayedTracks";
import { theme } from '~/theme';

interface HomeScreenProps {
  isLoading: boolean;
}

export default function HomeScreen ({isLoading}: HomeScreenProps) {
  // Récupérer les données depuis le store
  const { currentTrack } = useGetCurrentPlaybackContext();
  const { recentlyPlayedTracks } = useGetRecentlyPlayedTracks();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>En cours d'écoute</Text>
      <CurrentTrackCard currentTrackContext={currentTrack} />

      <Text style={styles.sectionTitle}>Votre top <Text style={{ color: theme.colors.whiteDark, }}>depuis 4 semaines</Text></Text>
      {/* <TopElementCarrousel artists={topUserArtists} tracks={topUserTracks} albums ={topUserAlbums}/> */}

      <Text style={styles.sectionTitle}>Ecouté récemment</Text>
      <RecentlyPlayedBloc tracks={recentlyPlayedTracks} />

      <Text style={styles.sectionTitle}>Le top mondial <Text style={{ color: theme.colors.whiteDark, }}>aujourd'hui</Text></Text>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    marginTop: 8,
  },
});

