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
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../config";
import * as SecureStore from "expo-secure-store";

function SignInScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState("");

  // 아이디와 패스워드가 모두 입력됐는지 확인
  const isFormFilled = username.length > 0 && password.length > 0;

  // 로그인 요청 함수
  const requestSignin = () => {
    axios
      .post(API_URL + "accounts/signin/", {
        username,
        password,
      })
      .then(async (response) => {
        console.log("로그인 성공", response.data);
        const { access, refresh } = response.data;
        await SecureStore.setItemAsync("access", access);
        await SecureStore.setItemAsync("refresh", refresh);
      })
      .catch((error) => {
        console.log("로그인 실패", error);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} //키보드가 올라올 때, 얼마나 화면을 위로 밀어올릴지 조절
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {/* 헤더 */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-sharp" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>로그인</Text>
            <View>
              <Ionicons name="chevron-back-sharp" size={24} color="#1a1b1b" />
            </View>
          </View>

          {/* 입력 내용 */}
          <ScrollView
            style={styles.formContainer}
            keyboardShouldPersistTaps="handled" // 스크롤 영역 터치 시 키보드 닫힘
          >
            <View style={styles.inputGroup}>
              {/* 아이디 입력 */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>아이디</Text>
                <TextInput
                  placeholder="아이디"
                  placeholderTextColor="rgba(225, 225,225, 0.5)"
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                  onFocus={() => setFocused("username")}
                  onBlur={() => setFocused("")}
                  style={[
                    styles.input,
                    focused === "username" && styles.inputFocused,
                  ]}
                />
              </View>

              {/* 패스워드 입력 */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>패스워드</Text>
                <TextInput
                  placeholder="패스워드"
                  placeholderTextColor="rgba(225, 225,225, 0.5)"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  style={[
                    styles.input,
                    focused === "password" && styles.inputFocused,
                  ]}
                />
              </View>
            </View>
          </ScrollView>

          {/* 다음 버튼 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.nextButtonWrapper}
              disabled={!isFormFilled}
              onPress={() => {
                requestSignin();
                navigation.navigate("Home");
              }}
            >
              <Text
                style={[
                  styles.nextButton,
                  isFormFilled
                    ? styles.nextButtonActive
                    : styles.nextButtonDisabled,
                ]}
              >
                로그인
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default SignInScreen;

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
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  formContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 20,
  },
  inputGroup: {
    marginTop: 30,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  inputLabel: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "rgb(45,45,45)",
    padding: 10,
    marginVertical: 10,
    borderRadius: 6,
    borderWidth: 0.3,
    borderColor: "rgba(225, 225,225, 0.3)",
    fontSize: 16,
    color: "white",
  },
  inputFocused: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "rgb(103, 40, 225)",
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  warningText: {
    color: "#ffffff80",
  },
  buttonContainer: {
    marginHorizontal: 20,
  },
  nextButtonWrapper: {
    alignItems: "center",
  },
  nextButton: {
    paddingVertical: 15,
    borderRadius: 6,
    fontSize: 16,
    width: "100%",
    textAlign: "center",
  },
  nextButtonActive: {
    backgroundColor: "rgb(103, 40, 225)",
    color: "white",
  },
  nextButtonDisabled: {
    backgroundColor: "rgb(45, 45, 45)",
    color: "rgb(115, 120, 131)",
  },
});
