import { useSpotifyAuth } from "@api/getSpotifyAuth";
import ActionButtons from "@components/ActionButton";
import Header from "@components/Header";
import ProfileHeader from "@components/ProfileHeader";
import ProfileInfo from "@components/ProfileInfo";
import { router } from "expo-router";
import { Linking, ScrollView, StyleSheet } from "react-native";

import { Box, Text, theme } from "~/theme";

export default function ProfileScreen() {
  const { userProfile, logout } = useSpotifyAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  const goBack = () => {
    router.back();
  };

  const openSpotifyProfile = () => {
    if (userProfile?.external_urls?.spotify) {
      Linking.openURL(userProfile.external_urls.spotify);
    }
  };

  if (!userProfile) {
    return (
      <Box flex={1} backgroundColor="grey" justifyContent="center" alignItems="center">
        <Text variant="title" color="white">
          Chargement du profil...
        </Text>
      </Box>
    );
  }

  return (
    <>
      <Box>
        <Header title="Mon Profil" onBack={goBack} />
      </Box>
      <ScrollView style={styles.scrollView}>
        <Box flex={1} backgroundColor="grey" padding="l_32">
          <ProfileHeader
            imageUrl={userProfile.images?.[0]?.url}
            displayName={userProfile.display_name}
            email={userProfile.email}
          />

          <ProfileInfo
            country={userProfile.country}
            product={userProfile.product}
            followers={userProfile.followers?.total || 0}
            spotifyId={userProfile.id}
          />

          <ActionButtons onOpenSpotify={openSpotifyProfile} onLogout={handleLogout} />
        </Box>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.grey,
  },
});
