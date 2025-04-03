import { Entypo } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Box, theme } from "~/theme";

type HeaderProps = {
  title: string;
  onBack: () => void;
};

export default function Header({ title, onBack }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top + 2, backgroundColor: theme.colors.grey }}>
      <Box
        flexDirection="row"
        alignItems="center"
        paddingHorizontal="m_16"
        paddingVertical="s_8"
        backgroundColor="grey"
        borderBottomColor="greyBright"
        borderBottomWidth={1}
        height={60}>
        {/* Container gauche pour le bouton retour */}
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Entypo name="chevron-thin-left" size={24} color={theme.colors.whiteDark} />
          </TouchableOpacity>
        </View>

        {/* Container central pour le titre */}
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>

        {/* Container droit pour équilibrer */}
        <View style={styles.rightSpacer} />
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  leftContainer: {
    width: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  rightSpacer: {
    width: 40, // Même largeur que le conteneur gauche pour l'équilibre
  },
});
