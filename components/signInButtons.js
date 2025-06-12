import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

function SignInButton({ togglwModal = () => {} }) {
  const navigation = useNavigation();

  return (
    <View style={styles.loginButtonContainer}>
      {/* beta 회원가입 버튼 */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          togglwModal(); // 모달 닫기
          navigation.navigate("SignUp");
        }}
      >
        {/* <Image
            source={require("../assets/kakao-symbol.png")}
            style={styles.loginIcon}
            /> */}
        <Text style={{ ...styles.loginButtonText, fontSize: 20 }}>
          beta로 시작하기
        </Text>
      </TouchableOpacity>

      {/* 카카오 로그인 버튼 */}
      <View style={styles.loginButton}>
        <Image
          source={require("../assets/kakao-symbol.png")}
          style={styles.loginIcon}
        />
        <Text style={styles.loginButtonText}>카카오 계정으로 계속하기</Text>
      </View>

      {/* 구글 로그인 버튼 */}
      <View style={styles.loginButton}>
        <Image
          source={require("../assets/google-symbol.png")}
          style={styles.googleIcon}
        />
        <Text style={styles.loginButtonText}>Google 계정으로 계속하기</Text>
      </View>

      {/* apple 로그인 버튼 */}
      {/* <View style={styles.appleLoginButton}>
            <Image
            source={require("../assets/apple-symbol.png")}
            style={styles.appleIcon}
            resizeMode="contain"
            />
            <Text style={styles.appleLoginButtonText}>Apple로 계속하기</Text>
        </View> */}
    </View>
  );
}

export default SignInButton;

const styles = StyleSheet.create({
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
    borderRadius: 12,
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
});
