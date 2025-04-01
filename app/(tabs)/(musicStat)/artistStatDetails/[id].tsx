import { useLocalSearchParams } from "expo-router";
import { useGetArtistInfo } from "~/hook/useGetArtistInfo";
import { Image, Text, View } from "react-native";
import { style } from "@motionone/dom";
import { theme } from "~/theme";

export default function ArtistStatDetails() {
  const { id } = useLocalSearchParams();
  const idString = Array.isArray(id) ? id[0] : id;
  const { artist } = useGetArtistInfo(idString);
  const ImageUrl = artist?.images[0].url;
  const imageSource = typeof ImageUrl === "string" ? { uri: ImageUrl } : ImageUrl;
  return (
    <View style={{ backgroundColor: theme.colors.greyBright, flex: 1 }}>
      <Image source={imageSource} style={{ width: "100%", height: "50%", resizeMode: "cover" }} />
      <Text>{artist?.name}</Text>
      <Text>{artist?.genres.join(", ")}</Text>
      <Text>{artist?.followers.total} followers</Text>
    </View>
  );
}
