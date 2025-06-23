import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import useCharacterStore from "../../stores/useCharacterStore";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

function AddSituation() {
  const { name, character_image } = useCharacterStore();
  const [sender, setSender] = useState(name);
  const [message, setMessage] = useState("");
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const insertTextAtCursor = (text, isEdit = false) => {
    if (!isEdit) {
      const before = message.slice(0, selection.start);
      const after = message.slice(selection.end);
      const newMessage = before + text + after;
      setMessage(newMessage);
    } else {
      const before = editMessage.slice(0, selection.start);
      const after = editMessage.slice(selection.end);
      const newMessage = before + text + after;
      setEditMessage(newMessage);
    }

    const newPosition = selection.start + text.length;
    setSelection({ start: newPosition, end: newPosition });
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
            <TouchableOpacity>
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>상황 예시</Text>
            <TouchableOpacity>
              <Text
                style={{ color: true ? "rgb(124 103 255)" : "rgb(89 91 99)" }}
              >
                확인
              </Text>
            </TouchableOpacity>
          </View>

          {/* 글자수 */}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderBottomColor: "#ffffff14",
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                color: true ? "#ffffff80" : "rgb(240 68 56)",
                padding: 10,
              }}
            >
              0/2,000자
            </Text>
          </View>

          {/* 상황예시 내용 */}
          <ScrollView></ScrollView>

          {/* 메세지 입력 */}
          <View
            style={{
              backgroundColor: "rgb(38, 39, 39)",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          >
            <View style={{ padding: 12 }}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#ffffff0d",
                }}
              >
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <TouchableOpacity
                    onPress={() => setSender(name)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      paddingBottom: 12,
                      borderBottomColor: sender === name && "white",
                      borderBottomWidth: sender === name && 1.5,
                    }}
                  >
                    {/* 이미지 자리 */}
                    {character_image ? (
                      <Image
                        source={{ uri: character_image }}
                        style={{ width: 24, height: 24, borderRadius: 100 }}
                      />
                    ) : (
                      <Feather
                        name="zap"
                        size={14}
                        color="#fff3"
                        style={{
                          borderRadius: 100,
                          padding: 5,
                          backgroundColor: "rgb(51 51 51)",
                        }}
                      />
                    )}
                    <Text style={{ color: "#ffffff80" }}>{name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSender("user")}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      paddingBottom: 12,
                      borderBottomColor: sender === "user" && "white",
                      borderBottomWidth: sender === "user" && 1.5,
                    }}
                  >
                    <Feather
                      name="eye"
                      size={14}
                      color="#fff3"
                      style={{
                        borderRadius: 100,
                        padding: 5,
                        backgroundColor: "rgb(51 51 51)",
                      }}
                    />
                    <Text style={{ color: "white" }}>유저</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TextInput
                value={message}
                onChangeText={(text) => setMessage(text)}
                placeholder={`${sender}의 메세지 입력`}
                placeholderTextColor="#9ca3af"
                multiline={true}
                selection={selection}
                onSelectionChange={({ nativeEvent: { selection } }) =>
                  setSelection(selection)
                }
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "400",
                  marginTop: 10,
                  padding: 10,
                  minHeight: 70,
                  maxHeight: 124,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => insertTextAtCursor("{{user}}")}
                >
                  <Text
                    style={{
                      color: "white",
                      backgroundColor: "rgb(62 62 65)",
                      borderRadius: 18,
                      paddingVertical: 7,
                      paddingHorizontal: 10,
                      alignSelf: "flex-start",
                    }}
                  >
                    {"{{"}user{"}}"}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  {/* asterisk */}
                  <TouchableOpacity onPress={() => insertTextAtCursor("*")}>
                    <FontAwesome6
                      name="asterisk"
                      size={18}
                      color="#ffffff80"
                      style={{ padding: 10 }}
                    />
                  </TouchableOpacity>
                  {/* 전송 버튼 */}
                  <TouchableOpacity onPress={null}>
                    <Feather
                      name="arrow-up"
                      size={24}
                      color={message ? "white" : "rgb(115 120 131)"}
                      style={{
                        backgroundColor: message
                          ? "rgb(82 32 204)"
                          : "rgb(45 45 45)",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 100,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default AddSituation;

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
    borderBottomColor: "#ffffff0d",
    borderBottomWidth: 1,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "500",
  },
});
