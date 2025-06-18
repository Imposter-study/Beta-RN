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
import axios from "axios";
import Markdown from "react-native-markdown-display";
import { API_URL } from "../config";

function ChatScreen() {
  const navigation = useNavigation();
  const scrollViewRef = useRef();

  const [chats, setChats] = useState([]);
  const [characterId, setCharacterId] = useState("");
  const [message, setMessage] = useState("");
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const markdownRules = {
    paragraph: (node, children, parent, styles) => {
      // 현재 node가 parent.children 중 마지막인지 확인
      const siblings = parent[0].children;
      const isLast = node.index === siblings[siblings.length - 1].index;

      return (
        <Text
          key={node.key}
          style={{
            color: "white",
            marginBottom: isLast ? 0 : 16, // 마지막이면 marginBottom 없애기
          }}
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

  const character = {
    id: 1,
    imageUri:
      "https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800",
    name: "캐릭터 이름",
    intro: "캐릭터 인트로 소개글",
    tag: "#해시태그",
    creator: "@creator",
  };

  // 채팅 내역 가져오기
  const getChat = () => {
    axios
      .get(API_URL + "room/1/")
      .then((response) => {
        setChats(response.data.chats);
        setCharacterId(response.data.character_id);
        // console.log(response.data.chats);
      })
      .catch((error) => {
        console.log("채팅 내역 가져오기 실패", error);
      });
  };

  // 채팅 전송하기
  const sendChat = () => {
    if (message.trim() !== "") {
      const userMessage = message; // 비동기 이슈 방지용

      // 유저 메시지 UI에 추가
      const updatedChats = [
        ...chats,
        { chat_id: chats.length, content: userMessage, role: "user" },
      ];
      setChats(updatedChats);
      setMessage("");
      scrollViewRef.current?.scrollToEnd({ animated: true });

      // API 요청
      axios
        .post(API_URL + "room/", {
          character_id: characterId,
          message: userMessage,
        })
        .then((response) => {
          console.log("메세지 전송 완료");
          setChats((prev) => [
            ...prev,
            {
              chat_id: prev.length,
              content: response.data.ai_response,
              role: "ai",
            },
          ]);
        })
        .catch((error) => {
          console.log("메세지 전송 실패", error);
        });
    }
  };

  const pressAsterisk = () => {
    const before = message.slice(0, selection.start);
    const after = message.slice(selection.end);
    const newMessage = before + "*" + after;

    setMessage(newMessage);

    // 커서 위치를 * 뒤로 이동
    const newPosition = selection.start + 1;
    setSelection({ start: newPosition, end: newPosition });
  };

  useEffect(() => {
    getChat();
  }, []);

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
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
          >
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
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
            {chats.map((chat, index) =>
              chat.role === "user" ? (
                <View
                  key={index}
                  style={{ alignItems: "flex-end", marginBottom: 10 }}
                >
                  {/* 유저 채팅 */}
                  <View
                    style={{
                      backgroundColor: "rgb(124, 103, 255)",
                      borderRadius: 16,
                      borderTopRightRadius: 0,
                      padding: 10,
                      maxWidth: "70%",
                      marginHorizontal: 20,
                    }}
                  >
                    <Markdown rules={markdownRules}>{chat.content}</Markdown>
                  </View>
                </View>
              ) : (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    marginHorizontal: 20,
                    gap: 5,
                    marginBottom: 10,
                  }}
                >
                  {/* 캐릭터(AI) 채팅 */}
                  <Image
                    source={{ uri: character.imageUri }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                    }}
                  />
                  <View style={{ flex: 1, gap: 5, alignItems: "flex-start" }}>
                    <Text style={{ color: "#ffffffb3" }}>캐릭터 이름</Text>
                    <View
                      style={{
                        backgroundColor: "rgb(38, 39, 39)",
                        borderRadius: 16,
                        borderTopLeftRadius: 0,
                        padding: 10,
                        maxWidth: "70%",
                      }}
                    >
                      <Markdown rules={markdownRules}>{chat.content}</Markdown>
                    </View>
                  </View>
                </View>
              )
            )}
          </ScrollView>

          {/* 채팅 입력 및 전송 */}
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              marginHorizontal: 10,
              alignItems: "flex-end",
            }}
          >
            <View>
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
              style={{
                flex: 1,
                backgroundColor: "#3e3e41e6",
                borderRadius: 20,
                padding: 10,
                paddingRight: 30,
                color: "white",
              }}
              placeholderTextColor="#ffffff80"
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 45,
              }}
              onPress={() => pressAsterisk()}
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
                  style={{
                    backgroundColor: "rgb(82, 32, 204)",
                    borderRadius: "100%",
                    padding: 10,
                  }}
                />
              ) : (
                <TouchableOpacity onPress={() => sendChat()}>
                  <Ionicons
                    name="arrow-up-sharp"
                    size={18}
                    color="white"
                    style={{
                      backgroundColor: "rgb(82, 32, 204)",
                      borderRadius: "100%",
                      padding: 10,
                    }}
                  />
                </TouchableOpacity>
              )}
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
