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
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SocialEdit from "./socialProfileEdit";
import ChatEdit from "./chatProfileEdit";
import accountAPI from "../../apis/accountAPI";

function EditProfileScreen({ route }) {
  const navigation = useNavigation();

  const user = route.params.user;
  const [editType, setEditType] = useState("social");
  const [editUser, setEditUser] = useState();

  const getFileInfoFromUri = (uri) => {
    const uriParts = uri.split("/");
    const fileName = uriParts[uriParts.length - 1];

    const extension = fileName.split(".").pop()?.toLowerCase();
    let mimeType = "image/jpeg"; // 기본값

    if (extension === "png") mimeType = "image/png";
    else if (extension === "jpg" || extension === "jpeg")
      mimeType = "image/jpeg";
    else if (extension === "webp") mimeType = "image/webp";

    return {
      name: fileName,
      type: mimeType,
    };
  };

  const editProfile = () => {
    const formData = new FormData();

    formData.append("username", editUser.username);
    formData.append("nickname", editUser.nickname);
    formData.append("introduce", editUser.intro);

    // 프로필 이미지
    const profileImage = editUser.profileImage;
    if (profileImage === null) {
      formData.append("profile_picture", "");
    } else if (profileImage !== user.profile_picture) {
      const { name, type } = getFileInfoFromUri(profileImage);
      formData.append("profile_picture", {
        uri: profileImage,
        name,
        type,
      });
    }

    accountAPI
      .put(`${user.nickname}/`, formData, {
        header: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("프로필 수정 완료", response.data);
        navigation.navigate("Mypage");
      })
      .catch((error) => {
        console.log("프로필 수정 실패 :", error?.response);
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
            <Text style={styles.headerTitle}>프로필 편집</Text>
            <TouchableOpacity onPress={editProfile}>
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
          {editType === "social" ? (
            <SocialEdit
              nickname={user.nickname}
              username={user.username}
              profile_picture={user.profile_picture}
              introduce={user.introduce}
              onChange={(updatedInfo) => {
                console.log("수정된 프로필", updatedInfo);
                setEditUser(updatedInfo);
              }}
            />
          ) : null}
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
    color: "rgb(124, 103, 255)",
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
