import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import accountAPI from "../../apis/accountAPI";
import { useState, useEffect } from "react";
import { DOMAIN } from "../../config";

function ChatEdit() {
  const navigation = useNavigation();

  const [chatProfiles, setChatProfiles] = useState([]);

  const getChatProfile = () => {
    accountAPI
      .get(`chat_profiles/`)
      .then((response) => {
        console.log("대화 프로필 조회 성공:\n", response.data);
        setChatProfiles(response.data);
      })
      .catch((error) => {
        console.log("대화 프로필 조회 실패", error?.response);
      });
  };

  useEffect(() => {
    getChatProfile();
  }, []);

  return (
    <View style={styles.formContainer}>
      <TouchableOpacity
        style={styles.addProfileButton}
        onPress={() => navigation.navigate("ChatProfile")}
      >
        <Ionicons name="add" size={30} color="white" style={styles.addIcon} />
        <Text style={styles.addProfileText}>대화 프로필 추가</Text>
      </TouchableOpacity>

      <ScrollView>
        {chatProfiles.map((profile) => (
          <View key={profile.uuid} style={styles.profileItem}>
            <View style={styles.profileInfo}>
              {profile.chat_profile_picture !== null ? (
                <Image
                  source={{
                    uri: `http://${DOMAIN}` + profile.chat_profile_picture,
                  }}
                  style={{ width: 40, height: 40, borderRadius: 100 }}
                />
              ) : (
                <FontAwesome name="user-circle-o" size={40} color="gray" />
              )}
              <View style={styles.profileTextContainer}>
                <Text style={styles.profileNickname}>
                  {profile.chat_nickname}
                </Text>
                <Text style={styles.profileDescription}>
                  {profile.chat_description || "설명없음"}
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <FontAwesome name="pencil" size={18} color="#ffffff80" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default ChatEdit;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  addProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 15,
  },
  addIcon: {
    borderWidth: 1,
    borderRadius: 100, // '100%' 대신 숫자로
    padding: 5,
    backgroundColor: "#ffffff0d",
    borderColor: "#ffffff14",
  },
  addProfileText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  profileItem: {
    flexDirection: "row",
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileTextContainer: {
    gap: 5,
  },
  profileNickname: {
    color: "white",
    fontSize: 16,
  },
  profileDescription: {
    color: "#fff3",
    fontSize: 12,
  },
});
