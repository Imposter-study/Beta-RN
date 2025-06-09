import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTab from "../../components/bottomTab";
import Home from "./home";
import Recommend from "./recommend";
import Ranking from "./ranking";

function HomeScreen() {
  const navigation = useNavigation();
  const [topTab, setTopTab] = useState("home");

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.container}>
        {/* 상단 메뉴 */}
        <View style={styles.topBar}>
          <View style={styles.navLeft}>
            <TouchableOpacity onPress={() => setTopTab("home")}>
              <Text
                style={
                  topTab === "home" ? styles.navActive : styles.navInactive
                }
              >
                홈
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTopTab("recommend")}>
              <Text
                style={
                  topTab == "recommend" ? styles.navActive : styles.navInactive
                }
              >
                추천
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTopTab("ranking")}>
              <Text
                style={
                  topTab === "ranking" ? styles.navActive : styles.navInactive
                }
              >
                랭킹
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.navRight}>
            <TouchableOpacity>
              <Feather name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>
          </View>
        </View>

        {topTab === "home" && <Home />}
        {topTab === "recommend" && <Recommend />}
        {topTab === "ranking" && <Ranking />}

        {/* 하단 메뉴 */}
        <BottomTab
          activeTab="Home"
          onTabPress={(tabName) => navigation.navigate(tabName)}
        />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1a1b1b",
  },
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#ffffff20",
    borderBottomWidth: 0.3,
  },
  navLeft: {
    flexDirection: "row",
    gap: 10,
    padding: 16,
    alignItems: "center",
  },
  navRight: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    gap: 24,
  },
  navActive: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  navInactive: {
    color: "#ffffff80",
    fontWeight: "bold",
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: "#5220cc",
    borderRadius: 6,
    padding: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
});
