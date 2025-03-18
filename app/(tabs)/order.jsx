import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Link } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import Header from "@/components/Header";
import { fetchOrderHistory } from "@/hooks/useFetch";

const Order = () => {
  const { isLogged } = useGlobalContext();
  const colorScheme = useColorScheme();
  const [orders, setOrders] = useState([]);

  const fetchOrderHistorys = async () => {
    try {
      const result = await fetchOrderHistory();
      setOrders(result);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  useEffect(() => {
    fetchOrderHistorys();
  }, []);

  const renderOrderItems = (items) => (
    items.map((item) => (
      <View key={item.id} style={styles.itemContainer}>
        <Image source={{ uri: item.product.image }} style={styles.productImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.product.item_name}</Text>
          <Text style={styles.itemPrice}>Price: ${item.product.price}</Text>
          <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
          <Text style={styles.itemTotal}>Total: ${item.total_price}</Text>
        </View>
      </View>
    ))
  );

  const renderOrders = () => (
    orders.map((order) => (
      <View key={order.id} style={styles.orderContainer}>
        <Text style={styles.orderHeader}>Order #{order.id}</Text>
        <Text>Status: {order.status}</Text>
        <Text>Payment Status: {order.payment_status}</Text>
        <Text>Order Date: {new Date(order.created_at).toLocaleDateString()}</Text>
        <Text style={styles.sectionHeader}>Items:</Text>
        {renderOrderItems(order.items)}
        <Text style={styles.orderTotal}>Order Total: ${order.total}</Text>
      </View>
    ))
  );

  return (
    <View style={styles.container}>
      {!isLogged ? (
        <View style={styles.loginPromptContainer}>
          <Text style={styles.loginPromptText}>
            Please <Link href="/(auth)/sign-in">Login</Link> first!
          </Text>
        </View>
      ) : (
        <>
          <Header />
          <ScrollView style={styles.scrollView}>
            <Text style={styles.pageTitle}>Order History</Text>
            {orders.length > 0 ? renderOrders() : <Text>No orders found.</Text>}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loginPromptContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loginPromptText: {
    color: "#333",
    fontSize: 16,
  },
  scrollView: {
    padding: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  orderContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  orderHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: "row",
    marginTop: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  itemDetails: {
    marginLeft: 10,
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "#555",
  },
  itemQuantity: {
    fontSize: 14,
    color: "#555",
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#000",
  },
});
