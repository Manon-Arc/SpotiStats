import { ScrollView, StyleSheet, View } from "react-native";

import MusicCard from "~/components/MusicCard";
import { useStore } from "~/store/zustand";

export default function MusicStatScreen() {
  const shortTermsData = useStore((state) => state.shortTermTopTracks);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={styles.container}>
        {shortTermsData.map((item, index) => (
          <MusicCard
            ImageUrl={item.album.images[0].url}
            Titre={item.name}
            Artiste={item.artists[0].name}
            Placement={index + 1}
            key={index}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
