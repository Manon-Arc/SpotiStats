// File: components/ProfileHeader.tsx
import { Image, StyleSheet } from "react-native";
import { Box, Text } from "~/theme";
import { theme } from "~/theme";
import { TabBarIcon } from "@components/TabBarIcon";

type ProfileHeaderProps = {
  imageUrl?: string;
  displayName: string;
  email: string;
};

export default function ProfileHeader({ imageUrl, displayName, email }: ProfileHeaderProps) {
  return (
    <Box alignItems="center" marginBottom="l_32">
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.profileImage}
        />
      ) : (
        <Box style={styles.placeholderImage} backgroundColor="greyBright" alignItems="center" justifyContent="center">
          <TabBarIcon iconName="person" color={theme.colors.white} library="MaterialIcons" />
        </Box>
      )}
      <Text variant="title" color="white" margin="m_16">
        {displayName}
      </Text>
      <Text variant="body" color="whiteDark">
        {email}
      </Text>
    </Box>
  );
}

const styles = StyleSheet.create({
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
});