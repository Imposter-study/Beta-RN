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
            <Text style={styles.headerTitle}>회원가입</Text>
            <View>
              <Ionicons name="chevron-back-sharp" size={24} color="#1a1b1b" />
            </View>
          </View>

          {/* 본문 */}
          <View style={styles.content}>
            <View style={{ gap: 1 }}>
              <Text style={styles.title}>두 가지만 알려주시면</Text>
              <Text style={styles.title}>
                재미있는 캐릭터를 추천해드릴게요😋
              </Text>
              <Text style={styles.subText}>
                이 정보는 대화에 반영되지 않아요
              </Text>
              <Text style={styles.subText}>
                다른 사람들은 볼 수 없으니 안심하세요
              </Text>
            </View>

            {/* 생년월일 입력 */}
            <View style={styles.section}>
              <Text style={styles.label}>생년월일</Text>
              <View style={styles.inputRow}>
                {["year", "month", "day"].map((field, index) => (
                  <TextInput
                    key={field}
                    placeholder={
                      field === "year"
                        ? "연도"
                        : field === "month"
                        ? "월"
                        : "일"
                    }
                    placeholderTextColor="rgba(225, 225,225, 0.5)"
                    value={age}
                    onChangeText={(text) => setAge(text)}
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused("")}
                    keyboardType="number-pad"
                    style={[
                      styles.input,
                      focused === field && styles.inputFocused,
                      field === "year" && { flex: 0.5 },
                      (field === "month" || field === "day") && { flex: 0.25 },
                    ]}
                  />
                ))}
              </View>
            </View>

            {/* 나이 입력 */}
            <View style={styles.section}>
              <Text style={styles.label}>나이</Text>
              <View style={styles.inputRow}>
                <TextInput
                  placeholder="나이"
                  placeholderTextColor="rgba(225, 225,225, 0.5)"
                  value={age}
                  onChangeText={(text) => setAge(text)}
                  onFocus={() => setFocused("age")}
                  onBlur={() => setFocused("")}
                  keyboardType="number-pad"
                  style={[
                    styles.input,
                    focused === "age" && styles.inputFocused,
                    { flex: 1 },
                  ]}
                />
              </View>
            </View>

            {/* 성별 선택 */}
            <View style={styles.section}>
              <Text style={styles.label}>성별</Text>
              <View style={styles.genderRow}>
                {["F", "M"].map((g) => (
                  <TouchableOpacity
                    key={g}
                    onPress={() => setGender(g)}
                    style={[
                      styles.genderButton,
                      gender === g && styles.genderButtonSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.genderText,
                        gender === g && styles.genderTextSelected,
                      ]}
                    >
                      {g === "F" ? "여성" : "남성"}
                    </Text>
                    <Ionicons
                      name="checkmark"
                      size={16}
                      color={gender === g ? "white" : "#ffffffb3"}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* 가입완료 버튼 */}
          <View style={{ marginHorizontal: 20 }}>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              disabled={!isFormFilled}
              onPress={() => navigation.navigate("Home")}
            >
              <Text
                style={[
                  styles.completeButton,
                  isFormFilled
                    ? styles.completeButtonActive
                    : styles.completeButtonDisabled,
                ]}
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
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  subText: {
    color: "#ffffff80",
  },
  section: {
    marginTop: 30,
  },
  label: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  inputRow: {
    flexDirection: "row",
    gap: 5,
    marginVertical: 10,
  },
  input: {
    backgroundColor: "rgb(45,45,45)",
    padding: 10,
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
  genderRow: {
    flexDirection: "row",
    gap: 5,
    marginVertical: 10,
  },
  genderButton: {
    flex: 0.5,
    flexDirection: "row",
    backgroundColor: "rgb(45,45,45)",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 6,
    borderWidth: 0.3,
    borderColor: "rgba(225, 225,225, 0.3)",
  },
  genderButtonSelected: {
    backgroundColor: "#6728ff29",
    borderColor: "rgb(103, 40, 225)",
  },
  genderText: {
    color: "#ffffffb3",
    fontSize: 16,
  },
  genderTextSelected: {
    color: "white",
  },
  completeButton: {
    paddingVertical: 15,
    borderRadius: 6,
    fontSize: 16,
    width: "100%",
    textAlign: "center",
  },
  completeButtonActive: {
    backgroundColor: "rgb(103, 40, 225)",
    color: "white",
  },
  completeButtonDisabled: {
    backgroundColor: "rgb(45, 45, 45)",
    color: "rgb(115, 120, 131)",
  },
});
