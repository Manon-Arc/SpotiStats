// File: components/ProfileInfo.tsx
import { StyleSheet } from "react-native";
import { Box, Text } from "~/theme";
import { theme } from "~/theme";

type ProfileInfoProps = {
  country: string;
  product: string;
  followers: number;
  spotifyId: string;
};

export default function ProfileInfo({ country, product, followers, spotifyId }: ProfileInfoProps) {
  return (
    <Box style={styles.infoContainer} backgroundColor="greyBright" marginBottom="m_16">
      <InfoItem label="Pays" value={country} />
      <InfoItem 
        label="Abonnement" 
        value={product === 'premium' ? 'Premium' : product} 
      />
      <InfoItem label="Followers" value={followers.toString()} />
      <InfoItem label="ID Spotify" value={spotifyId} />
    </Box>
  );
}

type InfoItemProps = {
  label: string;
  value: string;
};

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <Box style={styles.infoItem}>
      <Text variant="body" color="whiteDark">{label}</Text>
      <Text variant="body" color="white" textTransform={label === "Abonnement" ? "capitalize" : "none"}>
        {value}
      </Text>
    </Box>
  );
}

const styles = StyleSheet.create({
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
});