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
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import Markdown from "react-native-markdown-display";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Modal from "react-native-modal";
import Feather from "@expo/vector-icons/Feather";
import Toast from "react-native-toast-message";
import characterAPI from "../../../apis/characterAPI";
import roomAPI from "../../../apis/roomAPI";
import { markdownRules } from "../../../utils/markdownRules";
import { AiMessage, UserMessage } from "../../../components/MessageBubble";

function Chat({ route }) {
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const { room_id, character_id } = route.params.character;

  const getFormattedDate = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  };

  const [loading, setLoading] = useState(true);
  const [character, setCharacter] = useState({});
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [intros, setIntro] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMessage, setEditMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [deleteMode, setDeletaMode] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [genResponse, setGenResponse] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [genSuggestions, setGenSuggestions] = useState(false);
  const [sideModalVisible, setSideModalVisible] = useState(false);
  const [historyTitle, setHistorytitle] = useState("");
  const [historyTitleModalVisible, setHistorytitleModalVisible] =
    useState(false);
  const [pendingModal, setPendingModal] = useState(null);

  const getCharacterInfo = async () => {
    characterAPI
      .get(`${character_id}/`)
      .then((response) => {
        // console.log("chat response :\n", response.data);
        setCharacter(response.data);
        setIntro(response.data.intro);
        getChat();
      })
      .catch((error) => {
        console.log("캐릭터 정보 가져오기 실패", error?.response);
      });
  };

  const getChat = async () => {
    roomAPI
      .get(`${room_id}/`)
      .then((response) => {
        console.log(response.data.chats);
        setChats(response.data.chats);
        setLoading(false);
      })
      .catch((error) => {
        console.log("채팅 내역 가져오기 실패", error);
      });
  };

  const sendChat = async () => {
    if (message.trim() !== "") {
      const userMessage = message;
      const updatedChats = [
        ...chats,
        {
          chat_id: chats.length,
          content: userMessage,
          name: "user",
          is_main: true,
        },
      ];
      setChats(updatedChats);
      setMessage("");
      scrollViewRef.current?.scrollToEnd({ animated: true });
      setGenResponse(true);

      roomAPI
        .post(`${room_id}/messages/`, {
          message: userMessage,
        })
        .then((response) => {
          console.log("메세지 전송 완료");
          console.log("캐릭터 답변 :", response.data);
          setChats((prev) => [
            ...prev,
            {
              chat_id: response.data.id,
              content: response.data.ai_response,
              name: character.name,
              is_main: true,
            },
          ]);
          setGenResponse(false);
        })
        .catch((error) => {
          console.log("메세지 전송 실패", error.response);
          setGenResponse(false);
        });
    }
  };

  const pressAsterisk = (isEdit = false) => {
    if (!isEdit) {
      const before = message.slice(0, selection.start);
      const after = message.slice(selection.end);
      const newMessage = before + "*" + after;

      setMessage(newMessage);
    } else {
      const before = editMessage.slice(0, selection.start);
      const after = editMessage.slice(selection.end);
      const newMessage = before + "*" + after;

      setEditMessage(newMessage);
    }

    const newPosition = selection.start + 1;
    setSelection({ start: newPosition, end: newPosition });
  };

  const onEdit = (chat) => {
    console.log(chat);
    setEditMessage(chat.content);
    setEditId(chat.chat_id);
    setModalVisible(true);
  };

  const editResponseMessage = () => {
    setChats((prev) =>
      prev.map((item) =>
        item.chat_id === editId ? { ...item, content: editMessage } : item
      )
    );
    roomAPI
      .put(`${room_id}/messages/${editId}/`, {
        message: editMessage,
      })
      .then((response) => {
        console.log(response);
        setModalVisible(false);
      })
      .catch((error) => {
        console.log("메세지 수정 실패", error?.response);
      });
  };

  const deleteMessage = () => {
    roomAPI
      .delete(`${room_id}/messages/${deleteId}/`)
      .then((response) => {
        console.log("대화 삭제 성공 :", response.data);
        getChat();
        setDeletaMode(false);
        setDeleteId(null);
      })
      .catch((error) => {
        console.log("대화 삭제 실패", error?.response);
      });
  };

  const regenerateMessage = (id) => {
    setGenResponse(true);
    setChats((prev) => prev.filter((item, index) => index !== prev.length - 1));
    roomAPI
      .post(`${room_id}/regenerate/`)
      .then((response) => {
        console.log(response.data);
        const regenMsg = {
          chat_id: id + 1,
          content: response.data.regenerated_response,
          name: response.data.character_name,
          is_main: true,
        };
        setChats((prev) => [...prev, regenMsg]);
        setChats(updateChats);
        setGenResponse(false);
      })
      .catch((error) => {
        console.log("메세지 재생성 실패", error?.response);
        setGenResponse(false);
      });
  };

  const suggestReply = () => {
    // console.log(room_id);
    setGenSuggestions(true);
    roomAPI
      .post(`${room_id}/suggestions/`)
      .then((response) => {
        console.log("추천 답변 생성 완료");
        console.log(response.data.suggestions);
        setSuggestions(response.data.suggestions);
        setGenSuggestions(false);
      })
      .catch((error) => {
        console.log("추천 답변 생성 실패", error?.response);
        setGenSuggestions(false);
      });
  };

  const sendSuggestionReply = (message) => {
    setMessage(message);
    setSuggestions([]);
  };

  const saveChatHistory = () => {
    roomAPI
      .post(`${room_id}/histories/`, { title: historyTitle })
      .then((response) => {
        console.log("대화 내역 저장 성공: \n", response.data);
        setHistorytitleModalVisible(false);
        Toast.show({
          type: "info",
          text1: "대화 내역을 저장하였습니다",
          visibilityTime: 1000,
        });
      })
      .catch((error) => {
        console.log("대화 내역 저장 실패", error?.response);
      });
  };

  const DotsLoading = () => {
    const [dots, setDots] = useState("•");

    useEffect(() => {
      const interval = setInterval(() => {
        setDots((prev) => {
          if (prev.length > 3) return "•";
          return prev + " •";
        });
      }, 500);
      return () => clearInterval(interval);
    }, []);

    return (
      <View
        style={{
          ...styles.aiChatContainer,
        }}
      >
        <Image
          source={{
            uri: character.character_image,
          }}
          style={styles.aiImage}
        />
        <View style={styles.aiChatContent}>
          <Text style={styles.aiName}>{character.name}</Text>
          <View style={styles.aiChatBox}>
            <Text style={{ color: "white" }}>{dots}</Text>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    getCharacterInfo();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>로딩중...</Text>
            </View>
          ) : (
            <>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => {
                    if (!deleteId) {
                      navigation.goBack();
                    } else {
                      setDeletaMode(false);
                      setDeleteId(null);
                    }
                  }}
                >
                  <Ionicons name="chevron-back-sharp" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                  {!deleteMode ? (
                    <>
                      <Text style={styles.headerTitle}>{character.title}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("CharacterDetail", {
                            character_id: character.character_id,
                          })
                        }
                      >
                        <Ionicons
                          name="chevron-forward-sharp"
                          size={18}
                          color="#ffffff80"
                        />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <Text style={styles.headerTitle}>대화 삭제</Text>
                  )}
                </View>
                <TouchableOpacity onPress={() => setSideModalVisible(true)}>
                  <Ionicons name="menu" size={24} color="white" />
                </TouchableOpacity>
              </View>

              <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() =>
                  scrollViewRef.current.scrollToEnd({ animated: true })
                }
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.infoContainer}>
                  <Ionicons
                    name="alert-circle-outline"
                    size={18}
                    color="#ffffffb3"
                  />
                  <Text style={styles.infoText}>
                    캐릭터가 보내는 메세지는 모두 생성된 내용이에요
                  </Text>
                </View>

                {/* 인트로 */}
                {intros.map((intro, index) =>
                  intro.role === "user" ? (
                    <View key={index} style={styles.userChatContainer}>
                      <UserMessage content={intro.message} />
                    </View>
                  ) : (
                    <View key={index} style={styles.aiChatContainer}>
                      <AiMessage
                        image={character.character_image}
                        name={character.name}
                        content={intro.message}
                      />
                    </View>
                  )
                )}

                {/* 채팅 */}
                {chats.map((chat, index) =>
                  chat.name !== character.name ? (
                    chat.is_main ? (
                      <TouchableOpacity
                        onPress={() => {
                          if (deleteMode) {
                            setDeleteId(parseInt(chat.chat_id, 10));
                          }
                        }}
                        onLongPress={() => {
                          setDeleteModalVisible(true);
                          setDeleteId(parseInt(chat.chat_id, 10));
                        }}
                        // disabled={!deleteId}
                        activeOpacity={1}
                        key={index}
                        style={{
                          ...styles.userChatContainer,
                          borderLeftWidth:
                            parseInt(chat.chat_id, 10) >= deleteId && deleteMode
                              ? 1
                              : 0,
                          borderRightWidth:
                            parseInt(chat.chat_id, 10) >= deleteId && deleteMode
                              ? 1
                              : 0,
                          borderTopWidth:
                            parseInt(chat.chat_id, 10) === deleteId &&
                            deleteMode
                              ? 1
                              : 0,
                          borderBottomWidth:
                            index === chats.length - 1 && deleteMode ? 1 : 0,
                          borderColor:
                            parseInt(chat.chat_id, 10) >= deleteId
                              ? "rgb(103 40 255)"
                              : "",
                        }}
                      >
                        <UserMessage content={chat.content} />
                      </TouchableOpacity>
                    ) : null
                  ) : chat.is_main ? (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        if (deleteMode) {
                          setDeleteId(parseInt(chat.chat_id, 10));
                        }
                      }}
                      onLongPress={() => {
                        setDeleteModalVisible(true);
                        setDeleteId(parseInt(chat.chat_id, 10));
                      }}
                      // disabled={!deleteId}
                      activeOpacity={1}
                      style={{
                        ...styles.aiChatContainer,
                        borderLeftWidth:
                          parseInt(chat.chat_id, 10) >= deleteId && deleteMode
                            ? 1
                            : 0,
                        borderRightWidth:
                          parseInt(chat.chat_id, 10) >= deleteId && deleteMode
                            ? 1
                            : 0,
                        borderTopWidth:
                          parseInt(chat.chat_id, 10) === deleteId && deleteMode
                            ? 1
                            : 0,
                        borderBottomWidth:
                          index === chats.length - 1 && deleteMode ? 1 : 0,
                        borderColor:
                          parseInt(chat.chat_id, 10) >= deleteMode
                            ? "rgb(103 40 255)"
                            : "",
                      }}
                    >
                      <AiMessage
                        image={character.character_image}
                        name={character.name}
                        content={chat.content}
                      />
                      {index === chats.length - 1 ? (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                          }}
                        >
                          <TouchableOpacity onPress={() => onEdit(chat)}>
                            <FontAwesome6
                              name="pen"
                              size={14}
                              color="#ffffff80"
                              style={styles.editReloadButton}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => regenerateMessage(chat.chat_id)}
                          >
                            <Ionicons
                              name="refresh"
                              size={14}
                              color="#ffffff80"
                              style={styles.editReloadButton}
                            />
                          </TouchableOpacity>
                        </View>
                      ) : null}
                    </TouchableOpacity>
                  ) : null
                )}
                {genResponse ? <DotsLoading /> : null}
              </ScrollView>

              {genSuggestions ? (
                <Text style={{ color: "white" }}>추천 답변 생성 중...</Text>
              ) : null}

              {/* 추천 답변 */}
              {suggestions.length !== 0 ? (
                <ScrollView horizontal style={{ height: 50, margin: 10 }}>
                  {suggestions.map((item, index) =>
                    item !== "" ? (
                      <TouchableOpacity
                        key={index}
                        onPress={() => sendSuggestionReply(item)}
                        style={{
                          padding: 10,
                          marginHorizontal: 3,
                          borderRadius: 16,
                          backgroundColor: "#ffffff80",
                        }}
                      >
                        <Markdown rules={markdownRules}>{item}</Markdown>
                      </TouchableOpacity>
                    ) : null
                  )}
                </ScrollView>
              ) : null}

              {deleteMode ? (
                <TouchableOpacity
                  onPress={deleteMessage}
                  style={{
                    marginHorizontal: 20,
                    backgroundColor: "rgb(82 32 204)",
                    alignItems: "center",
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      paddingVertical: 10,
                      fontSize: 18,
                    }}
                  >
                    대화 삭제
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.inputContainer}>
                  <TouchableOpacity onPress={suggestReply}>
                    <Ionicons
                      name="flash"
                      size={18}
                      color="white"
                      style={styles.flashButton}
                    />
                  </TouchableOpacity>
                  <TextInput
                    placeholder="메시지 보내기"
                    value={message}
                    onChangeText={setMessage}
                    multiline={true}
                    selection={selection}
                    onSelectionChange={({ nativeEvent: { selection } }) =>
                      setSelection(selection)
                    }
                    onFocus={() =>
                      scrollViewRef.current?.scrollToEnd({ animated: true })
                    }
                    style={styles.input}
                    placeholderTextColor="#ffffff80"
                  />
                  <TouchableOpacity
                    style={styles.asteriskButton}
                    onPress={pressAsterisk}
                  >
                    <Ionicons
                      name="medical-sharp"
                      size={12}
                      color="white"
                      style={{ padding: 10 }}
                    />
                  </TouchableOpacity>

                  {message === "" ? (
                    <TouchableOpacity>
                      <Ionicons
                        name="play"
                        size={18}
                        color="white"
                        style={styles.sendButton}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={sendChat} disabled={genResponse}>
                      <Ionicons
                        name="arrow-up-sharp"
                        size={18}
                        color="white"
                        style={styles.sendButton}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </>
          )}
          <Modal
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(false)}
            style={{ justifyContent: "flex-end" }}
            avoidKeyboard={true}
          >
            <View
              style={{
                backgroundColor: "rgb(26 27 27)",
                paddingHorizontal: 10,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: "white",
                    width: "10%",
                    marginVertical: 20,
                    borderRadius: 100,
                  }}
                />
              </View>

              <TextInput
                value={editMessage}
                onChangeText={setEditMessage}
                multiline={true}
                selection={selection}
                onSelectionChange={({ nativeEvent: { selection } }) =>
                  setSelection(selection)
                }
                style={{ color: "white", minHeight: 70, maxHeight: 70 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 5,
                }}
              >
                {/* 닫기 */}
                <TouchableOpacity onPress={null}>
                  <Feather
                    name="x"
                    size={20}
                    color="white"
                    style={{
                      backgroundColor: "rgb(62 62 65)",
                      borderRadius: 100,
                      padding: 5,
                      margin: 3,
                    }}
                  />
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {/* asterisk */}
                  <TouchableOpacity onPress={() => pressAsterisk(true)}>
                    <FontAwesome6
                      name="asterisk"
                      size={18}
                      color="white"
                      style={{
                        backgroundColor: "rgb(62 62 65)",
                        borderRadius: 100,
                        paddingVertical: 5,
                        paddingHorizontal: 8,
                        margin: 3,
                      }}
                    />
                  </TouchableOpacity>
                  {/* check */}
                  <TouchableOpacity onPress={editResponseMessage}>
                    <Feather
                      name="check"
                      size={20}
                      color="white"
                      style={{
                        backgroundColor: "rgb(103 40 255)",
                        borderRadius: 100,
                        padding: 5,
                        margin: 3,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* 메세지 삭제 모달 */}
          <Modal
            isVisible={deleteModalVisible}
            onBackdropPress={() => setDeleteModalVisible(false)}
            style={{ justifyContent: "flex-end" }}
            // avoidKeyboard={true}
          >
            <View
              style={{
                backgroundColor: "rgb(26 27 27)",
                paddingHorizontal: 10,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: "white",
                    width: "10%",
                    marginVertical: 20,
                    borderRadius: 100,
                  }}
                />
              </View>

              <View
                style={{
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  paddingBottom: 20,
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "rgb(51 51 51)",
                    padding: 18,
                    borderRadius: 8,
                    gap: 7,
                  }}
                >
                  <FontAwesome6 name="copy" size={16} color="white" />
                  <Text style={{ color: "white", fontSize: 16 }}>복사</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDeletaMode(true);
                    setDeleteModalVisible(false);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "rgb(51 51 51)",
                    padding: 18,
                    borderRadius: 8,
                    gap: 7,
                  }}
                >
                  <FontAwesome6 name="trash-can" size={16} color="red" />
                  <Text style={{ color: "red", fontSize: 16 }}>삭제</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </TouchableWithoutFeedback>

      {/* 사이드 모달 */}
      <Modal
        isVisible={sideModalVisible}
        onBackdropPress={() => setSideModalVisible(false)}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        onModalHide={() => {
          if (pendingModal === "historyTitle") {
            setHistorytitleModalVisible(true);
            setPendingModal(null);
          }
        }}
        style={{
          margin: 0,
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <View
          style={{
            width: Dimensions.get("window").width * 0.7,
            height: "100%",
            backgroundColor: "rgb(38 39 39)",
          }}
        >
          <View style={{ marginTop: 50, marginHorizontal: 10 }}>
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                paddingVertical: 10,
              }}
            >
              대화방 관리
            </Text>
            <TouchableOpacity
              onPress={() => {
                setHistorytitle(`${getFormattedDate()}에 저장된 대화`);
                setSideModalVisible(false);
                setPendingModal("historyTitle");
              }}
            >
              <Text
                style={{
                  color: "rgb(209 213 219)",
                  fontSize: 16,
                  paddingVertical: 10,
                }}
              >
                대화 저장
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSideModalVisible(false);
                navigation.navigate("ChatHistoryList", { room_id });
              }}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "rgb(209 213 219)",
                  fontSize: 16,
                  paddingVertical: 10,
                }}
              >
                저장된 대화 불러오기
              </Text>
              <Ionicons
                name="chevron-forward-sharp"
                size={16}
                color="#ffffff80"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  color: "rgb(209 213 219)",
                  fontSize: 16,
                  paddingVertical: 10,
                }}
              >
                대화 삭제
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  color: "rgb(209 213 219)",
                  fontSize: 16,
                  paddingVertical: 10,
                }}
              >
                초기화
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 대화 내역 제목 입력 모달 */}
      <Modal
        isVisible={historyTitleModalVisible}
        avoidKeyboard={true}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <View
          style={{
            width: Dimensions.get("window").width * 0.8,
            backgroundColor: "rgb(38 39 39)",
            padding: 20,
            borderRadius: 16,
            gap: 10,
          }}
        >
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={{ color: "white", fontSize: 18 }}>
              대화 제목을 입력해주세요
            </Text>
          </View>
          <TextInput
            value={historyTitle}
            onChangeText={setHistorytitle}
            style={{
              backgroundColor: "rgb(45,45,45)",
              padding: 10,
              marginVertical: 10,
              borderRadius: 6,
              borderWidth: 0.3,
              borderColor: "rgba(225, 225,225, 0.3)",
              fontSize: 16,
              color: "white",
            }}
          />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity
              onPress={() => setHistorytitleModalVisible(false)}
              style={{
                flex: 1,
                backgroundColor: "rgba(62,62,65,.9)",
                alignItems: "center",
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "white", padding: 10 }}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={saveChatHistory}
              style={{
                flex: 1,
                backgroundColor: "rgb(124 103 255)",
                alignItems: "center",
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "white", padding: 10 }}>저장</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

export default Chat;

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
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
  infoContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  infoText: {
    color: "#ffffffb3",
  },
  userChatContainer: {
    alignItems: "flex-end",
    marginHorizontal: 10,
    padding: 3,
  },
  userChatBox: {
    backgroundColor: "rgb(124, 103, 255)",
    borderRadius: 16,
    borderTopRightRadius: 0,
    padding: 10,
    maxWidth: "70%",
    marginHorizontal: 10,
  },
  aiChatContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    gap: 5,
    padding: 3,
  },
  aiImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  aiChatContent: {
    flex: 1,
    gap: 5,
    alignItems: "flex-start",
  },
  aiName: {
    color: "#ffffffb3",
  },
  aiChatBox: {
    backgroundColor: "rgb(38, 39, 39)",
    borderRadius: 16,
    borderTopLeftRadius: 0,
    padding: 10,
    maxWidth: "80%",
  },
  inputContainer: {
    flexDirection: "row",
    gap: 5,
    marginHorizontal: 10,
    alignItems: "flex-end",
  },
  flashButton: {
    backgroundColor: "rgb(62, 62, 65)",
    borderRadius: 100,
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#3e3e41e6",
    borderRadius: 20,
    padding: 10,
    paddingRight: 30,
    color: "white",
  },
  asteriskButton: {
    position: "absolute",
    right: 45,
  },
  sendButton: {
    backgroundColor: "rgb(82, 32, 204)",
    borderRadius: 100,
    padding: 10,
  },
  editReloadButton: {
    padding: 10,
    backgroundColor: "rgb(38 39 39)",
    borderRadius: 100,
  },
});
