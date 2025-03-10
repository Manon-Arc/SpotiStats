import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import Authentication from '~/components/Authentication';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <View style={styles.container}>
        <Authentication />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
