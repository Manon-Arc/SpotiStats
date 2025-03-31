import { Image, TouchableOpacity, Linking, StyleSheet, ScrollView } from "react-native";
import { Box, Text } from "~/theme";
import { useSpotifyAuth } from "@api/getSpotifyAuth";
import { theme } from "~/theme";
import { TabBarIcon } from "@components/TabBarIcon";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { userProfile, logout } = useSpotifyAuth();

  const handleLogout = async () => {
    await logout();
    // Rediriger vers la page de connexion ou d'accueil
    router.replace("/");
  };

  const openSpotifyProfile = () => {
    if (userProfile?.external_urls?.spotify) {
      Linking.openURL(userProfile.external_urls.spotify);
    }
  };

  if (!userProfile) {
    return (
      <Box flex={1} backgroundColor="grey" justifyContent="center" alignItems="center">
        <Text variant="title" color="white">Chargement du profil...</Text>
      </Box>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <Box flex={1} backgroundColor="grey" padding="l_32">
        {/* En-tête du profil avec image */}
        <Box alignItems="center" marginBottom="l_32">
          {userProfile.images?.[0]?.url ? (
            <Image
              source={{ uri: userProfile.images[0].url }}
              style={styles.profileImage}
            />
          ) : (
            <Box style={styles.placeholderImage} backgroundColor="greyBright" alignItems="center" justifyContent="center">
              <TabBarIcon iconName="person" color={theme.colors.white} library="MaterialIcons" />
            </Box>
          )}
          <Text variant="title" color="white" margin="m_16">
            {userProfile.display_name}
          </Text>
          <Text variant="body" color="whiteDark">
            {userProfile.email}
          </Text>
        </Box>

        {/* Informations du profil */}
        <Box style={styles.infoContainer} backgroundColor="greyBright" marginBottom="m_16">
          <Box style={styles.infoItem}>
            <Text variant="body" color="whiteDark">Pays</Text>
            <Text variant="body" color="white">{userProfile.country}</Text>
          </Box>
          <Box style={styles.infoItem}>
            <Text variant="body" color="whiteDark">Abonnement</Text>
            <Text variant="body" color="white" textTransform="capitalize">
              {userProfile.product === 'premium' ? 'Premium' : userProfile.product}
            </Text>
          </Box>
          <Box style={styles.infoItem}>
            <Text variant="body" color="whiteDark">Followers</Text>
            <Text variant="body" color="white">{userProfile.followers?.total || 0}</Text>
          </Box>
          <Box style={styles.infoItem}>
            <Text variant="body" color="whiteDark">ID Spotify</Text>
            <Text variant="body" color="white">{userProfile.id}</Text>
          </Box>
        </Box>

        {/* Boutons d'action */}
        <TouchableOpacity
          style={[styles.button, styles.spotifyButton]}
          onPress={openSpotifyProfile}
        >
          <TabBarIcon iconName="social-spotify" color="white" library="SimpleLineIcons" />
          <Text variant="body" color="white" marginLeft="s_8">
            Ouvrir dans Spotify
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <TabBarIcon iconName="logout" color="white" library="MaterialIcons" />
          <Text variant="body" color="white" marginLeft="s_8">
            Déconnexion
          </Text>
        </TouchableOpacity>
      </Box>
    </ScrollView>
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
