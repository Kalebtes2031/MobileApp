import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

const Card = ({ image, name, price, category }) => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text
        style={[
          styles.category,
          { color: colorScheme === "dark" ? "#333" : "#7E0201" },
        ]}
      >
        {category}
      </Text>
      <Text
        style={[
          styles.name,
          { color: colorScheme === "dark" ? "#7E0201" : "#7E0201" },
        ]}
      >
        {name}
      </Text>
      <Text
        style={[
          styles.price,
          { color: colorScheme === "dark" ? "#333" : "#7E0201" },
        ]}
      >
        {price}
      </Text>
      
    </View>
  );
};

const CardList = () => {
  const colorScheme = useColorScheme();
  const cards = [
    {
      image: require("../assets/images/babyboy.jpg"),
      name: "BabyBoy",
      price: "$10",
      category: "KIDS",
    },
    {
      image: require("../assets/images/beteseb.jpg"),
      name: "Malhib Collection",
      price: "$20",
      category: "Family",
    },
    {
      image: require("../assets/images/habeshakemis2.png"),
      name: "Habesha Kemis",
      price: "$30",
      category: "Women",
    },
    {
      image: require("../assets/images/newkemis.jpg"),
      name: "Habesha Kemis",
      price: "$40",
      category: "Women",
    },
  ];

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          { color: colorScheme === "dark" ? "#fff" : "#7E0201" },
        ]}
      >
        Most Popular
      </Text>
      <View style={styles.row}>
        {cards.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            name={card.name}
            price={card.price}
            category={card.category}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#f8f8f8",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: "#888",
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: "#aaa",
  },
});

export default CardList;
