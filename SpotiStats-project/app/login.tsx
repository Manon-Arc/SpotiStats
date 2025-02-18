import { Stack } from 'expo-router';
import { View } from 'react-native';

import Authentication from '~/components/Authentication';

export default function Login() {
  return (
    <>
      <Stack.Screen options={{ title: 'Login' }} />
      <View>
        <Authentication />
      </View>
    </>
  );
}
