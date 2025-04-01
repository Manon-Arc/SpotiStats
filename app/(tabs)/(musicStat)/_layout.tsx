import { Stack } from "expo-router";

export default function MusicStatLayout() {
  return (
    <Stack>
      <Stack.Screen name="musicStat" options={{ headerShown: false }} />
      <Stack.Screen
        name="musicStatDetails/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="artistStatDetails/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
