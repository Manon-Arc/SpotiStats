import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getData } from '~/hooks/localStorage';

export default function Home() {
  const [spotifyData, setSpotifyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getData('token');

        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await response.json();
        setSpotifyData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{spotifyData ? JSON.stringify(spotifyData) : 'En cours...'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
