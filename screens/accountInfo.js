import { useNavigation } from "@react-navigation/native";
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
import { useEffect, useState } from "react";
import accountAPI from "../apis/accountAPI";
import Toast from "react-native-toast-message";

function AccountInfo() {
  const navigation = useNavigation();

  const [birthday, setBirthday] = useState({ year: "", month: "", date: "" });
  const [gender, setGender] = useState(null);
  const [focused, setFocused] = useState(false);

  const getUserProfile = async () => {
    accountAPI
      .get(`my_profile/`)
      .then((response) => {
        console.log(response.data);
        const { birth_date, gender } = response.data;
        // console.log(birth_date.split("-"));
        setBirthday({
          year: birth_date.split("-")[0],
          month: birth_date.split("-")[1],
          date: birth_date.split("-")[2],
        });
        setGender(gender);
      })
      .catch((error) => {
        console.log("유저 조회 실패", error?.response);
      });
  };

  const editAccountInfo = () => {
    accountAPI
      .put(`my_profile/`, {
        birth_date: birthday.year + "-" + birthday.month + "-" + birthday.date,
        gender,
      })
      .then((response) => {
        console.log("계정 정보 수정 완료", response.data);
        Toast.show({ type: "info", text1: "유저 정보가 업데이트 되었습니다." });
      })
      .catch((error) => {
        console.log("계정 정보 수정 실패", error?.response);
        Toast.show({
          type: "error",
          text1: "유저 정보 업데이트에 실패하였습니다.",
        });
      });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

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
            <Text style={styles.headerTitle}>계정정보</Text>
            <TouchableOpacity onPress={editAccountInfo}>
              <Text style={styles.headerSave}>저장</Text>
            </TouchableOpacity>
          </View>

          <View style={{ margin: 20 }}>
            <Text style={{ color: "rgba(255, 255, 255/.5)" }}>
              계정 정보를 바탕으로 더 재밌는 캐릭터를 추천해 드릴게요!
            </Text>
            <Text style={{ color: "rgba(255, 255, 255/.5)" }}>
              캐릭터와의 대화에는 영향을 끼치지 않으며, 다른 유저는 이 정보를 볼
              수 없어요
            </Text>
          </View>

          <View style={{ flex: 1, marginHorizontal: 20 }}>
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
                    value={birthday[field]}
                    onChangeText={(text) =>
                      setBirthday((prev) => ({ ...prev, [field]: text }))
                    }
                    maxLength={field === "year" ? 4 : 2}
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
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                color: "rgba(255, 255, 255/.5)",
                textDecorationLine: "underline",
                fontSize: 16,
              }}
            >
              탈퇴하기
            </Text>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default AccountInfo;

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
  headerSave: {
    color: "rgb(124, 103, 255)",
    fontSize: 16,
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
});
