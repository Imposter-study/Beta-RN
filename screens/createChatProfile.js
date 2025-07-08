import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Image,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import accountAPI from "../apis/accountAPI";
import { useNavigation } from "@react-navigation/native";
import { DOMAIN } from "../config";
import Feather from "@expo/vector-icons/Feather";

function CreateChatProfile({ route }) {
  const { chatProfile = null, isEdit = false } = route.params || {};
  const navigation = useNavigation();

  const [profileImage, setProfileImage] = useState(
    chatProfile?.chat_profile_picture
      ? `http://${DOMAIN}` + chatProfile.chat_profile_picture
      : null
  );
  const [name, setName] = useState(chatProfile?.chat_nickname);
  const [description, setDescription] = useState(chatProfile?.chat_description);
  const [isDefault, setIsDefult] = useState(chatProfile?.is_default);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

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

  const createChatProfile = () => {
    const formData = new FormData();
    formData.append("chat_nickname", name);
    formData.append("chat_description", description);
    formData.append("is_default", isDefault);
    if (profileImage) {
      const { name, type } = getFileInfoFromUri(profileImage);
      formData.append("chat_profile_picture", {
        uri: profileImage,
        name,
        type,
      });
    }

    accountAPI
      .post(`chat_profiles/`, formData)
      .then((response) => {
        console.log("대화 프로필 생성 완료");
        console.log(response.data);
        navigation.goBack();
      })
      .catch((error) => {
        console.log("대화프로필 생성 실패", error?.response);
      });
  };

  const editChatProfile = () => {
    const formData = new FormData();
    formData.append("chat_nickname", name);
    formData.append("chat_description", description);
    formData.append("is_default", isDefault);
    if (profileImage !== chatProfile.chat_profile_picture) {
      const { name, type } = getFileInfoFromUri(profileImage);
      formData.append("chat_profile_picture", {
        uri: profileImage,
        name,
        type,
      });
    }

    accountAPI
      .put(`chat_profiles/${chatProfile.uuid}/`, formData)
      .then((response) => {
        console.log("대화프로필 수정 성공");
        console.log(response.data);
        navigation.goBack();
      })
      .catch((error) => {
        console.log("대화 프로필 수정 실패", error?.response);
      });
  };

  const deleteChatProfile = () => {
    Alert.alert("정말 삭제하실 건가요?\n삭제한 프로필은 되롤릴 수 없어요", "", [
      { text: "취소" },
      {
        text: "삭제",
        onPress: () => {
          accountAPI
            .delete(`chat_profiles/${chatProfile.uuid}/`)
            .then((response) => {
              console.log("대화 프로필 삭제 성공");
              navigation.goBack();
            })
            .catch((error) => {
              console.log("대화 프로필 삭제 실패", error?.response);
            });
        },
      },
    ]);
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
            <Text style={styles.headerTitle}>
              {isEdit ? "대화 프로필 편집" : "새 대화 프로필"}
            </Text>
            {isEdit ? (
              <TouchableOpacity onPress={deleteChatProfile}>
                <Feather name="trash-2" size={18} color="white" />
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>

          <ScrollView style={{ flex: 1 }}>
            {/* 본문 */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
                marginHorizontal: 20,
                marginBottom: 30,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (profileImage !== null) {
                    //   setModalVisible(true);
                  } else {
                    pickImage();
                  }
                }}
              >
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={{ width: 70, height: 70, borderRadius: 100 }}
                  />
                ) : (
                  <FontAwesome name="user-circle-o" size={70} color="gray" />
                )}
                <FontAwesome
                  name="pencil"
                  size={12}
                  color="white"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "rgb(103 40 255)",
                    padding: 5,
                    borderRadius: 100,
                  }}
                />
              </TouchableOpacity>
              <Text style={{ color: "white", fontSize: 24 }}>
                {name || "이름"}
              </Text>
            </View>

            {/* 이름 */}
            <View style={{ marginHorizontal: 20, gap: 10, marginBottom: 30 }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>이름</Text>
                <Text style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                  캐릭터가 날 이렇게 부를거에요
                </Text>
              </View>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="이름을 입력해주세요"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                backgroundColor="rgba(255, 255, 255, 0.05)"
                style={{
                  color: "white",
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.08)",
                  height: 40,
                  paddingHorizontal: 10,
                }}
              />
            </View>

            {/* 설명 */}
            <View style={{ marginHorizontal: 20, gap: 10, marginBottom: 30 }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>설명</Text>
                <Text style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                  (선택)
                </Text>
              </View>
              <TextInput
                value={description}
                onChangeText={setDescription}
                multiline={true}
                backgroundColor="rgba(255, 255, 255, 0.05)"
                style={{
                  color: "white",
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.08)",
                  height: 90,
                  paddingHorizontal: 10,
                }}
              />
            </View>

            {/* 설명 */}
            <View style={{ marginHorizontal: 20, gap: 10, marginBottom: 30 }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>
                  기본 대화 프로필
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 10,
                  paddingVertical: 20,
                  paddingHorizontal: 10,
                }}
              >
                <View>
                  <Text style={{ color: "white", fontSize: 16 }}>
                    새로운 대화 시작할 때 이 프로필 적용하기
                  </Text>
                  <Text style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                    대화 중에 다른 프로필로 바꿀 수 있어요
                  </Text>
                </View>
                <Switch
                  value={isDefault}
                  onChange={() => setIsDefult((prev) => !prev)}
                  trackColor={{
                    false: "rgb(89 91 99)",
                    true: "rgb(124, 103, 255)",
                  }}
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                />
              </View>
            </View>
          </ScrollView>

          {/* 버튼 */}
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              onPress={() => {
                if (isEdit) {
                  editChatProfile();
                } else {
                  createChatProfile();
                }
              }}
              disabled={!name}
              style={{
                alignItems: "center",
                backgroundColor: !name ? "rgb(45 45 45)" : "rgb(103 40 255)",
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: !name ? "rgb(115 120 131)" : "white",
                  fontSize: 18,
                  padding: 15,
                }}
              >
                {isEdit ? "저장하기" : "추가하기"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default CreateChatProfile;

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
});
