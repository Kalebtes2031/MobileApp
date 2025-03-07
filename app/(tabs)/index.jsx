import CardList from "@/components/Card";
import Header from "@/components/Header";
import SearchComp from "@/components/SearchComp";
import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { useNavigation } from '@react-navigation/native';


// Get device width for the scroll item (or use DEVICE_WIDTH for full-screen width)
const { width: DEVICE_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = 375; // Adjust as needed

export default function HomeScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });
  // Hard-coded array of images with text captions (using local images)
  const images = [
    {
      image: require("@/assets/images/tilet.jpg"),
      text: "Casual",
    },
    {
      image: require("@/assets/images/partial-react-logo.png"),
      text: "Home Paragraph 1",
    },
    {
      image: require("@/assets/images/tilet.jpg"),
      text: "Home Paragraph",
    },
  ];

  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  // Scroll to the current index when it changes
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: currentIndex * ITEM_WIDTH,
        animated: true,
      });
    }
  }, [currentIndex]);
let most= "Most Popular";
let newest= "Newest Products";

  return (
    <ScrollView style={styles.container}>
      {/* Header & SearchBar*/}
      <View style={styles.headerContainer}>
        <Header />
        <SearchComp />
      </View>

      {/* Horizontal Image Carousel */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {images.map((img, index) => (
          <View key={index} style={styles.card}>
            {/* Background image */}
            <Image source={img.image} style={styles.image} />
            {/* Semi-transparent overlay */}
            <View style={styles.overlay} />
            {/* Text overlay */}
            <View style={styles.textContainer}>
              <Text style={styles.text}>{img.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Most popular Card lists */}
      <View className="mb-12">
        <CardList name={most}/>
      </View>

      {/* Image Background Section */}
      <ImageBackground
        source={require("@/assets/images/malhibdesignpic.jpg")}
        style={styles.section}
        imageStyle={styles.imageBackground}
        className="relative"
      >
        <View style={styles.overlay} />

        <View
          style={styles.contentContainer}
          className=" -top-16 left-20 right-0 flex items-center justify-center"
        >
          <Image
            source={require("@/assets/images/beteseb.jpg")}
            style={styles.exploreImage}
          />
          <Text style={styles.heading} className="w-10px">
            Explore our Family Package Collection now!
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("profile")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>VIEW COLLECTION</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Most popular Card lists */}
      <View className="mb-12">
        <CardList name={newest}/>
      </View>

      {/* Image Background Section */}
      <ImageBackground
        source={require("@/assets/images/malhibdesignpic.jpg")}
        style={styles.section}
        imageStyle={styles.imageBackground}
        className="relative"
      >
        <View style={styles.overlay} />

        <View
          style={styles.contentContainer}
          className=" -top-16 -left-20 right-0 flex items-center justify-center"
        >
          <Image
            source={require("@/assets/images/beteseb.jpg")}
            style={styles.exploreImage}
          />
          <Text style={styles.heading1} className="w-10px">
            Discover Ethiopian Cultural Design "Tilet" Dress Collection!
          </Text>
          <Text style={styles.heading2} className="w-10px">
            The "Tilet" dress is renowned for its unique design and quality.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Shop", { category: "Family" })}
            style={styles.button}
          >
            <Text style={styles.buttonText}>SHOP NOW</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    // Space between Header and SearchComp
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    gap: 80,
  },
  scrollView: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  card: {
    width: ITEM_WIDTH,
    height: 160,
    borderRadius: 20,
    overflow: "hidden", // Ensures the children are clipped to the borderRadius
    marginRight: 16, // Gap between cards
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(101,100,114,0.5)",
  },
  textContainer: {
    flex: 1,
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
  },
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    resizeMode: "cover",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  },
  contentContainer: {
    alignItems: "center",
    zIndex: 10,
  },
  exploreImage: {
    width: 200,
    height: 300,
    
    // borderWidth: 1,
    // borderColor: "#7E0201",
  },
  heading: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "italic",
    marginVertical: 10,
    width: 200,
  },
  heading1: {
    color: "#fff",
    textAlign: "start",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "italic",
    marginVertical: 10,
    width: 200,
  },
  heading2: {
    color: "#EFE1D1",
    textAlign: "start",
    fontSize: 8,
    fontWeight: "normal",
    marginBottom: 10,
    width: 200,
  },
  button: {
    width: 90,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7E0201",
    borderRadius: 28,
    marginRight: 106,
  },
  buttonText: {
    color: "#fff",
    fontSize: 7,
    fontWeight: "normal",
    textTransform: "uppercase",
  },
  paginationContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#97BD3D",
  },
  inactiveDot: {
    backgroundColor: "#ccc",
  },
});
