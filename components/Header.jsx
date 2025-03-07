import React, { useState, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Modal,
  Animated,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedView } from "./ThemedView";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Header = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current; // Fix here

  // Function to toggle the modal
  const toggleModal = () => {
    if (!isModalVisible) {
      setModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true, // Enable native driver for better performance
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    }
  };

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
        {/* Menu and logo on the left */}
        <View style={styles.menulogo}>
          <TouchableOpacity onPress={toggleModal}>
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>
          <Image
            source={require("../assets/images/malhibfooterlogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Icons on the right */}
        {/* Icons on the right */}
        <ThemedView
          style={[
            styles.iconContainer,
            { backgroundColor: colorScheme === "dark" ? "#333" : "#7E0201" },
          ]}
        >
          <View style={styles.iconWrapper}>
            <TouchableOpacity>
              <MaterialIcons name="shopping-cart" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>0</Text>
            </View>
          </View>

          <View style={styles.iconWrapper}>
            <TouchableOpacity>
              <MaterialIcons name="favorite-border" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>0</Text>
            </View>
          </View>

          <TouchableOpacity>
            <Ionicons name="globe-outline" size={24} color="white" />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      {/* Slide-in Modal */}
      <Modal transparent visible={isModalVisible} animationType="none">
        {/* Overlay for closing the modal */}
        <TouchableOpacity
          style={styles.overlay}
          onPress={toggleModal}
          activeOpacity={1}
        />
        {/* Animated Modal Content */}
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateX: slideAnim }],
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
            },
          ]}
        >
          <Image
            source={require("../assets/images/malhiblogo.png")}
            style={styles.logo}
            resizeMode="contain"
            className="bg-red-700"
          />
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate("index")}
          >
            <Text style={styles.linkText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate("profile")}
          >
            <Text style={styles.linkText}>Shop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate("order")}
          >
            <Text style={styles.linkText}>Track Order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate("explore")}
          >
            <Text style={styles.linkText}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate("profile")}
          >
            <Text style={styles.linkText}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.linkText}>Login / Register</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
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
    marginLeft: 12,
    marginVertical: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 100,
    marginRight: 10,
  },
  iconWrapper: {
  position: "relative",
},

badge: {
  position: "absolute",
  top: -8,
  right: -10,
  backgroundColor: "white",
  borderRadius: 10,
  width:18,
  height:18,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10, // Ensures the badge is on top
},

badgeText: {
  color: "#7E0201",
  fontSize: 10,
  fontWeight: "bold",
},

  menulogo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Slightly dimmed background
  },
  modalContent: {
    width: 250,
    height: "100%",
    backgroundColor: "white",
    position: "absolute",
    left: 0,
    top: 0,
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000", // Black text for heading
    padding: 20,
  },
  link: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd", // Divider between links
    paddingLeft: 20,
  },
  linkText: {
    fontSize: 18,
    color: "#000", // Black text for links
  },
});

export default Header;
