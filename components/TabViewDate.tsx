import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Box from "../theme/Box";

import { useStore } from "~/store/zustand";
import { Text } from "~/theme";

export default function TabViewDate() {
  const [activeTab, setActiveTab] = useState("short");

  const setActiveTabDate = useStore((state) => state.setActiveTabdDate);

  useEffect(() => {
    setActiveTabDate(activeTab);
  }, [activeTab]);

  return (
    <Box style={styles.periodTabBar}>
      <TouchableOpacity
        style={[styles.tab, activeTab === "short" && styles.activeTab]}
        onPress={() => setActiveTab("short")}>
        <Text style={[styles.tabText, activeTab === "short" && styles.activeTabText]}>
          4 semaines
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === "medium" && styles.activeTab]}
        onPress={() => setActiveTab("medium")}>
        <Text style={[styles.tabText, activeTab === "medium" && styles.activeTabText]}>6 mois</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === "long" && styles.activeTab]}
        onPress={() => setActiveTab("long")}>
        <Text style={[styles.tabText, activeTab === "long" && styles.activeTabText]}>1 an</Text>
      </TouchableOpacity>
    </Box>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: "#1DB954",
  },
  tabText: {
    color: "#aaa",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  periodTabBar: {
    flexDirection: "row",
    backgroundColor: "#121212",
    height: 50,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
});
