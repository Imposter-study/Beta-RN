import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTab from "../components/bottomTab";
import { useEffect, useState } from "react";
import { DOMAIN } from "../config";
import roomAPI from "../apis/roomAPI";
import characterAPI from "../apis/characterAPI";

function ChatListScreen() {
  const navigation = useNavigation();
  const [chatRooms, setChatRooms] = useState([]);
  const [scrapped, setIsScrapped] = useState([]);

  const getChatRooms = async () => {
    roomAPI
      .get("")
      .then((response) => {
        console.log("chat list response :\n", response.data);
        setChatRooms(response.data);
      })
      .catch((error) => {
        console.log("채팅 목록 조회 실패", error?.response);
      });
  };

  const moveChatRoom = (room) => {
    navigation.navigate("Chat", {
      character: {
        character_id: room.character_id,
        room_id: room.room_id,
      },
    });
  };

  const getScrappedCharacter = () => {
    characterAPI
      .get("my_scrap_characters/")
      .then((response) => {
        console.log("\n스크랩한 캐릭터 :\n", response.data);
        setIsScrapped(response.data);
      })
      .catch((error) => {
        console.log("스크랩한 캐릭터 가져오기 실패", error?.response);
      });
  };

  useEffect(() => {
    getChatRooms();
    getScrappedCharacter();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.container}>
        {/* 상단메뉴 */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>대화</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <MaterialIcons name="manage-search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="settings" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 스크랩한 캐릭터 */}
        <View style={styles.scrapSection}>
          <Text style={styles.scrapTitle}>스크랩한 캐릭터</Text>
          {scrapped.length === 0 ? (
            <View style={styles.scrapBox}>
              <Text style={styles.scrapText}>
                아직 스크랩한 캐릭터가 없어요
              </Text>
            </View>
          ) : (
            <ScrollView horizontal style={{ marginHorizontal: 20 }}>
              {scrapped.map((item) => (
                <TouchableOpacity
                  key={item.character_id}
                  onPress={() =>
                    navigation.navigate("CharacterDetail", {
                      character_id: item.character_id,
                    })
                  }
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 5,
                    marginHorizontal: 5,
                  }}
                >
                  <Image
                    source={{ uri: item.character_image }}
                    style={{ width: 50, height: 50, borderRadius: 100 }}
                  />
                  <Text style={{ color: "white" }}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* 대화 목록 */}
        <View style={styles.chatSection}>
          <Text style={styles.chatSort}>최신순/오래된순</Text>
          {chatRooms.length === 0 ? (
            <View style={styles.emptyChatBox}>
              <Text style={styles.emptyChatText}>
                아직 대화한 캐릭터가 없어요
              </Text>
            </View>
          ) : (
            <ScrollView>
              {chatRooms.map((room) => (
                <TouchableOpacity
                  key={room.room_id}
                  onPress={() => {
                    moveChatRoom(room);
                  }}
                  style={{
                    flexDirection: "row",
                    marginTop: 15,
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Image
                    source={{
                      uri:
                        `http://${DOMAIN}` + room.character_image ||
                        "대체이미지",
                    }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        color: "rgb(249, 250, 251)",
                        fontSize: 16,
                        fontWeight: "500",
                      }}
                    >
                      {room.character_title}
                    </Text>
                    <Text style={{ color: "rgb(133, 141, 155)" }}>
                      {room.last_message}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* 하단메뉴 */}
        <BottomTab
          activeTab="ChatList"
          onTabPress={(tabName) => navigation.navigate(tabName)}
        />
      </View>
    </SafeAreaView>
  );
}

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1a1b1b",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#ffffff20",
    borderBottomWidth: 0.3,
    padding: 16,
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 10,
  },
  scrapSection: {
    paddingVertical: 20,
    marginBottom: 10,
  },
  scrapTitle: {
    color: "white",
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  scrapBox: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderBottomColor: "#ffffff20",
    borderBottomWidth: 0.3,
  },
  scrapText: {
    color: "#ffffff80",
    fontSize: 16,
  },
  chatSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chatSort: {
    color: "#ffffffb3",
    fontSize: 16,
  },
  emptyChatBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyChatText: {
    color: "#ffffffb3",
  },
});
