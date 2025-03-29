import { Tabs } from "expo-router";

import { TabBarIcon } from "@components/TabBarIcon";
import { theme } from "~/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.green,
        tabBarInactiveTintColor: theme.colors.whiteDark,
        tabBarStyle: {
          backgroundColor: theme.colors.grey,
          borderTopColor: theme.colors.greyBright,
        },
        tabBarShowLabel: false,
        headerShown: true,
        headerBackButtonDisplayMode: "minimal",
        headerTintColor: theme.colors.white, // Change text color to green
        headerTitleAlign: "center", // Center the header text
        headerStyle: {
          backgroundColor: theme.colors.grey,
          borderBottomColor: theme.colors.greyBright,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => (
            <TabBarIcon iconName="home" color={color} library="Foundation" />
          ),
        }}
      />

      <Tabs.Screen
        name="top"
        options={{
          title: "Top",
          tabBarIcon: ({ color }) => (
            <TabBarIcon iconName="auto-graph" color={color} library="MaterialIcons" />
          ),
        }}
      />

      <Tabs.Screen
        name="musicStat"
        options={{
          title: "musicStat",
          tabBarIcon: ({ color }) => (
            <TabBarIcon iconName="graph-bar" color={color} library="Foundation" />
          ),
        }}
      />
    </Tabs>
  );
}
