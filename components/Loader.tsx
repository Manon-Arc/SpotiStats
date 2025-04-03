import { ActivityIndicator, StyleSheet } from "react-native";

import theme from "../theme/theme";

import { Text } from "~/theme";
import Box from "~/theme/Box";

export const Loader = () => (
  <Box style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#1DB954" />
    <Text style={styles.loadingText}>Chargement en cours...</Text>
  </Box>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.grey,
  },
  loadingText: {
    color: "white",
    marginTop: 10,
  },
});
