import React from "react";
import { SafeAreaView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import Header from "./Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Content below the SafeArea */}
      <ThemedView style={{ flex: 1 }}>
        <Header /> {/* Header starts after the SafeArea */}
        {children} {/* Page content goes here */}
      </ThemedView>
    </SafeAreaView>
  );
}
