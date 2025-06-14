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
              <Text style={styles.headerSave}>저장</Text>
            </TouchableOpacity>
          </View>

          {/* 편집 유형 */}
          <View style={styles.editTypeContainer}>
            <TouchableOpacity
              style={[
                styles.editTypeButton,
                editType === "social" && styles.editTypeButtonActive,
              ]}
              onPress={() => setEditType("social")}
            >
              <Text style={styles.editTypeText}>소셜 프로필</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.editTypeButton,
                editType === "chat" && styles.editTypeButtonActive,
              ]}
              onPress={() => setEditType("chat")}
            >
              <Text style={styles.editTypeText}>대화 프로필</Text>
            </TouchableOpacity>
          </View>

          {/* 본문 */}
          {/* 소셜 프로필 */}
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
  headerSave: {
    color: "rgba(124, 103, 255, 0.5)",
    fontSize: 16,
  },
  editTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editTypeButton: {
    flex: 0.5,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ffffff14",
  },
  editTypeButtonActive: {
    borderBottomWidth: 1,
    borderBottomColor: "rgb(103, 40, 255)",
  },
  editTypeText: {
    color: "white",
    fontSize: 18,
    paddingVertical: 15,
  },
});
