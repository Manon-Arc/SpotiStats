import { SimpleLineIcons } from '@expo/vector-icons';
import { forwardRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { makeStyles, Text } from 'theme';

type Button2Props = {
  title?: string;
  iconName?: keyof typeof SimpleLineIcons.glyphMap;
} & TouchableOpacityProps;

export const Button2 = forwardRef<View, Button2Props>(
  ({ title, iconName, ...touchableProps }, ref) => {
    const styles = useStyles();

    return (
      <TouchableOpacity ref={ref} {...touchableProps} style={[styles.button, touchableProps.style]}>
        <Text variant="body" textAlign="center" fontWeight="600" style={styles.buttonText}>
          {title}
        </Text>
        {iconName && (
          <SimpleLineIcons name={iconName} size={24} style={styles.icon} />
        )}
      </TouchableOpacity>
    );
  }
);

const useStyles = makeStyles((theme) => ({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.greenDarker,
    borderRadius: theme.borderRadii.l_12,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.s_8,
    shadowColor: theme.colors.greenBright,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    paddingHorizontal: theme.spacing.ml_24,
  },
  buttonText: {
    color: theme.colors.green,
  },
  icon: {
    color: theme.colors.green,
    marginRight: theme.spacing.s_8,
  },
}));