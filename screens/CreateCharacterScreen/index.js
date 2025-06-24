import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Content from "./content";
import { useNavigation } from "@react-navigation/native";
import Intro from "./intro";
import Situation from "./situation";
import Introduction from "./introduction";
import useCharacterStore from "../../stores/useCharacterStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axios from "axios";
import { API_URL } from "../../config";

function CreateCharacter() {
  const navigation = useNavigation();
  const [nowScreen, setNowScreen] = useState("content");

  const { resetCharacter, title, name, intro, character_image } =
    useCharacterStore();
  const isCharacterValid = !!(
    title &&
    name &&
    intro.length > 0 &&
    character_image
  );

  const onClose = () => {
    const title = "지금 나가면 수정한 내용이 삭제돼요";
    const message = `제한된 분량을 초과하거나, 형식에 맞지 않는 내용이 있어\n저장할 수 없어요.\n저장하시려면 수정해주세요.`;
    Alert.alert(title, message, [
      { text: "취소" },
      {
        text: "나가기",
        onPress: () => {
          resetCharacter();
          navigation.goBack();
        },
      },
    ]);
  };

  // 캐릭터 임시저장
  const onSave = () => {
    const title = "작성 중인 내용을 저장할까요?";
    const message = `저장된 내용은\n마이페이지에서 확인할 수 있어요`;
    Alert.alert(title, message, [
      { text: "취소" },
      {
        text: "임시 저장",
        onPress: async () => {
          try {
            // 현재 상태 가져오가
            const {
              title,
              description,
              character_image,
              name,
              character_info,
              intro,
              example_situation,
              presentation,
              hashtag,
              creator_comment,
              is_character_public,
              is_description_public,
              is_example_public,
            } = useCharacterStore.getState();

            // AsyncStorage에 저장
            await AsyncStorage.setItem(
              title,
              JSON.stringify({
                title,
                description,
                character_image,
                name,
                character_info,
                intro,
                example_situation,
                presentation,
                hashtag,
                creator_comment,
                is_character_public,
                is_description_public,
                is_example_public,
              })
            );

            Toast.show({
              type: "info",
              text1: "작성한 내용이 저장되었어요",
              text2: "다른 유저들에게 공개하려면 등록해 주세요",
              position: "top",
              visibilityTime: 3000,
            });
          } catch (error) {
            console.log("저장 실패", error);
          }
        },
      },
    ]);
  };

  // 캐릭터 생성 완료
  const onRegister = () => {
    // 현재 상태 가져오가
    const {
      title,
      description,
      character_image,
      name,
      character_info,
      intro,
      example_situation,
      presentation,
      hashtag,
      creator_comment,
      is_character_public,
      is_description_public,
      is_example_public,
    } = useCharacterStore.getState();

    // axios
    //   .post(API_URL + "characters/", {
    //     title,
    //     description,
    //     character_image,
    //     name,
    //     character_info,
    //     intro,
    //     example_situation,
    //     presentation,
    //     hashtag,
    //     creator_comment,
    //     is_character_public,
    //     is_description_public,
    //     is_example_public,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     navigation.navigate("Home");
    //   })
    //   .catch((error) => {
    //     console.error("캐릭터 생성에 실패하였습니다.", error);
    //   });
    navigation.navigate("Home");
    Toast.show({
      type: "success",
      text1: "등록 되었어요",
      position: "top",
      visibilityTime: 3000,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {/* 헤더 */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => onClose()}>
                <Ionicons name="close" size={28} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>제작</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity>
                <Ionicons
                  name="ellipsis-horizontal-sharp"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                disabled={!isCharacterValid}
                onPress={onSave}
              >
                <Text
                  style={
                    isCharacterValid
                      ? styles.saveButtonText
                      : {
                          color: "rgb(115 120 131)",
                          backgroundColor: "rgb(62, 62, 65)",
                          padding: 10,
                          borderRadius: 6,
                          fontSize: 16,
                        }
                  }
                >
                  저장
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={!isCharacterValid}
                onPress={onRegister}
                style={styles.registerButton}
              >
                <Text
                  style={
                    isCharacterValid
                      ? styles.registerButtonText
                      : {
                          color: "rgb(115 120 131)",
                          backgroundColor: "rgb(62, 62, 65)",
                          padding: 10,
                          borderRadius: 6,
                          fontSize: 16,
                        }
                  }
                >
                  등록
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 상단 탭 */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setNowScreen("content")}
              style={[
                styles.tabButton,
                nowScreen === "content"
                  ? styles.tabButtonActive
                  : styles.tabButtonInactive,
              ]}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  nowScreen === "content"
                    ? styles.tabButtonTextActive
                    : styles.tabButtonTextInactive,
                ]}
              >
                *내용
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setNowScreen("intro")}
              style={[
                styles.tabButton,
                nowScreen === "intro"
                  ? styles.tabButtonActive
                  : styles.tabButtonInactive,
              ]}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  nowScreen === "intro"
                    ? styles.tabButtonTextActive
                    : styles.tabButtonTextInactive,
                ]}
              >
                *인트로
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setNowScreen("example situation")}
              style={[
                styles.tabButton,
                nowScreen === "example situation"
                  ? styles.tabButtonActive
                  : styles.tabButtonInactive,
              ]}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  nowScreen === "example situation"
                    ? styles.tabButtonTextActive
                    : styles.tabButtonTextInactive,
                ]}
              >
                상황 예시
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setNowScreen("introduction")}
              style={[
                styles.tabButton,
                nowScreen === "introduction"
                  ? styles.tabButtonActive
                  : styles.tabButtonInactive,
              ]}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  nowScreen === "introduction"
                    ? styles.tabButtonTextActive
                    : styles.tabButtonTextInactive,
                ]}
              >
                소개
              </Text>
            </TouchableOpacity>
          </View>

          {nowScreen === "content" ? <Content /> : null}
          {nowScreen === "intro" ? <Intro /> : null}
          {nowScreen === "example situation" ? <Situation /> : null}
          {nowScreen === "introduction" ? <Introduction /> : null}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default CreateCharacter;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1a1b1b",
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "500",
  },
  headerRight: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
  saveButton: {
    // No specific style needed here if text has styles
  },
  saveButtonText: {
    color: "white",
    backgroundColor: "rgb(62, 62, 65)",
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
  },
  registerButton: {
    // No specific style needed here if text has styles
  },
  registerButtonText: {
    color: "white",
    backgroundColor: "rgb(82, 32, 204)",
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tabButton: {
    flex: 0.25,
    justifyContent: "center",
    alignItems: "center",
  },
  tabButtonActive: {
    borderBottomColor: "white",
    borderBottomWidth: 2,
  },
  tabButtonInactive: {
    borderBottomColor: "#ffffff14",
    borderBottomWidth: 1,
  },
  tabButtonText: {
    fontSize: 18,
    padding: 15,
  },
  tabButtonTextActive: {
    color: "white",
    fontWeight: "500",
  },
  tabButtonTextInactive: {
    color: "#ffffff80",
  },
});
