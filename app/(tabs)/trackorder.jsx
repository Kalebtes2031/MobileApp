import Header from "@/components/Header";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Button,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Picker } from "@react-native-picker/picker";
import CardList from "@/components/Card";
import { RefreshControl } from "react-native";
import SearchComp from "@/components/SearchComp";

const TrackOrder = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const colorScheme = useColorScheme();
  const [selectedValue, setSelectedValue] = useState("option1");
  let newest = "";
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}
    >
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Header />
        </View>

        {/* Content Area */}
        <View style={styles.contentContainer}>
          {/* Image Background Section */}
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require("@/assets/images/headerhabeshakemis.png")}
              style={styles.imageBackground}
            >
              <View style={styles.overlay} />
              <View style={styles.textContainer}>
                <Text style={[styles.text, styles.text1]}>Track Order</Text>
                <Text style={styles.text}>Home {">>"} Track Order </Text>
              </View>
            </ImageBackground>
          </View>
          {/* <View>
            <SearchComp/>
          </View> */}

          <View className="">
            <Text
              style={[
                styles.textorder,
                { color: colorScheme === "dark" ? "white" : " black" },
              ]}
            >
              {" "}
              To track your order please enter your Order ID in the box below
              and press the "Track" button. This was given to you on your
              receipt and in the confirmation email you should have received.
            </Text>
          </View>
          <View style={styles.orderContainer}>
            <View style={styles.orderid}>
              <Text
                style={[
                  styles.ordertext,
                  { color: colorScheme === "dark" ? "white" : " black" },
                ]}
              >
                Order ID
                 </Text>
                 <TextInput />
            </View>
            <View style={styles.orderid}>
              <Text
                style={[
                  styles.ordertext,
                  { color: colorScheme === "dark" ? "white" : " black" },
                ]}
              >
                Order ID
                 </Text>
                 <TextInput />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  headerContainer: {
    zIndex: 1000,
    // Ensure Header has explicit height matching your header's actual height
    height: 70, // Match your Header component's height
  },
  contentContainer: {
    flex: 1,
    marginTop: 0, // Remove default margins
  },
  imageContainer: {
    height: 180, // Match ImageBackground height
    marginBottom: 10,
  },
  imageBackground: {
    height: 180,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(101,100,114,0.5)",
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  text: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 12,
    letterSpacing: 2,
    lineHeight: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  text1: {
    fontSize: 32,
    fontWeight: "extrabold",
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 2,
    lineHeight: 18,
    fontWeight: "600",
    paddingTop: 28,
  },
  textorder: {
    padding: 16,
    // fontSize: 12,
  },
  orderContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    // fontSize: 12,
  },
  orderid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  ordertext: {
    fontSize: 12,
  },
  ordertextinput: {
    padding: 2,
  }
});

export default TrackOrder;
