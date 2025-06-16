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
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

function ChatScreen() {
  const navigation = useNavigation();

  const [chats, setChats] = useState([]);

  const character = {
    id: 1,
    imageUri:
      "https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800",
    name: "캐릭터 이름",
    intro: "캐릭터 인트로 소개글",
    tag: "#해시태그",
    creator: "@creator",
  };

  const getChat = () => {
    axios
      .get(API_URL + "room/1/")
      .then((response) => {
        setChats(response.data.chats);
        // console.log(response.data.chats);
      })
      .catch((error) => {
        console.log("채팅 내역 가져오기 실패", error);
      });
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
          <ScrollView>
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
                    <Text style={{ color: "white" }}>{chat.content}</Text>
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
                      <Text style={{ color: "white" }}>{chat.content}</Text>
                    </View>
                  </View>
                </View>
              )
            )}
          </ScrollView>

          {/* 채팅 입력 및 전송 */}
          <View style={{ flexDirection: "row", gap: 5, marginHorizontal: 10 }}>
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
            <View
              style={{ flex: 1, flexDirection: "row", position: "relative" }}
            >
              <TextInput
                placeholder="메시지 보내기"
                style={{
                  flex: 1,
                  backgroundColor: "#3e3e41e6",
                  borderRadius: 20,
                  padding: 10,
                  color: "white",
                }}
                placeholderTextColor="#ffffff80"
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 10,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 60, fontWeight: "300" }}
                >
                  *
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
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
