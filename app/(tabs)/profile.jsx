import { StatusBar } from "expo-status-bar";
import { Text, View, ScrolledView, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Header from "@/components/Header";

export default function Profile() {
  return (
    <ScrolledView style={styles.container}>
      <View>
        <Header />
      </View>
      <View className="flex-1 justify-center items-center">
        <Text className="text-white">Hello this Shopping page</Text>
      </View>
    </ScrolledView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
