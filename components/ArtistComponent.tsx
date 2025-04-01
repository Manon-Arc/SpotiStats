// Composant séparé pour chaque artiste
import { Box, Text, theme } from "~/theme";
import { useGetArtistInfo } from "~/hook/useGetArtistInfo";
import { Image, StyleSheet } from "react-native";

// Définition du type pour les props
interface ArtistComponentProps {
  artistId: string;
}

// Correction de la définition du composant pour recevoir un objet de props
export const ArtistComponentInfo = ({ artistId }: ArtistComponentProps) => {
  const { artist } = useGetArtistInfo(artistId);
  console.log(artistId);
  const imageUrl = artist?.images[0]?.url;

  return (
    <Box>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.artistImage} />}
      <Text style={styles.h3}>{artist?.name}</Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  h2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 10,
    color: theme.colors.white,
  },
  h3: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: theme.colors.white,
    marginTop: 10,
  },
  artistImage: {
    resizeMode: "cover",
    height: 120,
    width: 120,
    borderRadius: 60, // La moitié de la largeur/hauteur
    marginVertical: 10,
  },
});
