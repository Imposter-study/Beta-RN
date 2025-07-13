import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import accountAPI from "../../../apis/accountAPI";

function MoreScreen() {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = SecureStore.getItemAsync("access");
      setIsLoggedIn(!!token); // 토큰 존재 여부로 로그인 상태 결정
    };

    checkLogin();
  }, []);

  const handleSignOut = async () => {
    const refresh = await SecureStore.getItemAsync("refresh");
    // const access = await SecureStore.getItemAsync("access");
    // console.log("access :", access, "\nrefresh :", refresh);
    accountAPI
      .post("signout/", { refresh })
      .then(async (response) => {
        console.log(response.data);
        await SecureStore.deleteItemAsync("access");
        await SecureStore.deleteItemAsync("refresh");
        await SecureStore.deleteItemAsync("uuid");
        navigation.navigate("Home");
      })
      .catch(async (error) => {
        console.log("로그아웃 실패", error.response);
        await SecureStore.deleteItemAsync("access");
        await SecureStore.deleteItemAsync("refresh");
        await SecureStore.deleteItemAsync("nickname");
        navigation.navigate("Home");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-sharp" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}> 더보기 </Text>
        <View></View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {/* 고객센터 */}
        <View style={{ marginBottom: 30 }}>
          <Text
            style={{
              color: "#ffffff80",
              paddingVertical: 5,
              borderBottomColor: "#ffffff14",
              borderBottomWidth: 1,
            }}
          >
            고객센터
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "white", fontSize: 18, paddingVertical: 10 }}>
              공지사항
            </Text>
            <Ionicons
              name="chevron-forward-sharp"
              size={18}
              color="#ffffff80"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "white", fontSize: 18, paddingVertical: 10 }}>
              고객센터
            </Text>
            <Ionicons
              name="chevron-forward-sharp"
              size={18}
              color="#ffffff80"
            />
          </TouchableOpacity>
        </View>

        {isLoggedIn ? (
          <>
            {/* 알림・마케팅 */}
            <View style={{ marginBottom: 30 }}>
              <Text
                style={{
                  color: "#ffffff80",
                  paddingVertical: 5,
                  borderBottomColor: "#ffffff14",
                  borderBottomWidth: 1,
                }}
              >
                알림・마케팅
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 18, paddingVertical: 10 }}
                >
                  마케팅 수신 동의
                </Text>
                <Ionicons
                  name="chevron-forward-sharp"
                  size={18}
                  color="#ffffff80"
                />
              </TouchableOpacity>
            </View>

            {/* 내 계정 관리 */}
            <View style={{ marginBottom: 30 }}>
              <Text
                style={{
                  color: "#ffffff80",
                  paddingVertical: 5,
                  borderBottomColor: "#ffffff14",
                  borderBottomWidth: 1,
                }}
              >
                계정 정보
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("AccountInfo")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 18, paddingVertical: 10 }}
                >
                  계정 정보
                </Text>
                <Ionicons
                  name="chevron-forward-sharp"
                  size={18}
                  color="#ffffff80"
                />
              </TouchableOpacity>
            </View>

            {/* 차단 관리 */}
            <View style={{ marginBottom: 30 }}>
              <Text
                style={{
                  color: "#ffffff80",
                  paddingVertical: 5,
                  borderBottomColor: "#ffffff14",
                  borderBottomWidth: 1,
                }}
              >
                차단 관리
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 18, paddingVertical: 10 }}
                >
                  차단한 크리에이터
                </Text>
                <Ionicons
                  name="chevron-forward-sharp"
                  size={18}
                  color="#ffffff80"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 18, paddingVertical: 10 }}
                >
                  차단한 캐릭터
                </Text>
                <Ionicons
                  name="chevron-forward-sharp"
                  size={18}
                  color="#ffffff80"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 18, paddingVertical: 10 }}
                >
                  차단한 해시태그
                </Text>
                <Ionicons
                  name="chevron-forward-sharp"
                  size={18}
                  color="#ffffff80"
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                borderColor: "#ffffff0d",
                borderWidth: 2,
                marginBottom: 20,
              }}
            />

            <TouchableOpacity onPress={handleSignOut}>
              <Text style={{ color: "#ffffff80", fontSize: 16 }}>로그아웃</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1a1b1b",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomColor: "#ffffff0d",
    borderBottomWidth: 0.3,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
  scrollContainer: {
    padding: 10,
    marginHorizontal: 10,
  },
});
