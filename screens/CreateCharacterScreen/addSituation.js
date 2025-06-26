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
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import useCharacterStore from "../../stores/useCharacterStore";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Markdown from "react-native-markdown-display";
import { useNavigation } from "@react-navigation/native";

function AddSituation({ route }) {
  const index = route?.params?.index;
  const navigation = useNavigation();
  const {
    name,
    character_image,
    example_situation,
    setExampleSituation,
    updateExampleSituation,
  } = useCharacterStore();
  const [sender, setSender] = useState(name);
  const [message, setMessage] = useState("");
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [situation, setSituation] = useState(example_situation[index] || []);
  const [edit, setEdit] = useState(false);
  const [editMessage, setEditMessage] = useState("");

  // 글자수
  const baseLength =
    // 기존에 작성된 상황예시
    example_situation
      .filter((_, idx) => idx !== index) // index 상황 제외
      .flat() // 2차원 배열을 1차원으로 평탄화
      .reduce((acc, curr) => acc + curr.message.length, 0) +
    // 추가된 상황예시
    situation.reduce((sum, item) => sum + item.message.length, 0);
  const totalLength = baseLength + message.length; // message 길이 합산
  const onEditingLength = baseLength - message.length + editMessage.length;

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

  // 상황 예시 저장
  const saveSituation = () => {
    if (index >= 0) {
      updateExampleSituation(index, situation);
    } else {
      setExampleSituation(situation);
    }
    navigation.goBack();
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              상황 예시 {index + 1 || example_situation.length + 1}
            </Text>
            <TouchableOpacity onPress={saveSituation}>
              <Text
                style={[
                  styles.saveButtonText,
                  situation.length > 0
                    ? styles.saveButtonTextActive
                    : styles.saveButtonTextInactive,
                ]}
              >
                확인
              </Text>
            </TouchableOpacity>
          </View>

          {/* 글자수 */}
          <View style={styles.charCountContainer}>
            <Text
              style={[
                styles.charCountText,
                totalLength < 2000 && onEditingLength < 2000
                  ? styles.charCountTextNormal
                  : styles.charCountTextError,
              ]}
            >
              {!edit ? totalLength : onEditingLength}/2,000자
            </Text>
          </View>

          {/* 상황예시 내용 */}
          <ScrollView style={styles.situationContentScroll}>
            {situation.map((item) =>
              item.role === "user" ? (
                <View key={item.id} style={styles.userMessageContainer}>
                  {edit === item.id ? (
                    <TextInput
                      value={editMessage}
                      onChangeText={(text) => setEditMessage(text)}
                      multiline={true}
                      selection={selection}
                      onSelectionChange={({ nativeEvent: { selection } }) =>
                        setSelection(selection)
                      }
                      style={styles.editTextInputUser}
                    />
                  ) : (
                    <>
                      <TouchableOpacity onPress={() => onEdit(item)}>
                        {/* 수정 버튼 */}
                        <FontAwesome6
                          name="pen"
                          size={14}
                          color="#ffffff80"
                          style={styles.editDeleteButton}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteMessage(item.id)}>
                        {/* 삭제 버튼 */}
                        <Feather
                          name="trash-2"
                          size={14}
                          color="#ffffff80"
                          style={styles.editDeleteButton}
                        />
                      </TouchableOpacity>
                      <View style={styles.userMessageBubble}>
                        <Markdown rules={markdownRules}>
                          {item.message}
                        </Markdown>
                      </View>
                    </>
                  )}
                </View>
              ) : (
                <View key={item.id} style={styles.aiMessageContainer}>
                  {character_image ? (
                    <Image
                      source={{ uri: character_image }}
                      style={styles.characterImage}
                    />
                  ) : (
                    <Feather
                      name="zap"
                      size={18}
                      color="#fff3"
                      style={styles.placeholderIcon}
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
                      style={styles.editTextInputAI}
                    />
                  ) : (
                    <>
                      <View style={styles.aiMessageBubble}>
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
                          style={styles.editDeleteButtonAI}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteMessage(item.id)}>
                        {/* 삭제 버튼 */}
                        <Feather
                          name="trash-2"
                          size={14}
                          color="#ffffff80"
                          style={styles.editDeleteButtonAI}
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
            <View style={styles.editControlsContainer}>
              {/* 메세지 수정 시 입력 */}
              <TouchableOpacity onPress={cancelEdit}>
                <Feather
                  name="x"
                  size={20}
                  color="white"
                  style={styles.cancelEditButton}
                />
              </TouchableOpacity>
              <Text style={styles.editMessagePrompt}>
                메세지를 수정해주세요
              </Text>
              {/* asterick, send */}
              <View style={styles.editActionButtonsContainer}>
                <TouchableOpacity onPress={() => insertTextAtCursor("*", true)}>
                  <FontAwesome6
                    name="asterisk"
                    size={20}
                    color="white"
                    style={styles.asteriskButtonEdit}
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
                    style={[
                      styles.doneEditButton,
                      editMessage !== "" && editMessage !== message
                        ? styles.doneEditButtonActive
                        : styles.doneEditButtonInactive,
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.messageInputContainer}>
              <View style={styles.messageInputContent}>
                <View style={styles.senderSelectionContainer}>
                  <TouchableOpacity
                    onPress={() => setSender(name)}
                    style={[
                      styles.senderOption,
                      sender === name && styles.senderOptionActive,
                    ]}
                  >
                    {/* 이미지 자리 */}
                    {character_image ? (
                      <Image
                        source={{ uri: character_image }}
                        style={styles.senderImage}
                      />
                    ) : (
                      <Feather
                        name="zap"
                        size={14}
                        color="#fff3"
                        style={styles.senderPlaceholderIcon}
                      />
                    )}
                    <Text style={styles.senderNameText}>{name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSender("user")}
                    style={[
                      styles.senderOption,
                      sender === "user" && styles.senderOptionActive,
                    ]}
                  >
                    <Feather
                      name="eye"
                      size={14}
                      color="#fff3"
                      style={styles.senderPlaceholderIcon}
                    />
                    <Text style={styles.senderUserText}>유저</Text>
                  </TouchableOpacity>
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
                  style={styles.messageTextInput}
                />
                <View style={styles.messageActionContainer}>
                  <TouchableOpacity
                    onPress={() => insertTextAtCursor("{{user}}")}
                  >
                    <Text style={styles.userTagButton}>
                      {"{{"}user{"}}"}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.messageSendButtons}>
                    {/* asterisk */}
                    <TouchableOpacity onPress={() => insertTextAtCursor("*")}>
                      <FontAwesome6
                        name="asterisk"
                        size={18}
                        color="#ffffff80"
                        style={styles.asteriskButton}
                      />
                    </TouchableOpacity>
                    {/* 전송 버튼 */}
                    <TouchableOpacity onPress={addSituation}>
                      <Feather
                        name="arrow-up"
                        size={24}
                        color={message ? "white" : "rgb(115 120 131)"}
                        style={[
                          styles.sendMessageButton,
                          message
                            ? styles.sendMessageButtonActive
                            : styles.sendMessageButtonInactive,
                        ]}
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
    borderBottomColor: "#ffffff0d",
    borderBottomWidth: 1,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "500",
  },
  saveButtonText: {
    fontSize: 16,
  },
  saveButtonTextActive: {
    color: "rgb(124 103 255)",
  },
  saveButtonTextInactive: {
    color: "rgb(89 91 99)",
  },
  charCountContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#ffffff14",
    borderBottomWidth: 1,
  },
  charCountText: {
    padding: 10,
  },
  charCountTextNormal: {
    color: "#ffffff80",
  },
  charCountTextError: {
    color: "rgb(240 68 56)",
  },
  situationContentScroll: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  userMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 5,
    marginBottom: 20,
  },
  editTextInputUser: {
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
  },
  editDeleteButton: {
    padding: 10,
    backgroundColor: "rgb(82 84 87)",
    borderRadius: 100,
  },
  userMessageBubble: {
    color: "white",
    fontSize: 18,
    padding: 10,
    backgroundColor: "rgb(124 103 255)",
    borderRadius: 16,
    borderTopRightRadius: 0,
    alignSelf: "flex-start",
    maxWidth: "70%",
  },
  aiMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 20,
  },
  characterImage: {
    width: 36,
    height: 36,
    borderRadius: 100,
  },
  placeholderIcon: {
    borderRadius: 100,
    padding: 10,
    backgroundColor: "rgb(51 51 51)",
  },
  editTextInputAI: {
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
  },
  aiMessageBubble: {
    color: "white",
    fontSize: 18,
    padding: 10,
    backgroundColor: "rgb(38 39 39)",
    borderRadius: 16,
    borderTopLeftRadius: 0,
    alignSelf: "flex-start",
    maxWidth: "70%",
  },
  editDeleteButtonAI: {
    padding: 10,
    backgroundColor: "rgb(38 39 39)",
    borderRadius: 100,
  },
  editControlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  cancelEditButton: {
    borderRadius: 100,
    padding: 7,
    backgroundColor: "rgb(51 51 51)",
  },
  editMessagePrompt: {
    color: "#ffffff80",
    fontSize: 16,
  },
  editActionButtonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  asteriskButtonEdit: {
    borderRadius: 100,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: "rgb(51 51 51)",
  },
  doneEditButton: {
    padding: 7,
    borderRadius: 100,
  },
  doneEditButtonActive: {
    backgroundColor: "rgb(82 32 204)",
  },
  doneEditButtonInactive: {
    backgroundColor: "rgb(45 45 45)",
  },
  messageInputContainer: {
    backgroundColor: "rgb(38, 39, 39)",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  messageInputContent: {
    padding: 12,
  },
  senderSelectionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff0d",
    flexDirection: "row",
    gap: 10,
  },
  senderOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingBottom: 12,
  },
  senderOptionActive: {
    borderBottomColor: "white",
    borderBottomWidth: 1.5,
  },
  senderImage: {
    width: 24,
    height: 24,
    borderRadius: 100,
  },
  senderPlaceholderIcon: {
    borderRadius: 100,
    padding: 5,
    backgroundColor: "rgb(51 51 51)",
  },
  senderNameText: {
    color: "#ffffff80",
  },
  senderUserText: {
    color: "white",
  },
  messageTextInput: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
    padding: 10,
    minHeight: 70,
    maxHeight: 124,
  },
  messageActionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userTagButton: {
    color: "white",
    backgroundColor: "rgb(62 62 65)",
    borderRadius: 18,
    paddingVertical: 7,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
  },
  messageSendButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  asteriskButton: {
    padding: 10,
  },
  sendMessageButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
  },
  sendMessageButtonActive: {
    backgroundColor: "rgb(82 32 204)",
  },
  sendMessageButtonInactive: {
    backgroundColor: "rgb(45 45 45)",
  },
});
