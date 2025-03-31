import { Foundation, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import { Box } from "~/theme";

// Définition des types spécifiques pour chaque bibliothèque
type IconName =
  | { library: "SimpleLineIcons"; iconName: keyof typeof SimpleLineIcons.glyphMap }
  | { library: "MaterialIcons"; iconName: keyof typeof MaterialIcons.glyphMap }
  | { library: "Foundation"; iconName: keyof typeof Foundation.glyphMap };

export const TabBarIcon = ({ iconName, color, library }: IconName & { color: string }) => {
  return (
    <Box style={styles.container}>
      {library === "SimpleLineIcons" && <SimpleLineIcons name={iconName} color={color} size={24} />}
      {library === "MaterialIcons" && <MaterialIcons name={iconName} color={color} size={24} />}
      {library === "Foundation" && <Foundation name={iconName} color={color} size={24} />}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 26,
  },
});
