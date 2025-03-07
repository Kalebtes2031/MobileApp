import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

const Card = ({ image, name, price, category }) => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} className="object-top" />
      <Text
        className="font-secondary"
        style={[
          styles.category,
          { color: colorScheme === "dark" ? "#333" : "#B9B4C7" },
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
          { color: colorScheme === "dark" ? "#333" : "#5F374B" },
        ]}
      >
        {price}
      </Text>
    </View>
  );
};

const CardList = ({ name }) => {
  const colorScheme = useColorScheme();
  const cards = [
    {
      image: require("../assets/images/babyboy.jpg"),
      name: "BabyBoy",
      price: "Br 1000.00",
      category: "KIDS",
    },
    {
      image: require("../assets/images/beteseb.jpg"),
      name: "Malhib Collection",
      price: "Br 2000.00",
      category: "Family",
    },
    {
      image: require("../assets/images/habeshakemis2.png"),
      name: "Habesha Kemis",
      price: "Br 3000.00",
      category: "Women",
    },
    {
      image: require("../assets/images/newkemis.jpg"),
      name: "Habesha Kemis",
      price: "Br 4000.00",
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
        {name}
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
    width: "40%",
    backgroundColor: "#f8f8f8",
    // paddingTop: 7,
    marginBottom: 38,
    marginHorizontal: 18,
    borderRadius: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 145,
    marginBottom: 1,
    objectFit: "top",
    objectFit: "cover",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 3,
  },
  price: {
    fontSize: 10,
    // color: "#888",
    marginBottom: 5,
  },
  category: {
    fontSize: 10,
    // color: "#000",
  },
});

export default CardList;
