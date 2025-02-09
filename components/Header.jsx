import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

const Header = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView
      style={[
        styles.header,
        { backgroundColor: colorScheme === "dark" ? "#333" : "#fff" },
      ]}
    >
      <ThemedView
        style={[
          styles.headerContainer,
          { backgroundColor: colorScheme === "dark" ? "#333" : "#7E0201" },
        ]}
      >
        {/* Logo on the left */}
        <Image
          source={require("../assets/images/malhibfooterlogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Icons on the right */}
        <ThemedView style={[styles.iconContainer,
          { backgroundColor: colorScheme === "dark" ? "#333" : "#7E0201" },
        ]}>
          {/* <TouchableOpacity>
            <MaterialIcons name="search" size={24} color="white" />
          </TouchableOpacity> */}
          <TouchableOpacity>
            <MaterialIcons name="shopping-cart" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="globe-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5 name="user-circle" size={24} color="white" />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    height: 70,
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    width: 95,
    height: 40,
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 100,
    marginRight: 10,
  },
});

export default Header;
