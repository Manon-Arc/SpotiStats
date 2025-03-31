import { Image, TouchableOpacity, Linking, StyleSheet, ScrollView } from "react-native";
import { Box, Text } from "~/theme";
import { useSpotifyAuth } from "@api/getSpotifyAuth";
import { theme } from "~/theme";
import { TabBarIcon } from "@components/TabBarIcon";
import { router } from "expo-router";

export default function RecentlyPlayedScreen() {



  return (
    <Box>
        <Text>TEst</Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.grey,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: theme.colors.green,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: theme.colors.green,
  },
  infoContainer: {
    borderRadius: 8,
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  spotifyButton: {
    backgroundColor: theme.colors.green,
  },
  logoutButton: {
    backgroundColor: theme.colors.greyBright,
  }
});
