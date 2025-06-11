import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

function SignUpStep1() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [focused, setFocused] = useState("");

  // 아이디와 패스워드가 모두 입력됐는지 확인
  const isFormFilled =
    username.length > 0 && password.length > 0 && passwordConfirm.length > 0;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {/* 헤더 */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-sharp" size={24} color="white" />
            </TouchableOpacity>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
              회원가입
            </Text>
            <View>
              <Ionicons name="chevron-back-sharp" size={24} color="#1a1b1b" />
            </View>
          </View>

          {/* 입력 내용 */}
          <View style={{ flex: 1, marginHorizontal: 15, marginTop: 20 }}>
            <View style={{ marginTop: 30 }}>
              {/* 아이디 입력 */}
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "500" }}
                >
                  아이디
                </Text>
                <TextInput
                  placeholder="아이디"
                  placeholderTextColor="rgba(225, 225,225, 0.5)"
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                  onFocus={() => setFocused("username")}
                  onBlur={() => setFocused("")}
                  style={{
                    backgroundColor:
                      focused === "username" ? "transparent" : "rgb(45,45,45)",
                    padding: 10,
                    marginVertical: 10,
                    borderRadius: 6,
                    borderWidth: focused === "username" ? 1.5 : 0.3,
                    borderColor:
                      focused === "username"
                        ? "rgb(103, 40, 225)"
                        : "rgba(225, 225,225, 0.3)",
                    fontSize: 16,
                    color: "white",
                  }}
                />
              </View>

              {/* 패스워드 입력 */}
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "500" }}
                >
                  패스워드
                </Text>
                <TextInput
                  placeholder="패스워드"
                  placeholderTextColor="rgba(225, 225,225, 0.5)"
                  secureTextEntry={true} // 패스워드 입력 모드
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  style={{
                    backgroundColor:
                      focused === "password" ? "transparent" : "rgb(45,45,45)",
                    padding: 10,
                    marginVertical: 10,
                    borderRadius: 6,
                    borderWidth: focused === "password" ? 1.5 : 0.3,
                    borderColor:
                      focused === "password"
                        ? "rgb(103, 40, 225)"
                        : "rgba(225, 225,225, 0.3)",
                    fontSize: 16,
                    color: "white",
                  }}
                />
              </View>

              {/* 패스워드 확인 입력 */}
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "500" }}
                >
                  패스워드 확인
                </Text>
                <TextInput
                  placeholder="패스워드 확인"
                  placeholderTextColor="rgba(225, 225,225, 0.5)"
                  secureTextEntry={true} // 패스워드 입력 모드
                  value={passwordConfirm}
                  onChangeText={(text) => setPasswordConfirm(text)}
                  onFocus={() => setFocused("passwordConfirm")}
                  onBlur={() => setFocused("")}
                  style={{
                    backgroundColor:
                      focused === "passwordConfirm" ? "transparent" : "rgb(45,45,45)",
                    padding: 10,
                    marginVertical: 10,
                    borderRadius: 6,
                    borderWidth: focused === "passwordConfirm" ? 1.5 : 0.3,
                    borderColor:
                      focused === "passwordConfirm"
                        ? "rgb(103, 40, 225)"
                        : "rgba(225, 225,225, 0.3)",
                    fontSize: 16,
                    color: "white",
                  }}
                />
              </View>
            </View>
          </View>

          {/*  다음 버튼 */}
          <View style={{ marginHorizontal: 20 }}>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              disabled={!isFormFilled} // 입력이 안 되면 비활성화
            >
              <Text
                style={{
                  backgroundColor: isFormFilled
                    ? "rgb(103, 40, 225)"
                    : "rgb(45, 45, 45)",
                  color: isFormFilled ? "white" : "rgb(115, 120, 131)",
                  paddingVertical: 15,
                  borderRadius: 6,
                  fontSize: 16,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                다음
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default SignUpStep1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1a1b1b",
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomColor: "#ffffff0d",
    borderBottomWidth: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
