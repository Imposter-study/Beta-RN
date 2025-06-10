import { StyleSheet, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTab from "../components/bottomTab";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

function MyPageScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>마이페이지</Text>
        <Ionicons name="menu" size={24} color="white" />
      </View>

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
            <Text style={styles.loginButtonText}>카카오 계정으로 계속하기</Text>
          </View>

          <View style={styles.loginButton}>
            <Image
              source={require("../assets/google-symbol.png")}
              style={styles.googleIcon}
            />
            <Text style={styles.loginButtonText}>Google 계정으로 계속하기</Text>
          </View>

          <View style={styles.appleLoginButton}>
            <Image
              source={require("../assets/apple-symbol.png")}
              style={styles.appleIcon}
              resizeMode="contain"
            />
            <Text style={styles.appleLoginButtonText}>Apple로 계속하기</Text>
          </View>
        </View>
      </View>

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
