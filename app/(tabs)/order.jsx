import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Link } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import Header from "@/components/Header";
import { fetchOrderHistory } from "@/hooks/useFetch";
import { format } from "date-fns";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Order = () => {
  const route = useRouter();
  const { isLogged } = useGlobalContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [paymentType, setPaymentType] = useState("Direct Bank Payment");

  const openModal = (order, buttonType, amount) => {
    setSelectedOrder({ order, buttonType, amount });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setPaymentType("Direct Bank Payment");
  };

  const handleSubmitPayment = () => {
    const { order, buttonType, amount } = selectedOrder;
     if (paymentType === "Direct Bank Payment") {
      handleBankPayment(order, buttonType, amount);
    }
    closeModal();
  };
  const handleBankPayment = (order_id, buttonType, amount) => {
    if (buttonType === "advance"){
      amount = (amount *0.3).toFixed(2);
    }
    console.log(order_id);
    console.log("another one: ", buttonType);
    console.log(amount);
    const paymentData = {
      orderId: order_id,
      amountToPay: amount,
      paymentStatus: buttonType,
    };
    route.push(
      `/directpayment?paymentData=${encodeURIComponent(
        JSON.stringify(paymentData)
      )}`
    );
  };

  const fetchOrderHistorys = async () => {
    try {
      const result = await fetchOrderHistory();
      // Sort the orders in descending order (newest first)
      const sortedResult = result.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setOrders(sortedResult);
    } catch (error) {
      console.error("Error fetching order history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLogged) fetchOrderHistorys();
  }, [isLogged]);

  const renderOrderItems = (items) =>
    items.map((item) => (
      <View key={item.id} style={styles.itemContainer}>
        <Image
          source={{
            uri: item.product?.image || "https://via.placeholder.com/60",
          }}
          style={styles.productImage}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>
            {item.product?.item_name || "Unknown Product"}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.itemPrice}>${item.product?.price}</Text>
            <Text style={styles.itemQuantity}>x {item.quantity}</Text>
          </View>
          <Text style={styles.itemTotal}>Total: ${item.total_price}</Text>
        </View>
      </View>
    ));

  const renderOrderStatus = (status) => {
    let statusStyle = {};
    switch (status.toLowerCase()) {
      case "assigned":
        statusStyle = styles.statusCompleted;
        break;
      case "pending":
        statusStyle = styles.statusPending;
        break;
      case "cancelled":
        statusStyle = styles.statusCancelled;
        break;
      default:
        statusStyle = styles.statusDefault;
    }
    return (
      <View style={[styles.statusBadge, statusStyle]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    );
  };

  const renderOrders = () => {
    if (loading) {
      return (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      );
    }

    if (!orders.length) {
      return (
        <Text style={styles.noOrdersText}>
          No orders found. Start shopping!
        </Text>
      );
    }

    return orders.map((order) => (
      <View key={order.id} style={styles.orderContainer}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          {renderOrderStatus(order.status)}
        </View>

        <View style={styles.orderMeta}>
          <Text style={styles.metaText}>
            Date: {format(new Date(order.created_at), "MMM dd, yyyy HH:mm")}
          </Text>
          <View style={styles.paymentStatusContainer}>
          <Text style={[styles.metaText, {marginRight:5}]}>
            Payment: 
          </Text>
            {order.payment_status === "Fully Paid" ? (
              <FontAwesome
                name="check-circle"
                style={[styles.icon, styles.green]}
              />
            ) : order.payment_status === "Pending" ? (
              <FontAwesome
                name="exclamation-circle"
                style={[styles.icon, styles.yellow]}
              />
            ) : order.payment_status === "Partial Payment" ? (
              <FontAwesome
                name="exclamation-triangle"
                style={[styles.icon, styles.orange]}
              />
            ) : (
              <FontAwesome
                name="times-circle"
                style={[styles.icon, styles.red]}
              />
            )}
            <Text style={styles.text}>
              {order.payment_status === "Fully Paid"
                ? "Fully Paid"
                : order.payment_status === "Pending"
                ? "Pending"
                : order.payment_status === "Partial Payment"
                ? "Partial Payment"
                : "Cancel"}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionHeader}>ITEMS</Text>
        {renderOrderItems(order.items)}

        <View style={styles.totalContainer}>
          <Text style={styles.orderTotal}>Order Total:</Text>
          <Text style={styles.orderTotal}>${order.total}</Text>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {!isLogged ? (
        <View style={styles.loginPromptContainer}>
          <Text style={styles.loginPromptText}>
            Please{" "}
            <Link href="/(auth)/sign-in" style={styles.loginLink}>
              Login
            </Link>{" "}
            to view your orders
          </Text>
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <Header />
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.pageTitle}>Order History</Text>
            <Text style={styles.ordersCount}>{orders.length} orders found</Text>
            {renderOrders()}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  loginPromptContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loginPromptText: {
    fontSize: 16,
    color: "#666",
  },
  loginLink: {
    color: "#007AFF",
    fontWeight: "600",
  },
  pageTitle: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  ordersCount: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  orderContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  orderMeta: {
    marginBottom: 16,
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: "#666",
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "400",
    textTransform: "uppercase",
  },
  statusCompleted: {
    backgroundColor: "rgba(63, 176, 39, 0.8)",
  },
  statusPending: {
    backgroundColor: "#FFF3E0",
  },
  statusCancelled: {
    backgroundColor: "#FFEBEE",
  },
  statusDefault: {
    backgroundColor: "#F5F5F5",
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
    marginBottom: 12,
    letterSpacing: 0.8,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: "#666",
  },
  itemQuantity: {
    fontSize: 14,
    color: "#666",
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  noOrdersText: {
    textAlign: "center",
    color: "#666",
    marginTop: 40,
    fontSize: 16,
  },
  loader: {
    marginTop: 40,
  },
  paymentStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent:"conter",
  },
  icon: {
    marginRight: 8,
    fontSize: 14, // Adjust for your needs
  },
  green: {
    color: "#16a34a", // Tailwind green-600
  },
  yellow: {
    color: "#facc15", // Tailwind yellow-500
  },
  orange: {
    color: "#f97316", // Tailwind orange-500
  },
  red: {
    color: "#ef4444", // Tailwind red-500
  },
  text: {
    fontWeight: "500", // Tailwind font-medium
  },
});
