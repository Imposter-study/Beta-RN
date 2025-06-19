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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Content from "./content";
import { useState } from "react";

function CreateCharacter() {
  const navigation = useNavigation();
  const [nowScreen, setNowScreen] = useState("content");

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
              <TouchableOpacity onPress={() => navigation.goBack()}>
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
                borderBottomColor: "white",
                borderBottomWidth: 2,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "500",
                  padding: 10,
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
                borderBottomColor: "#ffffff14",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "500",
                  padding: 10,
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
                borderBottomColor: "#ffffff14",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "500",
                  padding: 10,
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
                borderBottomColor: "#ffffff14",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "500",
                  padding: 10,
                }}
              >
                소개
              </Text>
            </TouchableOpacity>
          </View>

          {nowScreen === "content" ? <Content /> : null}
          {nowScreen === "intro" ? <Content /> : null}
          {nowScreen === "example situation" ? <Content /> : null}
          {nowScreen === "introduction" ? <Content /> : null}
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
    borderBottomColor: "#ffffff0d",
    borderBottomWidth: 0.3,
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
