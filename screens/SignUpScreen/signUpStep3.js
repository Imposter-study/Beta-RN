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

function SignUpStep3() {
  const navigation = useNavigation();

  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("O");
  const [focused, setFocused] = useState(false);

  const isFormFilled = age > 0 && gender !== "O";

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
                두 가지만 알려주시면
              </Text>
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                재미있는 캐릭터를 추천해드릴게요😋
              </Text>
              <Text style={{ color: "#ffffff80" }}>
                이 정보는 대화에 반영되지 않아요
              </Text>
              <Text style={{ color: "#ffffff80" }}>
                다른 사람들은 볼 수 없으니 안심하세요
              </Text>
            </View>

            {/* 생년월일 입력 */}
            <View style={{ marginTop: 30 }}>
              <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
                생년월일
              </Text>
              <View
                style={{ flexDirection: "row", gap: 5, marginVertical: 10 }}
              >
                <TextInput
                  placeholder="연도"
                  placeholderTextColor="rgba(225, 225,225, 0.5)"
                  value={age}
                  onChangeText={(text) => setAge(text)}
                  onFocus={() => setFocused("year")}
                  onBlur={() => setFocused("")}
                  keyboardType="number-pad"
                  style={{
                    flex: 0.5,
                    backgroundColor:
                      focused === "year" ? "transparent" : "rgb(45,45,45)",
                    padding: 10,
                    borderRadius: 6,
                    borderWidth: focused === "year" ? 1.5 : 0.3,
                    borderColor:
                      focused === "year"
                        ? "rgb(103, 40, 225)"
                        : "rgba(225, 225,225, 0.3)",
                    fontSize: 16,
                    color: "white",
                  }}
                />
                <TextInput
                  placeholder="월"
                  placeholderTextColor="rgba(225, 225,225, 0.5)"
                  value={age}
                  onChangeText={(text) => setAge(text)}
                  onFocus={() => setFocused("month")}
                  onBlur={() => setFocused("")}
                  keyboardType="number-pad"
                  style={{
                    flex: 0.25,
                    backgroundColor:
                      focused === "month" ? "transparent" : "rgb(45,45,45)",
                    padding: 10,
                    borderRadius: 6,
                    borderWidth: focused === "month" ? 1.5 : 0.3,
                    borderColor:
                      focused === "month"
                        ? "rgb(103, 40, 225)"
                        : "rgba(225, 225,225, 0.3)",
                    fontSize: 16,
                    color: "white",
                  }}
                />
                <TextInput
                  placeholder="일"
                  placeholderTextColor="rgba(225, 225,225, 0.5)"
                  value={age}
                  onChangeText={(text) => setAge(text)}
                  onFocus={() => setFocused("day")}
                  onBlur={() => setFocused("")}
                  keyboardType="number-pad"
                  style={{
                    flex: 0.25,
                    backgroundColor:
                      focused === "day" ? "transparent" : "rgb(45,45,45)",
                    padding: 10,
                    borderRadius: 6,
                    borderWidth: focused === "day" ? 1.5 : 0.3,
                    borderColor:
                      focused === "day"
                        ? "rgb(103, 40, 225)"
                        : "rgba(225, 225,225, 0.3)",
                    fontSize: 16,
                    color: "white",
                  }}
                />
              </View>
            </View>

            {/* 나이 입력 */}
            <View style={{ marginTop: 30 }}>
              <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
                나이
              </Text>
              <View
                style={{ flexDirection: "row", gap: 5, marginVertical: 10 }}
              >
                <TextInput
                  placeholder="나이"
                  placeholderTextColor="rgba(225, 225,225, 0.5)"
                  value={age}
                  onChangeText={(text) => setAge(text)}
                  onFocus={() => setFocused("age")}
                  onBlur={() => setFocused("")}
                  keyboardType="number-pad"
                  style={{
                    flex: 1,
                    backgroundColor:
                      focused === "age" ? "transparent" : "rgb(45,45,45)",
                    padding: 10,
                    borderRadius: 6,
                    borderWidth: focused === "age" ? 1.5 : 0.3,
                    borderColor:
                      focused === "age"
                        ? "rgb(103, 40, 225)"
                        : "rgba(225, 225,225, 0.3)",
                    fontSize: 16,
                    color: "white",
                  }}
                />
              </View>
            </View>

            {/* 성별 선택 */}
            <View style={{ marginTop: 30 }}>
              <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
                성별
              </Text>
              <View
                style={{ flexDirection: "row", gap: 5, marginVertical: 10 }}
              >
                <TouchableOpacity
                  onPress={() => setGender("F")}
                  style={{
                    flex: 0.5,
                    flexDirection: "row",
                    backgroundColor:
                      gender === "F" ? "#6728ff29" : "rgb(45,45,45)",
                    padding: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 6,
                    borderWidth: 0.3,
                    borderColor:
                      gender === "F"
                        ? "rgb(103, 40, 225)"
                        : "rgba(225, 225,225, 0.3)",
                  }}
                >
                  <Text
                    style={{
                      color: gender === "F" ? "white" : "#ffffffb3",
                      fontSize: 16,
                    }}
                  >
                    여성
                  </Text>
                  <Ionicons
                    name="checkmark"
                    size={16}
                    color={gender === "F" ? "white" : "#ffffffb3"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setGender("M")}
                  style={{
                    flex: 0.5,
                    flexDirection: "row",
                    backgroundColor:
                      gender === "M" ? "#6728ff29" : "rgb(45,45,45)",
                    padding: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 6,
                    borderWidth: 0.3,
                    borderColor:
                      gender === "M"
                        ? "rgb(103, 40, 225)"
                        : "rgba(225, 225,225, 0.3)",
                  }}
                >
                  <Text
                    style={{
                      color: gender === "M" ? "white" : "#ffffffb3",
                      fontSize: 16,
                    }}
                  >
                    남성
                  </Text>
                  <Ionicons
                    name="checkmark"
                    size={16}
                    color={gender === "M" ? "white" : "#ffffffb3"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/*  가입완료 버튼 */}
          <View style={{ marginHorizontal: 20 }}>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              disabled={!isFormFilled} // 입력이 안 되면 비활성화
              onPress={() => navigation.navigate("Home")}
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
                가입 완료
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default SignUpStep3;

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
