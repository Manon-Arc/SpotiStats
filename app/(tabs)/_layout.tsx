import { useSpotifyAuth } from "@api/getSpotifyAuth"; // Hook d'authentification Spotify
import { TabBarIcon } from "@components/TabBarIcon";
import { router, Tabs, usePathname } from "expo-router";
import { Image, TouchableOpacity } from "react-native";

import { theme } from "~/theme";

export default function TabLayout() {
  const { userProfile } = useSpotifyAuth();
  const path = usePathname();
  const isHome = path.includes("recentlyPlayed");

  return (
    <Tabs
      screenOptions={{
      tabBarActiveTintColor: theme.colors.green,
      tabBarInactiveTintColor: theme.colors.whiteDark,
      tabBarStyle: {
        backgroundColor: theme.colors.grey,
        borderTopColor: theme.colors.greyBright,
        paddingTop: 5,
      },
      tabBarShowLabel: false,
      headerShown: true,
      headerTintColor: theme.colors.white,
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: theme.colors.grey,
        borderBottomColor: theme.colors.greyBright,
        borderBottomWidth: 1,
        height: 100,
      },
      headerRight: () => (
        <TouchableOpacity
        style={{ marginRight: 15 }}
        onPress={() => {
          router.push("/profile");
        }}>
        {userProfile?.images?.[0]?.url ? (
          <Image
          source={{ uri: userProfile.images[0].url }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: theme.colors.greyBright,
          }}
          />
        ) : (
          <TabBarIcon
          iconName="person"
          color={theme.colors.whiteDark}
          library="MaterialIcons"
          />
        )}
        </TouchableOpacity>
      ),
      }}>
      <Tabs.Screen
      name="(home)"
      options={{
        title: "Accueil",
        headerShown: !isHome,
        tabBarIcon: ({ color }) => (
        <TabBarIcon iconName="home" color={color} library="Foundation" />
        ),
      }}
      />

      <Tabs.Screen
      name="musicStat"
      options={{
        title: "musicStat",
        tabBarIcon: ({ color }) => (
        <TabBarIcon iconName="auto-graph" color={color} library="MaterialIcons" />
        ),
      }}
      />

      <Tabs.Screen
      name="top"
      options={{
        title: "Top",
        tabBarIcon: ({ color }) => (
        <TabBarIcon iconName="graph-bar" color={color} library="Foundation" />
        ),
      }}
      />
    </Tabs>
  );
}
