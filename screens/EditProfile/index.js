import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../../config";
import SocialEdit from "./socialProfileEdit";
import ChatEdit from "./chatProfileEdit";

function EditProfileScreen() {
  const navigation = useNavigation();

  const [editType, setEditType] = useState("social");

  // // 사용자 정보 가져오기
  // const getProfile = () => {
  //   axios
  //     .get(API_URL + "accounts/testuser/")
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) =>
  //       console.log("사용자 정보를 가져오는데 실패하였습니다.", error)
  //     );
  // };

  // useEffect(() => {
  //   getProfile();
  // }, []);

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
            <Text style={styles.headerTitle}>프로필 편집</Text>
            <TouchableOpacity>
              <Text style={{ color: "rgba(124, 103, 255, 0.5)", fontSize: 16 }}>
                저장
              </Text>
            </TouchableOpacity>
          </View>

          {/* 편집 유형 */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                flex: 0.5,
                alignItems: "center",
                borderBottomWidth: editType === "social" ? 1 : 0.5,
                borderBottomColor:
                  editType === "social" ? "rgb(103, 40, 255)" : "#ffffff14",
              }}
              onPress={() => setEditType("social")}
            >
              <Text
                style={{ color: "white", fontSize: 18, paddingVertical: 15 }}
              >
                소셜 프로필
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.5,
                alignItems: "center",
                borderBottomWidth: editType === "chat" ? 1 : 0.5,
                borderBottomColor:
                  editType === "chat" ? "rgb(103, 40, 255)" : "#ffffff14",
              }}
              onPress={() => setEditType("chat")}
            >
              <Text
                style={{ color: "white", fontSize: 18, paddingVertical: 15 }}
              >
                대화 프로필
              </Text>
            </TouchableOpacity>
          </View>

          {/* 본문 */}
          {editType === "social" ? <SocialEdit /> : null}

          {/* 대화 프로필 */}
          {editType === "chat" ? <ChatEdit /> : null}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default EditProfileScreen;

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
  },
  inputGroup: {
    marginBottom: 30,
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
