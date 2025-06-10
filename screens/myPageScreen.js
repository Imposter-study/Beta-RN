import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTab from "../components/bottomTab";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

function MyPageScreen() {
  const navigation = useNavigation();
  const isLoggedIn = false;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>마이페이지</Text>
        <Ionicons name="menu" size={24} color="white" />
      </View>

      {!isLoggedIn ? (
        <View style={styles.content}>
          <View style={styles.intro}>
            <Text style={styles.introTitle}>beta</Text>
            <Text style={styles.introSubtitle}>
              다양한 AI 캐릭터와 나만의 스토리를 만들어보세요
            </Text>
          </View>

          <View style={styles.loginButtonContainer}>
            <View style={styles.loginButton}>
              <Image
                source={require("../assets/kakao-symbol.png")}
                style={styles.loginIcon}
              />
              <Text style={styles.loginButtonText}>
                카카오 계정으로 계속하기
              </Text>
            </View>

            <View style={styles.loginButton}>
              <Image
                source={require("../assets/google-symbol.png")}
                style={styles.googleIcon}
              />
              <Text style={styles.loginButtonText}>
                Google 계정으로 계속하기
              </Text>
            </View>

            {/* <View style={styles.appleLoginButton}>
              <Image
                source={require("../assets/apple-symbol.png")}
                style={styles.appleIcon}
                resizeMode="contain"
              />
              <Text style={styles.appleLoginButtonText}>Apple로 계속하기</Text>
            </View> */}
          </View>
        </View>
      ) : (
        <ScrollView>
          {/* 회원 정보 */}
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginLeft: 20,
              marginVertical: 10,
            }}
          >
            <FontAwesome name="user-circle-o" size={70} color="gray" />
            <View style={{ justifyContent: "center", gap: 3 }}>
              <Text style={{ color: "white", fontSize: 24, fontWeight: "500" }}>
                닉네임
              </Text>
              <Text style={{ color: "#ffffff80", fontSize: 16 }}>@아이디</Text>
            </View>
          </View>

          {/* 팔로잉, 팔로워 */}
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              marginLeft: 20,
              marginBlock: 10,
            }}
          >
            <View style={{ flexDirection: "row", gap: 3 }}>
              <Text style={{ color: "white" }}>0</Text>
              <Text style={{ color: "#ffffff80" }}>팔로잉</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 3 }}>
              <Text style={{ color: "white" }}>0</Text>
              <Text style={{ color: "#ffffff80" }}>팔로워</Text>
            </View>
          </View>

          {/* 프로필 공유 및 수정 버튼 */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 5,
              marginHorizontal: 20,
              marginBottom: 50,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "rgb(62, 62, 65)",
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  paddingVertical: 10,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                프로필 공유
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "rgb(62, 62, 65)",
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  paddingVertical: 10,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                프로필 편집
              </Text>
            </TouchableOpacity>
          </View>

          {/* 유료 서비스 관리 */}
          <View style={{ marginHorizontal: 20, marginBottom: 50 }}>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "500",
                marginBottom: 10,
              }}
            >
              내 피스 / zeta pro
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "rgb(38,39,39)",
                paddingVertical: 10,
                paddingHorizontal: 14,
                borderTopRightRadius: 12,
                borderTopLeftRadius: 12,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <FontAwesome name="bitcoin" size={24} color="purple" />
                <Text style={{ color: "white", fontSize: 18 }}>0</Text>
              </View>
              <MaterialIcons name="navigate-next" size={24} color="#ffffff80" />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "rgb(38,39,39)",
                paddingVertical: 10,
                paddingHorizontal: 14,
                borderBottomRightRadius: 12,
                borderBottomLeftRadius: 12,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text
                  style={{ color: "white", fontSize: 14, fontWeight: "900" }}
                >
                  zeta
                </Text>
                <Text
                  style={{ color: "white", fontSize: 14, fontWeight: "200" }}
                >
                  pro
                </Text>
                <Text style={{ color: "#ffffff80", fontSize: 14 }}>
                  광고 없이 zeta하기
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#ffffff80" }}>구매하기</Text>
                <MaterialIcons
                  name="navigate-next"
                  size={24}
                  color="#ffffff80"
                />
              </View>
            </View>
          </View>

          {/* 케릭터 관리 */}
          <View style={{ marginHorizontal: 20, marginBottom: 50 }}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
              캐릭터 관리
            </Text>
            <View style={{ alignItems: "center", padding: 30, gap: 10 }}>
              <Text style={{ color: "#ffffff80", fontSize: 16 }}>
                아직 제작한 캐릭터가 없어요
              </Text>
              <Text style={{ color: "white", fontWeight: "500", fontSize: 18 }}>
                내가 원하는 캐릭터를 직접 제작해볼까요?
              </Text>
              <TouchableOpacity style={{ marginVertical: 10 }}>
                <Text
                  style={{
                    color: "white",
                    backgroundColor: "rgb(82, 32, 204)",
                    borderRadius: 6,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    fontSize: 18,
                  }}
                >
                  캐릭터 제작하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
      <BottomTab
        activeTab="Mypage"
        onTabPress={(tabName) => navigation.navigate(tabName)}
      />
    </SafeAreaView>
  );
}

export default MyPageScreen;

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
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 5,
  },
  intro: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  introTitle: {
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
  },
  introSubtitle: {
    color: "rgb(209, 213, 219)",
  },
  loginButtonContainer: {
    gap: 10,
    width: "90%",
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    backgroundColor: "rgb(38, 39, 39)",
    borderColor: "rgb(62, 62, 65)",
    borderWidth: 0.5,
    paddingVertical: 7,
    borderRadius: 8,
  },
  loginIcon: {
    width: 24,
    height: 24,
  },
  googleIcon: {
    width: 24,
    height: 24,
    backgroundColor: "white",
    borderRadius: 12, // 원형
  },
  appleLoginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    backgroundColor: "white",
    borderColor: "rgb(62, 62, 65)",
    borderWidth: 0.5,
    paddingVertical: 7,
    borderRadius: 8,
  },
  appleIcon: {
    width: 24,
    height: 24,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
  },
  appleLoginButtonText: {
    color: "black",
    fontSize: 18,
  },
});
