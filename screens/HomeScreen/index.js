import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTab from "../../components/bottomTab";
import Home from "./home";
import Recommend from "./recommend";

const data = Array(20).fill(null);
const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.45;

function HomeScreen() {
  const navigation = useNavigation();
  const [topTab, setTopTab] = useState("home");

  const renderItem = ({ index }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <Image
          source={{
            uri: "https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800",
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.name}>캐릭터 이름 {index + 1}</Text>
          <Text style={styles.intro}>캐릭터 인트로 소개글</Text>
          <Text style={styles.tag}>#해시태그</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
            <TouchableOpacity>
              <Text style={styles.navInactive}>랭킹</Text>
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
  flatListContent: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    marginTop: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  card: {
    marginBottom: 6,
    gap: 4,
    width: imageWidth,
  },
  image: {
    width: "100%",
    height: imageWidth,
    borderRadius: 12,
  },
  name: {
    color: "white",
    fontWeight: "bold",
  },
  intro: {
    color: "#ffffff80",
  },
  tag: {
    color: "#ffffffb3",
  },
});
