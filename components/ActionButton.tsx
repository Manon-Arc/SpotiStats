import { TabBarIcon } from "@components/TabBarIcon";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Text, theme } from "~/theme";

type ActionButtonsProps = {
  onOpenSpotify: () => void;
  onLogout: () => void;
};

export default function ActionButtons({ onOpenSpotify, onLogout }: ActionButtonsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.spotifyButton]} onPress={onOpenSpotify}>
        <View style={styles.iconContainer}>
          <TabBarIcon iconName="social-spotify" color="white" library="SimpleLineIcons" />
        </View>
        <Text variant="body" color="white">
          Ouvrir dans Spotify
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={onLogout}>
        <View style={styles.iconContainer}>
          <TabBarIcon iconName="logout" color="white" library="MaterialIcons" />
        </View>
        <Text variant="body" color="white">
          Déconnexion
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    gap: 16,
    marginVertical: 12,
  },
  button: {
    width: "100%",
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  spotifyButton: {
    backgroundColor: theme.colors.green,
  },
  logoutButton: {
    backgroundColor: theme.colors.greyBright,
  },
});
