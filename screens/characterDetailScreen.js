import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Markdown from "react-native-markdown-display";
import axios from "axios";
import { API_URL } from "../config";
import * as SecureStore from "expo-secure-store";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.9;

function CharacterDetailScreen({ route }) {
  const { character } = route.params;
  const navigation = useNavigation();

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

  const createChatRoom = async () => {
    console.log(character);
    const character_id = character.character;
    const access = await SecureStore.getItemAsync("access");

    axios
      .post(
        API_URL + "rooms/",
        { character_id },
        { headers: { Authorization: `Bearer ${access}` } }
      )
      .then((response) => {
        console.log(response.data);
        // const { room_id } = response.data;
        navigation.navigate("Chat", { character: response.data });
      })
      .catch((error) => {
        console.log("채팅방 생성 실패", error?.response);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-sharp" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: character.character_image }}
            style={styles.characterImage}
          />
        </View>
        <View style={styles.characterInfo}>
          <Text style={styles.characterName}>{character.title}</Text>
          <Text style={styles.characterIntro}>{character.presentation}</Text>
          <Text style={styles.characterTag}>{character.hashtag}</Text>
        </View>
        <>
          <Text style={styles.sectionTitle}>인트로</Text>
          {character.intro.map((item) => {
            if (item.role === "user") {
              return (
                <View
                  key={item.id}
                  style={{
                    flexDirection: "row",
                    padding: 10,
                    gap: 3,
                    justifyContent: "flex-end",
                  }}
                >
                  <View
                    style={{
                      maxWidth: "60%",
                      padding: 10,
                      borderRadius: 12,
                      marginVertical: 4,
                      backgroundColor: "rgb(124, 103, 255)",
                      borderTopRightRadius: 0,
                    }}
                  >
                    <Markdown rules={markdownRules}>{item.message}</Markdown>
                  </View>
                </View>
              );
            } else {
              return (
                <View key={item.id} style={styles.messageContainer}>
                  <Image
                    source={{ uri: character.character_image }}
                    style={styles.messageImage}
                  />
                  <View style={styles.messageBubble}>
                    <Markdown rules={markdownRules}>{item.message}</Markdown>
                  </View>
                </View>
              );
            }
          })}
        </>
        <>
          {character.example_situation.map((example, index) => (
            <View key={index}>
              <View
                style={{
                  borderColor: "#ffffff0d",
                  borderWidth: 1,
                  marginVertical: 20,
                }}
              />
              <Text style={styles.sectionTitle}>상황예시 {index + 1}</Text>
              {example.map((item) => {
                if (item.role === "user") {
                  return (
                    <View
                      key={item.id}
                      style={{
                        flexDirection: "row",
                        padding: 10,
                        gap: 3,
                        justifyContent: "flex-end",
                      }}
                    >
                      <View
                        style={{
                          maxWidth: "75%",
                          padding: 10,
                          borderRadius: 12,
                          marginVertical: 4,
                          backgroundColor: "rgb(124, 103, 255)",
                          borderTopRightRadius: 0,
                        }}
                      >
                        <Markdown rules={markdownRules}>
                          {item.message}
                        </Markdown>
                      </View>
                    </View>
                  );
                } else {
                  return (
                    <View key={item.id} style={styles.messageContainer}>
                      <Image
                        source={{ uri: character.character_image }}
                        style={styles.messageImage}
                      />
                      <View style={styles.messageBubble}>
                        <Markdown rules={markdownRules}>
                          {item.message}
                        </Markdown>
                      </View>
                    </View>
                  );
                }
              })}
            </View>
          ))}
        </>

        <View style={styles.detailBox}>
          <Text style={styles.sectionTitle}>상세설명</Text>
          <Text style={styles.sectionContent}>{character.description}</Text>
          <Text
            style={{ color: "white", marginVertical: 7, fontWeight: "bold" }}
          >
            • {character.name}{" "}
          </Text>
          <Text style={styles.sectionContent}>{character.character_info}</Text>
        </View>
        <View style={styles.creatorBox}>
          <Text style={styles.sectionTitle}>크리에이터</Text>
          <View style={styles.creatorInfo}>
            <FontAwesome name="user-circle-o" size={24} color="gray" />
            <View>
              <Text style={styles.creatorName}>닉네임</Text>
              <Text style={styles.creatorId}>{character.creator}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => {
            createChatRoom();
          }}
        >
          <Text style={styles.chatButtonText}>대화 시작하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default CharacterDetailScreen;

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
  },
  scrollContainer: {
    padding: 10,
  },
  imageContainer: {
    alignItems: "center",
  },
  characterImage: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: 12,
  },
  characterInfo: {
    padding: 10,
    gap: 3,
  },
  characterName: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  characterIntro: {
    color: "#ffffffb3",
  },
  characterTag: {
    color: "rgb(167,153,255)",
    fontSize: 16,
  },
  messageContainer: {
    flexDirection: "row",
    padding: 10,
    gap: 3,
  },
  messageImage: {
    borderRadius: 100,
    width: 50,
    height: 50,
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 12,
    marginVertical: 4,
    backgroundColor: "rgb(38,39,39)",
    borderTopLeftRadius: 0,
  },
  detailBox: {
    backgroundColor: "rgb(38,39,39)",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  creatorBox: {
    backgroundColor: "rgb(38,39,39)",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 7,
  },
  sectionContent: {
    color: "#ffffffb3",
  },
  creatorInfo: {
    flexDirection: "row",
    gap: 3,
  },
  creatorName: {
    color: "white",
  },
  creatorId: {
    color: "#ffffff80",
    fontSize: 12,
  },
  bottomContainer: {
    backgroundColor: "rgb(26, 27, 27)",
    borderTopColor: "#ffffff14",
    borderTopWidth: 0.3,
  },
  chatButton: {
    backgroundColor: "rgb(82, 32, 204)",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  chatButtonText: {
    color: "white",
    fontSize: 16,
  },
});
