import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTab from "../../components/bottomTab";
import Home from "./home";
import Recommend from "./recommend";
import Ranking from "./ranking";
import Modal from "react-native-modal";
import SignInButton from "../../components/signInButtons";
import * as SecureStore from "expo-secure-store";

function HomeScreen() {
  const navigation = useNavigation();
  const [topTab, setTopTab] = useState("home");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 모달 상태 변경 함수
  const toggleModal = () => setIsModalVisible((prev) => !prev);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await SecureStore.getItemAsync("access");
      setIsLoggedIn(!!token); // 토큰 존재 여부로 로그인 상태 결정
    };

    checkLogin();
  }, []);

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
            {isLoggedIn ? null : (
              <TouchableOpacity
                style={styles.loginButton}
                onPress={toggleModal}
              >
                <Text style={styles.loginButtonText}>로그인</Text>
              </TouchableOpacity>
            )}
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

      {/* 로그인 모달 */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal} // 비깥 눌렀을 때 닫힘
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: "rgb(38,38,39)",
            flex: 0.45,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            // minHeight:"50%"
          }}
        >
          {/* 헤더 */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomColor: "#ffffff0d",
              borderBottomWidth: 0.5,
              paddingVertical: 15,
              paddingHorizontal: 10,
            }}
          >
            <Text></Text>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              로그인/회원가입
            </Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text
                style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
              >
                x
              </Text>
            </TouchableOpacity>
          </View>
          {/* 본문 */}
          <View style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <Text
                style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
              >
                로그인하고 다양한 AI 캐릭터와
              </Text>
              <Text
                style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
              >
                자유롭게 대화해보세요
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                // backgroundColor: "tomato",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SignInButton togglwModal={toggleModal} />
            </View>
          </View>
        </View>
      </Modal>
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
