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
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

function SignUpStep2() {
  const navigation = useNavigation();

  const [chatNickname, setChatNickname] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {/* 헤더 */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-sharp" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>회원가입</Text>
            <View>
              <Ionicons name="chevron-back-sharp" size={24} color="#1a1b1b" />
            </View>
          </View>

          {/* 본문 */}
          <View style={styles.content}>
            <View style={styles.description}>
              <Text style={styles.descriptionTitle}>
                beta에서는 무잇이든 될 수 있어요🧚
              </Text>
              <Text style={styles.descriptionText}>
                대화할 때 사용할 프로필을 만들어보세요
              </Text>
              <Text style={styles.descriptionText}>
                나중에도 수정할 수 있어요
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>이름</Text>
              <TextInput
                placeholder="캐릭터가 날 이렇게 부를거에요"
                placeholderTextColor="rgba(225, 225,225, 0.5)"
                value={chatNickname}
                onChangeText={(text) => setChatNickname(text)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={[styles.textInput, focused && styles.textInputFocused]}
              />
            </View>
          </View>

          {/*  다음 버튼 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonWrapper}
              disabled={!chatNickname}
              onPress={() => navigation.navigate("SignUpStep3")}
            >
              <Text
                style={[
                  styles.nextButton,
                  chatNickname
                    ? styles.nextButtonActive
                    : styles.nextButtonInactive,
                ]}
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

export default SignUpStep2;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
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
  content: {
    marginHorizontal: 15,
    marginTop: 20,
    flex: 1,
  },
  description: {
    gap: 1,
  },
  descriptionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionText: {
    color: "#ffffff80",
  },
  inputContainer: {
    marginTop: 30,
  },
  inputLabel: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  textInput: {
    backgroundColor: "rgb(45,45,45)",
    padding: 10,
    marginVertical: 10,
    borderRadius: 6,
    borderWidth: 0.3,
    borderColor: "rgba(225, 225,225, 0.3)",
    fontSize: 16,
    color: "white",
  },
  textInputFocused: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "rgb(103, 40, 225)",
  },
  buttonContainer: {
    marginHorizontal: 20,
  },
  buttonWrapper: {
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
  nextButtonInactive: {
    backgroundColor: "rgb(45, 45, 45)",
    color: "rgb(115, 120, 131)",
  },
});
