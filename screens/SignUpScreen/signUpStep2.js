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

  const [nickname, setNickname] = useState();
  const [focused, setFocused] = useState(false);

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

          {/* 본문 */}
          <View style={{ marginHorizontal: 15, marginTop: 20, flex: 1 }}>
            <View style={{ gap: 1 }}>
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                beta에서는 무잇이든 될 수 있어요🧚
              </Text>
              <Text style={{ color: "#ffffff80" }}>
                대화할 때 사용할 프로필을 만들어보세요
              </Text>
              <Text style={{ color: "#ffffff80" }}>
                나중에도 수정할 수 있어요
              </Text>
            </View>

            <View style={{ marginTop: 30 }}>
              <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
                이름
              </Text>
              <TextInput
                placeholder="캐릭터가 날 이렇게 부를거에요"
                placeholderTextColor="rgba(225, 225,225, 0.5)"
                value={nickname}
                onChangeText={(text) => setNickname(text)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                  backgroundColor: focused ? "transparent" : "rgb(45,45,45)",
                  padding: 10,
                  marginVertical: 10,
                  borderRadius: 6,
                  borderWidth: focused ? 1.5 : 0.3,
                  borderColor: focused
                    ? "rgb(103, 40, 225)"
                    : "rgba(225, 225,225, 0.3)",
                  fontSize: 16,
                  color: "white",
                }}
              />
            </View>
          </View>

          {/*  다음 버튼 */}
          <View style={{ marginHorizontal: 20 }}>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              disabled={!nickname} // 입력이 안 되면 비활성화
              onPress={() => navigation.navigate("SignUpStep3")}
            >
              <Text
                style={{
                  backgroundColor: nickname
                    ? "rgb(103, 40, 225)"
                    : "rgb(45, 45, 45)",
                  color: nickname ? "white" : "rgb(115, 120, 131)",
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

export default SignUpStep2;

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
