import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import roomAPI from "../apis/roomAPI";
import { useEffect, useState } from "react";
import Markdown from "react-native-markdown-display";
import characterAPI from "../apis/characterAPI";

function ChatHistoryDetail({ route }) {
  const { room_id, history } = route.params;
  const [chatHistory, setChatHistory] = useState([]);
  const [character, setCharacter] = useState({});
  const [intros, setIntro] = useState([]);

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

  const getCharacterInfo = (characterId) => {
    characterAPI
      .get(`${characterId}/`)
      .then((response) => {
        setCharacter(response.data);
        setIntro(response.data.intro);
      })
      .catch((error) => {
        console.log("캐릭터 정보 가져오기 실패", error?.response);
      });
  };

  const getChatHistoryDetail = () => {
    roomAPI
      .get(`${room_id}/histories/${history.history_id}/`)
      .then((response) => {
        console.log("대화내역 상세조회 성공 :\n", response.data);
        setChatHistory(response.data.chat_history);
        const { character_id } = response.data;
        getCharacterInfo(character_id);
      })
      .catch((error) => {
        console.log("대화내역 상세조회 실패", error?.response);
      });
  };

  useEffect(() => {
    getChatHistoryDetail();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back-sharp" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{history.title}</Text>
        </View>
        <View />
      </View>
      <ScrollView>
        <View style={styles.infoContainer}>
          <Ionicons name="alert-circle-outline" size={18} color="#ffffffb3" />
          <Text style={styles.infoText}>
            캐릭터가 보내는 메세지는 모두 생성된 내용이에요
          </Text>
        </View>

        {/* 인트로 */}
        {intros.map((intro, index) =>
          intro.role === "user" ? (
            <View key={index} style={styles.userChatContainer}>
              <View style={styles.userChatBox}>
                <Markdown rules={markdownRules}>{intro.message}</Markdown>
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
                  <Markdown rules={markdownRules}>{intro.message}</Markdown>
                </View>
              </View>
            </View>
          )
        )}

        {chatHistory.map((chat, index) =>
          chat.role === "user" ? (
            <View key={index} style={styles.userChatContainer}>
              <View style={styles.userChatBox}>
                <Markdown rules={markdownRules}>{chat.content}</Markdown>
              </View>
            </View>
          ) : chat.is_main ? (
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
                  <Markdown rules={markdownRules}>{chat.content}</Markdown>
                </View>
              </View>
            </View>
          ) : null
        )}
      </ScrollView>
      <View style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "rgb(82, 32, 204)",
            borderRadius: 6,
            padding: 10,
            marginVertical: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>대화 이어하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default ChatHistoryDetail;

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
    fontSize: 18,
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
});
