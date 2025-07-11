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
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import characterAPI from "../../../apis/characterAPI";
import roomAPI from "../../../apis/roomAPI";
import { markdownRules } from "../../../utils/markdownRules";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.9;

function CharacterDetail({ route }) {
  const { character_id } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [character, setCharacter] = useState();
  const [isScrapped, setIsScrapped] = useState(false);

  const getCharacterDetail = () => {
    characterAPI
      .get(`${character_id}/`)
      .then((response) => {
        console.log("캐릭터 상세 : ", response.data);
        setCharacter(response.data);
        setIsScrapped(response.data.is_scrapped);
        setLoading(false);
      })
      .catch((error) => {
        console.log("캐릭터 정보 가져오기 실패\n", error?.response);
      });
  };

  const createChatRoom = async () => {
    const { room_number } = character;

    if (!room_number) {
      roomAPI
        .post("", { character_id })
        .then((response) => {
          console.log(response.data);
          // const { room_id } = response.data;
          navigation.navigate("Chat", { character: response.data });
        })
        .catch((error) => {
          console.log("채팅방 생성 실패", error?.response);
        });
    } else {
      navigation.navigate("Chat", {
        character: { room_id: room_number, character_id },
      });
    }
  };

  const handleScrap = () => {
    characterAPI
      .post(`scrap/${character_id}/`)
      .then((response) => {
        console.log(response.data);
        if (response.data.detail === "스크랩 완료!") {
          setIsScrapped(true);
        } else {
          setIsScrapped(false);
        }
        Toast.show({
          type: "info",
          text1: response.data.detail,
        });
      })
      .catch((error) => {
        console.log("캐릭터 스크랩 상태 변경 실패", error?.response);
      });
  };

  useEffect(() => {
    getCharacterDetail();
  }, [character_id]);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Text>캐릭터 정보를 가져오는 중입니다</Text>
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-sharp" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: character.character_image || "대체이미지" }}
                style={styles.characterImage}
              />
            </View>
            <View style={styles.characterInfo}>
              <Text style={styles.characterName}>{character.title}</Text>
              <Text style={styles.characterIntro}>
                {character.presentation}
              </Text>
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
                        source={{
                          uri: character.character_image || "대체이미지",
                        }}
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
                            source={{
                              uri: character.character_image || "대체이미지",
                            }}
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
                style={{
                  color: "white",
                  marginVertical: 7,
                  fontWeight: "bold",
                }}
              >
                • {character.name}{" "}
              </Text>
              <Text style={styles.sectionContent}>
                {character.character_info}
              </Text>
            </View>
            <View style={styles.creatorBox}>
              <Text style={styles.sectionTitle}>크리에이터</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Profile", {
                    nickname: character.user.uuid,
                  })
                }
                style={styles.creatorInfo}
              >
                <FontAwesome name="user-circle-o" size={24} color="gray" />
                <View>
                  <Text style={styles.creatorName}>
                    {character.user.nickname}
                  </Text>
                  <Text style={styles.creatorId}>
                    {character.user.username}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={handleScrap} style={styles.chatButton}>
              {isScrapped ? (
                <Ionicons name="bookmark" size={24} color="white" />
              ) : (
                <Ionicons name="bookmark-outline" size={24} color="white" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.chatButton, flex: 1 }}
              onPress={() => {
                createChatRoom();
              }}
            >
              <Text style={styles.chatButtonText}>대화 시작하기</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

export default CharacterDetail;

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
    flexDirection: "row",
    backgroundColor: "rgb(26, 27, 27)",
    borderTopColor: "#ffffff14",
    borderTopWidth: 0.3,
    paddingHorizontal: 20,
    gap: 10,
  },
  chatButton: {
    backgroundColor: "rgb(82, 32, 204)",
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
