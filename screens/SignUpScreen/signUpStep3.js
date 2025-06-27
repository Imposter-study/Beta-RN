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
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import useSignupStore, {
  useSocialSignupStroe,
} from "../../stores/useSignupStore";
import { API_URL } from "../../config";
import axios from "axios";
import Toast from "react-native-toast-message";

function SignUpStep3() {
  const navigation = useNavigation();

  const [birthday, setBirthday] = useState({ year: "", month: "", date: "" });
  const { setBirthDate, gender, setGender, setClear } = useSignupStore();
  const { nickname } = useSocialSignupStroe();
  const [focused, setFocused] = useState(false);

  const isFormFilled =
    birthday.year.length === 4 &&
    birthday.month.length > 0 &&
    birthday.date.length > 0 &&
    gender !== "O";

  const handleSignup = () => {
    const birthDate =
      birthday.year + "-" + birthday.month + "-" + birthday.date;
    setBirthDate(birthDate);
    if (!nickname) {
      const { username, password, password_confirm, birth_date, gender } =
        useSignupStore.getState();
      const data = { username, password, password_confirm, birth_date, gender };
      axios
        .post(API_URL + "accounts/signup/", data)
        .then((response) => {
          console.log(response.data);
          setClear();
          navigation.navigate("Home");
          Toast.show({
            type: "success",
            text1: "회원가입에 성공하였습니다.",
            position: "top",
            visibilityTime: 3000,
          });
        })
        .catch((error) => {
          console.log("회원가입 실패", error.response.data);
          const errorResponse = error.response.data;
          const errorKeys = Object.keys(errorResponse);
          const errorMessage = errorKeys
            .map((key) => `${key}: ${errorResponse[key][0]}`)
            .join("\n");
          // console.log("에러메세지", errorMessage);
          Alert.alert(
            (title = "회원가입에 실패하였습니다."),
            (message = errorMessage),
            { text: "확인" }
          );
        });
    } else {
      const { birth_date, gender } = useSignupStore.getState();
      const { key } = useSocialSignupStroe.getState();
      // console.log("\n\n\nkey : ", key);

      const formData = new FormData();
      formData.append("birth_date", birth_date);
      formData.append("gender", gender);

      axios
        .put(API_URL + `accounts/${nickname}/`, formData, {
          headers: {
            Authorization: `Token ${key}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setClear();
          navigation.navigate("Home");
          Toast.show({
            type: "success",
            text1: "회원가입에 성공하였습니다.",
            position: "top",
            visibilityTime: 3000,
          });
        })
        .catch((error) => {
          console.log(
            "회원가입 실패",
            error.response.data,
            error.response.status
          );
          const errorResponse = error.response.data;
          const errorKeys = Object.keys(errorResponse);
          const errorMessage = errorKeys
            .map((key) => `${key}: ${errorResponse[key][0]}`)
            .join("\n");
          // console.log("에러메세지", errorMessage);
          Alert.alert(
            (title = "회원가입에 실패하였습니다."),
            (message = errorMessage),
            { text: "확인" }
          );
        });
    }
  };

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
                {["year", "month", "date"].map((field, index) => (
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
                    value={birthday.field}
                    onChangeText={(text) =>
                      setBirthday((prev) => ({ ...prev, [field]: text }))
                    }
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused("")}
                    keyboardType="number-pad"
                    style={[
                      styles.input,
                      focused === field && styles.inputFocused,
                      field === "year" && { flex: 0.5 },
                      (field === "month" || field === "date") && { flex: 0.25 },
                    ]}
                  />
                ))}
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
              onPress={handleSignup}
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
