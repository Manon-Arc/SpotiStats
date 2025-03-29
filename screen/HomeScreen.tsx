import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useStore } from '~/store/zustand';
import CurrentTrackCard from '~/components/CurrentTrackCard';

const HomeScreen = () => {
  // Récupérer les données depuis le store
  const currentTrack = useStore ((state) =>  state.currentTrack)

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>En cours d'écoute</Text>
      <CurrentTrackCard currentTrackContext={currentTrack} />
      
      {/* Vous pouvez ajouter d'autres sections ici */}
      <Text style={styles.sectionTitle}>Ecouté récemment</Text>
      {/* Ajouter ici d'autres composants pour afficher les tops tracks */}
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

export default HomeScreen;