import { useNavigation } from "@react-navigation/native";
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
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as SecureStore from "expo-secure-store";
import accountAPI from "../../../apis/accountAPI";
import { DOMAIN } from "../../../config";

function Follow({ route }) {
  const { followers_count, following_count, followings, followers, nickname } =
    route.params.user || {};
  const { type } = route.params;
  const navigation = useNavigation();
  const [category, setCategory] = useState(type);

  const myUUID = SecureStore.getItem("uuid");

  const handleFollow = (UUID) => {
    accountAPI
      .post(`follow/`, { uuid: UUID })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("팔로우/언팔로우 실패", error.response);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-sharp" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{nickname}</Text>
        <View />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={
            category === "following"
              ? styles.activeCategory
              : styles.deactiveCategory
          }
          onPress={() => setCategory("following")}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              paddingVertical: 15,
            }}
          >
            {following_count} 팔로잉
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            category === "follower"
              ? styles.activeCategory
              : styles.deactiveCategory
          }
          onPress={() => setCategory("follower")}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              paddingVertical: 15,
            }}
          >
            {followers_count} 팔로워
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {category === "follower"
          ? followers.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: 10,
                  padding: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Profile", { nickname: item.uuid })
                  }
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    flex: 1,
                  }}
                >
                  {item.profile_picture ? (
                    <Image
                      source={{
                        uri: `http://${DOMAIN}` + user.profile_picture,
                      }}
                      style={{ width: 50, height: 50, borderRadius: 100 }}
                    />
                  ) : (
                    <FontAwesome name="user-circle-o" size={50} color="gray" />
                  )}
                  <View>
                    <Text style={{ color: "white", fontSize: 16 }}>
                      {item.nickname}
                    </Text>
                    <Text style={{ color: "#ffffff80", fontSize: 14 }}>
                      @{item.username}
                    </Text>
                  </View>
                </TouchableOpacity>
                {item.uuid === myUUID ? null : (
                  <TouchableOpacity
                    onPress={() => handleFollow(item.uuid)}
                    style={{
                      backgroundColor: item.is_following
                        ? "rgb(62, 62, 65)"
                        : "rgb(82 32 204)",
                      borderRadius: 6,
                    }}
                  >
                    <Text style={{ color: "white", padding: 10 }}>팔로우</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))
          : followings.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: 10,
                  padding: 5,
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    flex: 1,
                  }}
                >
                  {item.profile_picture ? (
                    <Image
                      source={{
                        uri: `http://${DOMAIN}` + user.profile_picture,
                      }}
                      style={{ width: 50, height: 50, borderRadius: 100 }}
                    />
                  ) : (
                    <FontAwesome name="user-circle-o" size={50} color="gray" />
                  )}
                  <View>
                    <Text style={{ color: "white", fontSize: 16 }}>
                      {item.nickname}
                    </Text>
                    <Text style={{ color: "#ffffff80", fontSize: 14 }}>
                      @{item.username}
                    </Text>
                  </View>
                </TouchableOpacity>
                {item.uuid === myUUID ? null : (
                  <TouchableOpacity
                    onPress={() => handleFollow(item.uuid)}
                    style={{
                      backgroundColor: item.is_following
                        ? "rgb(62, 62, 65)"
                        : "rgb(82 32 204)",
                      borderRadius: 6,
                    }}
                  >
                    <Text style={{ color: "white", padding: 10 }}>팔로우</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Follow;

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  activeCategory: {
    flex: 0.5,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(103, 40, 255)",
  },
  deactiveCategory: {
    flex: 0.5,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ffffff14",
  },
});
