import { SimpleLineIcons } from "@expo/vector-icons";
import { forwardRef } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { makeStyles, Text } from "theme";

type ButtonProps = {
  title?: string;
  iconName?: keyof typeof SimpleLineIcons.glyphMap;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  ({ title, iconName, ...touchableProps }, ref) => {
    const styles = useStyles();

    return (
      <TouchableOpacity ref={ref} {...touchableProps} style={[styles.button, touchableProps.style]}>
        {iconName && (
          <SimpleLineIcons name={iconName} size={24} color="black" style={styles.icon} />
        )}
        <Text variant="body" textAlign="center" color="black" fontWeight="600">
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
);

const useStyles = makeStyles((theme) => ({
  button: {
    alignItems: "center",
    backgroundColor: theme.colors.green,
    textColor: theme.colors.black,
    borderRadius: theme.borderRadii.xl_24,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "center",
    padding: theme.spacing.m_16,
    shadowColor: theme.colors.greenBright,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
  },
  icon: {
    marginRight: theme.spacing.s_8,
  },
}));
