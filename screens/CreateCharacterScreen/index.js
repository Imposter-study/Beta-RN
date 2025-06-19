import { useNavigation } from "@react-navigation/native";
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
import { useState } from "react";
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
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {/* 헤더 */}
          <View style={styles.header}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <TouchableOpacity onPress={() => onClose()}>
                <Ionicons name="close" size={28} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>제작</Text>
            </View>
            <View
              style={{ flexDirection: "row", gap: 7, alignItems: "center" }}
            >
              <TouchableOpacity>
                <Ionicons
                  name="ellipsis-horizontal-sharp"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity style={{}}>
                <Text
                  style={{
                    color: "white",
                    backgroundColor: "rgb(62, 62, 65)",
                    padding: 10,
                    borderRadius: 6,
                    fontSize: 16,
                  }}
                >
                  저장
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{}}>
                <Text
                  style={{
                    color: "white",
                    backgroundColor: "rgb(82, 32, 204)",
                    padding: 10,
                    borderRadius: 6,
                    fontSize: 16,
                  }}
                >
                  등록
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 상단 탭 */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => setNowScreen("content")}
              style={{
                flex: 0.25,
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor:
                  nowScreen === "content" ? "white" : "#ffffff14",
                borderBottomWidth: nowScreen === "content" ? 2 : 1,
              }}
            >
              <Text
                style={{
                  color: nowScreen === "content" ? "white" : "#ffffff80",
                  fontWeight: nowScreen === "content" && "500",
                  fontSize: 18,
                  padding: 15,
                }}
              >
                *내용
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setNowScreen("intro")}
              style={{
                flex: 0.25,
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor:
                  nowScreen === "intro" ? "white" : "#ffffff14",
                borderBottomWidth: nowScreen === "intro" ? 2 : 1,
              }}
            >
              <Text
                style={{
                  color: nowScreen === "intro" ? "white" : "#ffffff80",
                  fontWeight: nowScreen === "intro" && "500",
                  fontSize: 18,
                  padding: 15,
                }}
              >
                *인트로
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setNowScreen("example situation")}
              style={{
                flex: 0.25,
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor:
                  nowScreen === "example situation" ? "white" : "#ffffff14",
                borderBottomWidth: nowScreen === "example situation" ? 2 : 1,
              }}
            >
              <Text
                style={{
                  color:
                    nowScreen === "example situation" ? "white" : "#ffffff80",
                  fontWeight: nowScreen === "example situation" && "500",
                  fontSize: 18,
                  padding: 15,
                }}
              >
                상황 예시
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setNowScreen("introduction")}
              style={{
                flex: 0.25,
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor:
                  nowScreen === "introduction" ? "white" : "#ffffff14",
                borderBottomWidth: nowScreen === "introduction" ? 2 : 1,
              }}
            >
              <Text
                style={{
                  color: nowScreen === "introduction" ? "white" : "#ffffff80",
                  fontWeight: nowScreen === "introduction" && "500",
                  fontSize: 18,
                  padding: 15,
                }}
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
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "500",
  },
});
