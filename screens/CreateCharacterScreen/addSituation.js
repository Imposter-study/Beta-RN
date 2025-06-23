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
import Markdown from "react-native-markdown-display";
import { useNavigation } from "@react-navigation/native";

function AddSituation() {
  const navigation = useNavigation();
  const { name, character_image, example_situation, setExampleSituation } =
    useCharacterStore();
  const [sender, setSender] = useState(name);
  const [message, setMessage] = useState("");
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [situation, setSituation] = useState([
    { id: 1, message: "test", role: "user" },
    { id: 2, message: "message", role: "ai" },
  ]);
  const [edit, setEdit] = useState(false);
  const [editMessage, setEditMessage] = useState("");

  const markdownRules = {
    paragraph: (node, children, parent, styles) => {
      const siblings = parent[0].children;
      const isLast = node.index === siblings[siblings.length - 1].index;

      return (
        <Text
          key={node.key}
          style={{ color: "white", marginBottom: isLast ? 0 : 16 }}
        >
          {children}
        </Text>
      );
    },

    em: (node, children, parent, styles) => (
      <Text key={node.key} style={{ fontStyle: "italic", color: "#ffffff80" }}>
        {children}
      </Text>
    ),

    bold: (node, children, parent, styles) => (
      <Text key={node.key} style={{ fontWeight: "bold", color: "white" }}>
        {children}
      </Text>
    ),
  };

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

  // 상황예시 채팅(메세지) 추가
  const addSituation = () => {
    const situationMessage = { id: Date.now(), message, role: sender };
    setSituation((prev) => [...prev, situationMessage]);
    setMessage("");
  };

  // 상황예시 메세지 수정
  const onEdit = (item) => {
    setEdit(item.id);
    setEditMessage(item.message);
    setMessage(item.message);
  };

  // 상황예시 수정 취소
  const cancelEdit = () => {
    setEdit(false);
    setMessage("");
    setEditMessage("");
  };

  // 상황예시 수정 완료
  const doneEdit = (id) => {
    setSituation((prev) =>
      prev.map((s) => (s.id === id ? { ...s, message: editMessage } : s))
    );
    setEdit(false);
    setMessage("");
    setEditMessage("");
  };

  // 상황예시 메세지 삭제
  const deleteMessage = (id) => {
    setSituation((prev) => prev.filter((s) => s.id !== id));
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              상황 예시 {example_situation.length + 1}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setExampleSituation(situation);
                navigation.goBack();
              }}
            >
              <Text
                style={{
                  color:
                    situation.length > 0 ? "rgb(124 103 255)" : "rgb(89 91 99)",
                }}
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
          <ScrollView style={{ marginTop: 20, marginHorizontal: 15 }}>
            {situation.map((item) =>
              item.role === "user" ? (
                <View
                  key={item.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 5,
                    marginBottom: 20,
                  }}
                >
                  {edit === item.id ? (
                    <TextInput
                      value={editMessage}
                      onChangeText={(text) => setEditMessage(text)}
                      multiline={true}
                      selection={selection}
                      onSelectionChange={({ nativeEvent: { selection } }) =>
                        setSelection(selection)
                      }
                      style={{
                        color: "white",
                        fontSize: 18,
                        padding: 10,
                        backgroundColor: "black",
                        borderRadius: 16,
                        borderTopRightRadius: 0,
                        alignSelf: "flex-start",
                        maxWidth: "70%",
                        borderWidth: 1,
                        borderColor: "rgb(82 32 204)",
                      }}
                    />
                  ) : (
                    <>
                      <TouchableOpacity onPress={() => onEdit(item)}>
                        {/* 수정 버튼 */}
                        <FontAwesome6
                          name="pen"
                          size={14}
                          color="#ffffff80"
                          style={{
                            padding: 10,
                            backgroundColor: "rgb(82 84 87)",
                            borderRadius: 100,
                          }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteMessage(item.id)}>
                        {/* 삭제 버튼 */}
                        <Feather
                          name="trash-2"
                          size={14}
                          color="#ffffff80"
                          style={{
                            padding: 10,
                            backgroundColor: "rgb(82 84 87)",
                            borderRadius: 100,
                          }}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          color: "white",
                          fontSize: 18,
                          padding: 10,
                          backgroundColor: "rgb(124 103 255)",
                          borderRadius: 16,
                          borderTopRightRadius: 0,
                          alignSelf: "flex-start",
                          maxWidth: "70%",
                        }}
                      >
                        <Markdown rules={markdownRules}>
                          {item.message}
                        </Markdown>
                      </View>
                    </>
                  )}
                </View>
              ) : (
                <View
                  key={item.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    marginBottom: 20,
                  }}
                >
                  {character_image ? (
                    <Image
                      source={{ uri: character_image }}
                      style={{ width: 36, height: 36, borderRadius: 100 }}
                    />
                  ) : (
                    <Feather
                      name="zap"
                      size={18}
                      color="#fff3"
                      style={{
                        borderRadius: 100,
                        padding: 10,
                        backgroundColor: "rgb(51 51 51)",
                      }}
                    />
                  )}
                  {/* 캐릭터(AI) 메세지 */}
                  {edit === item.id ? (
                    <TextInput
                      value={editMessage}
                      onChangeText={(text) => setEditMessage(text)}
                      multiline={true}
                      selection={selection}
                      onSelectionChange={({ nativeEvent: { selection } }) =>
                        setSelection(selection)
                      }
                      style={{
                        color: "white",
                        fontSize: 18,
                        padding: 10,
                        backgroundColor: "black",
                        borderRadius: 16,
                        borderTopLeftRadius: 0,
                        alignSelf: "flex-start",
                        maxWidth: "70%",
                        borderWidth: 1,
                        borderColor: "rgb(82 32 204)",
                      }}
                    />
                  ) : (
                    <>
                      <View
                        style={{
                          color: "white",
                          fontSize: 18,
                          padding: 10,
                          backgroundColor: "rgb(38 39 39)",
                          borderRadius: 16,
                          borderTopLeftRadius: 0,
                          alignSelf: "flex-start",
                          maxWidth: "70%",
                        }}
                      >
                        <Markdown rules={markdownRules}>
                          {item.message}
                        </Markdown>
                      </View>
                      <TouchableOpacity onPress={() => onEdit(item)}>
                        {/* 수정 버튼 */}
                        <FontAwesome6
                          name="pen"
                          size={14}
                          color="#ffffff80"
                          style={{
                            padding: 10,
                            backgroundColor: "rgb(38 39 39)",
                            borderRadius: 100,
                          }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteMessage(item.id)}>
                        {/* 삭제 버튼 */}
                        <Feather
                          name="trash-2"
                          size={14}
                          color="#ffffff80"
                          style={{
                            padding: 10,
                            backgroundColor: "rgb(38 39 39)",
                            borderRadius: 100,
                          }}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              )
            )}
          </ScrollView>

          {/* 메세지 입력 */}
          {edit ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: 15,
              }}
            >
              {/* 메세지 수정 시 입력 */}
              <TouchableOpacity onPress={cancelEdit}>
                <Feather
                  name="x"
                  size={20}
                  color="white"
                  style={{
                    borderRadius: 100,
                    padding: 7,
                    backgroundColor: "rgb(51 51 51)",
                  }}
                />
              </TouchableOpacity>
              <Text style={{ color: "#ffffff80", fontSize: 16 }}>
                메세지를 수정해주세요
              </Text>
              {/* asterick, send */}
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity onPress={() => insertTextAtCursor("*", true)}>
                  <FontAwesome6
                    name="asterisk"
                    size={20}
                    color="white"
                    style={{
                      borderRadius: 100,
                      paddingVertical: 7,
                      paddingHorizontal: 10,
                      backgroundColor: "rgb(51 51 51)",
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => doneEdit(edit)}>
                  <Feather
                    name="check"
                    size={20}
                    color={
                      editMessage !== "" && editMessage !== message
                        ? "white"
                        : "rgb(115 120 131)"
                    }
                    style={{
                      backgroundColor:
                        editMessage !== "" && editMessage !== message
                          ? "rgb(82 32 204)"
                          : "rgb(45 45 45)",
                      padding: 7,
                      borderRadius: 100,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
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
                    <TouchableOpacity onPress={addSituation}>
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
          )}
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
