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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function CreateChatProfile() {
  const [profileImage, setProfileImage] = useState(null);

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
            <Text style={styles.headerTitle}>새 대화 프로필</Text>
            <View />
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
              <Text style={{ color: "white", fontSize: 24 }}>이름</Text>
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
                placeholder="이름을 입력해주세요"
                backgroundColor="rgba(255, 255, 255, 0.05)"
                style={{
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
                multiline={true}
                backgroundColor="rgba(255, 255, 255, 0.05)"
                style={{
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
                  value={true}
                  // onChange={setExamplePublic}
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
              style={{
                alignItems: "center",
                backgroundColor: "rgb(103 40 255)",
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  padding: 15,
                }}
              >
                추가하기
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
