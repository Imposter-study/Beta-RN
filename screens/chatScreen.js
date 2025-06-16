import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

function ChatScreen() {
  const navigation = useNavigation();

  const character = {
    id: 1,
    imageUri:
      "https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800",
    name: "캐릭터 이름",
    intro: "캐릭터 인트로 소개글",
    tag: "#해시태그",
    creator: "@creator",
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {/* 헤더 */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-sharp" size={24} color="white" />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.headerTitle}>캐릭터 이름</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CharacterDetail", { character })
                }
              >
                <Ionicons
                  name="chevron-forward-sharp"
                  size={18}
                  color="#ffffff80"
                />
              </TouchableOpacity>
            </View>
            <Ionicons name="menu" size={24} color="white" />
          </View>

          {/* 채팅 */}
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="alert-circle-outline"
                size={18}
                color="#ffffffb3"
              />
              <Text style={{ color: "#ffffffb3" }}>
                캐릭터가 보내는 메세지는 모두 생성된 내용이에요
              </Text>
            </View>
            <View></View>
          </ScrollView>

          {/* 채팅 입력 및 전송 */}
          <View style={{ flexDirection: "row", gap: 5, marginHorizontal: 10 }}>
            <Ionicons
              name="flash"
              size={18}
              color="white"
              style={{
                backgroundColor: "rgb(62, 62, 65)",
                borderRadius: "100%",
                padding: 10,
              }}
            />
            <View
              style={{ flex: 1, flexDirection: "row", position: "relative" }}
            >
              <TextInput
                placeholder="메시지 보내기"
                style={{
                  flex: 1,
                  backgroundColor: "#3e3e41e6",
                  borderRadius: 20,
                  padding: 10,
                  color: "white",
                }}
                placeholderTextColor="#ffffff80"
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 10,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 60, fontWeight: "300" }}
                >
                  *
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Ionicons
                name="play"
                size={18}
                color="white"
                style={{
                  backgroundColor: "rgb(82, 32, 204)",
                  borderRadius: "100%",
                  padding: 10,
                }}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1a1b1b",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
});
