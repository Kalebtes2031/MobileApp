import React, { useState, useEffect, useRef } from "react";
import { ScrollView, View, Text, Image, Dimensions, StyleSheet } from "react-native";

// Get device width for the scroll item (or use DEVICE_WIDTH for full-screen width)
const { width: DEVICE_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = 375; // Adjust as needed

export default function HomeScreen() {
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
      image: require("@/assets/images/malhiblogo.png"),
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

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView} // Using normal StyleSheet styling
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
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 60,
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
    backgroundColor: "rgba(101,105,114,0.75)",
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
});
