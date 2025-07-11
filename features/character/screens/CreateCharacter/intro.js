import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import useCharacterStore from "../../../../stores/useCharacterStore";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useState } from "react";
import Markdown from "react-native-markdown-display";
import Toast from "react-native-toast-message";

function Intro() {
  const { name, intro, setIntro, deleteIntro, editIntro, character_image } =
    useCharacterStore();
  const [sender, setSender] = useState(name);
  const [message, setMessage] = useState("");
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [edit, setEdit] = useState(false);
  const [editMessage, setEditMessage] = useState("");

  // 글자수
  const totalLength =
    intro.reduce((sum, item) => sum + item.message.length, 0) + message.length;
  const onEditingLength =
    intro.reduce((sum, item) => sum + item.message.length, 0) -
    message.length +
    editMessage.length;

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

  const addIntro = () => {
    const introMessage = { id: Date.now(), message, role: sender };
    setIntro(introMessage);
    setMessage("");
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

  const onEdit = (item) => {
    setEdit(item.id);
    setEditMessage(item.message);
    setMessage(item.message);
  };

  const cancelEdit = () => {
    setEdit(false);
    setMessage("");
    setEditMessage("");
  };

  const doneEdit = () => {
    editIntro(edit, editMessage);
    setEdit(false);
    setMessage("");
    setEditMessage("");
  };

  const setSenderToUser = () => {
    if (intro.length === 0) {
      Toast.show({
        type: "error",
        text1: "유저는 인트로의 첫 메세지를 시작할 수 없어요",
        position: "top",
        visibilityTime: 3000,
      });
    } else {
      setSender("user");
    }
  };

  return (
    <>
      {/* 글자수 */}
      <View style={styles.charCountContainer}>
        <Text
          style={[
            styles.charCountText,
            totalLength < 1500 && onEditingLength < 1500
              ? styles.charCountTextNormal
              : styles.charCountTextError,
          ]}
        >
          {!edit ? totalLength : onEditingLength}/1,500자
        </Text>
      </View>

      {/* 인트로 내용 */}
      <View style={styles.introContentWrapper}>
        <Text style={styles.introTitle}>첫 상황을 만들어주세요</Text>
        <ScrollView style={styles.introScrollContent}>
          {intro.length === 0 ? (
            <Text style={styles.noMessageText}>
              캐릭터의 첫 메세지를 입력해주세요
            </Text>
          ) : (
            <View>
              {intro.map((item, idx) =>
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
                        <TouchableOpacity onPress={() => deleteIntro(item.id)}>
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
                        {idx === 0 ? null : (
                          <TouchableOpacity
                            onPress={() => deleteIntro(item.id)}
                          >
                            {/* 삭제 버튼 */}
                            <Feather
                              name="trash-2"
                              size={14}
                              color="#ffffff80"
                              style={styles.editDeleteButtonAI}
                            />
                          </TouchableOpacity>
                        )}
                      </>
                    )}
                  </View>
                )
              )}
            </View>
          )}
        </ScrollView>
      </View>

      {/* 인트로 입력 */}
      {edit ? (
        <View style={styles.editControlsContainer}>
          <TouchableOpacity onPress={cancelEdit}>
            <Feather
              name="x"
              size={20}
              color="white"
              style={styles.cancelEditButton}
            />
          </TouchableOpacity>
          <Text style={styles.editMessagePrompt}>메세지를 수정해주세요</Text>
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
            <TouchableOpacity onPress={doneEdit}>
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
          {!name ? (
            <Text style={styles.nameMissingText}>
              캐릭터의 이름을 먼저 입력해주세요
            </Text>
          ) : (
            <View style={styles.messageInputContent}>
              <View style={styles.senderSelectionContainer}>
                <View style={styles.senderOptionsRow}>
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
                    onPress={setSenderToUser}
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
                  <TouchableOpacity onPress={() => addIntro()}>
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
          )}
        </View>
      )}
    </>
  );
}

export default Intro;

const styles = StyleSheet.create({
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
  introContentWrapper: {
    flex: 1,
    marginHorizontal: 15,
  },
  introTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  introScrollContent: {
    marginTop: 10,
  },
  noMessageText: {
    color: "#ffffff80",
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
  nameMissingText: {
    color: "#ffffff80",
    fontSize: 16,
    padding: 12,
  },
  messageInputContent: {
    padding: 12,
  },
  senderSelectionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff0d",
  },
  senderOptionsRow: {
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
