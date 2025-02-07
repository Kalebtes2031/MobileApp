import React from "react";
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Header() {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        {/* Logo on the left */}
        <Image
          source={require("@/assets/images/partial-react-logo.png")} // Replace with your logo image path
          style={styles.logo}
          resizeMode="cover"
        />

        {/* Icons on the right */}
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <MaterialIcons name="search" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="shopping-cart" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="globe-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome6 name="circle-user" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2563EB", // Tailwind bg-blue-600
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16, // Creates space between icons (supported in React Native 0.71+)
  },
});
