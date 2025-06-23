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

function CreateCharacter() {
  const navigation = useNavigation();
  const [nowScreen, setNowScreen] = useState("content");

  const { resetCharacter } = useCharacterStore();

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
              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>저장</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.registerButton}>
                <Text style={styles.registerButtonText}>등록</Text>
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
