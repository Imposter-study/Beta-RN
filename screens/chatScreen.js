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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import Markdown from "react-native-markdown-display";
import * as SecureStore from "expo-secure-store";
import characterAPI from "../apis/characterAPI";
import roomAPI from "../apis/roomAPI";

function ChatScreen({ route }) {
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const { room_id, character_id } = route.params.character;

  const [loading, setLoading] = useState(true);
  const [character, setCharacter] = useState({});
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [selection, setSelection] = useState({ start: 0, end: 0 });

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

  const getCharacterInfo = async () => {
    characterAPI
      .get(`${character_id}/`)
      .then((response) => {
        console.log("chat response :\n", response.data);
        setCharacter(response.data);
        setChats(response.data.intro);
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
        // console.log(response.data.chats);
        setChats((prev) => [...prev, ...response.data.chats]);
        setLoading(false);
      })
      .catch((error) => {
        console.log("채팅 내역 가져오기 실패", error);
      });
  };

  const sendChat = async () => {
    const access = await SecureStore.getItemAsync("access");

    if (message.trim() !== "") {
      const userMessage = message;

      const updatedChats = [
        ...chats,
        { chat_id: chats.length, content: userMessage, role: "user" },
      ];
      setChats(updatedChats);
      setMessage("");
      scrollViewRef.current?.scrollToEnd({ animated: true });

      roomAPI
        .post(`${room_id}/messages/`, {
          message: userMessage,
        })
        .then((response) => {
          console.log("메세지 전송 완료");
          setChats((prev) => [
            ...prev,
            {
              chat_id: prev.length,
              content: response.data.ai_response,
              role: character.name,
            },
          ]);
        })
        .catch((error) => {
          console.log("메세지 전송 실패", error.response);
        });
    }
  };

  const pressAsterisk = () => {
    const before = message.slice(0, selection.start);
    const after = message.slice(selection.end);
    const newMessage = before + "*" + after;

    setMessage(newMessage);

    const newPosition = selection.start + 1;
    setSelection({ start: newPosition, end: newPosition });
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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="chevron-back-sharp" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.headerCenter}>
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
                </View>
                <Ionicons name="menu" size={24} color="white" />
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

                {chats.map((chat, index) =>
                  (chat.name || chat.role) !== character.name ? (
                    <View key={index} style={styles.userChatContainer}>
                      <View style={styles.userChatBox}>
                        <Markdown rules={markdownRules}>
                          {chat.content || chat.message}
                        </Markdown>
                      </View>
                    </View>
                  ) : (
                    <View key={index} style={styles.aiChatContainer}>
                      <Image
                        source={{
                          uri: character.character_image,
                        }}
                        style={styles.aiImage}
                      />
                      <View style={styles.aiChatContent}>
                        <Text style={styles.aiName}>{character.name}</Text>
                        <View style={styles.aiChatBox}>
                          <Markdown rules={markdownRules}>
                            {chat.content || chat.message}
                          </Markdown>
                        </View>
                      </View>
                    </View>
                  )
                )}
              </ScrollView>

              <View style={styles.inputContainer}>
                <View>
                  <Ionicons
                    name="flash"
                    size={18}
                    color="white"
                    style={styles.flashButton}
                  />
                </View>
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

                <TouchableOpacity>
                  {message === "" ? (
                    <Ionicons
                      name="play"
                      size={18}
                      color="white"
                      style={styles.sendButton}
                    />
                  ) : (
                    <TouchableOpacity onPress={sendChat}>
                      <Ionicons
                        name="arrow-up-sharp"
                        size={18}
                        color="white"
                        style={styles.sendButton}
                      />
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}
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
    marginBottom: 10,
  },
  userChatBox: {
    backgroundColor: "rgb(124, 103, 255)",
    borderRadius: 16,
    borderTopRightRadius: 0,
    padding: 10,
    maxWidth: "70%",
    marginHorizontal: 20,
  },
  aiChatContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    gap: 5,
    marginBottom: 10,
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
    maxWidth: "70%",
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
});
