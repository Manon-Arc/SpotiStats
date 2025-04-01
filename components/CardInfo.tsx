import { View, Text, StyleSheet } from "react-native";
import { theme } from "~/theme";

type CardInfoProps = {
  titre?: string;
  texte: string;
};

export default function CardInfo({ titre = "undefined", texte }: CardInfoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titre}>{titre}</Text>
      <Text style={styles.texte}>{texte}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.greyBright,
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "50%",
  },
  titre: {
    color: theme.colors.green,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
  },
  texte: {
    color: theme.colors.white,
    fontSize: 14,
    lineHeight: 20,
  },
});
