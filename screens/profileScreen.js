import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import accountAPI from "../apis/accountAPI";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { DOMAIN } from "../config";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.45;

function ProfileScreen({ route }) {
  const navigation = useNavigation();
  const { nickname } = route.params;
  const [user, setUser] = useState({});
  const [characters, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserProfile = async () => {
    accountAPI
      .get(`${nickname}/`)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        setCharacter(response.data.characters);
        setLoading(false);
      })
      .catch((error) => {
        console.log("유저 조회 실패", error?.response);
      });
  };

  const handleFollow = () => {
    accountAPI
      .post(`follow/`, { uuid: user.uuid })
      .then((response) => {
        console.log(response.data);
        getUserProfile();
      })
      .catch((error) => {
        console.log("팔로우/언팔로우 실패", error.response);
      });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const renderItem = ({ index }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("CharacterDetail", {
            character_id: characters[index].character_id,
          })
        }
      >
        <Image
          source={{
            uri: `http://${DOMAIN}` + characters[index].character_image,
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.name}>{characters[index].title}</Text>
          <Text style={styles.intro}>{characters[index].presentation}</Text>
          <View style={{ flexDirection: "row", gap: 5 }}>
            {characters[index].hashtags.map((item, index) => (
              <Text key={index} style={styles.tag}>
                #{item.tag_name}
              </Text>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-sharp" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: "white" }}>회원 정보를 가져오는 중입니다</Text>
        </View>
      ) : (
        <FlatList
          data={characters}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
          columnWrapperStyle={styles.columnWrapper}
          ListHeaderComponent={
            <>
              {/* 회원 정보 */}
              <View>
                <View style={styles.userInfoContainer}>
                  {user.profile_picture ? (
                    <Image
                      source={{
                        uri: `http://${DOMAIN}` + user.profile_picture,
                      }}
                      style={{ width: 70, height: 70, borderRadius: 100 }}
                    />
                  ) : (
                    <FontAwesome name="user-circle-o" size={70} color="gray" />
                  )}
                  <View style={styles.userTextContainer}>
                    <Text style={styles.nickname}>{user.nickname}</Text>
                    <Text style={styles.userId}>@{user.username}</Text>
                  </View>
                </View>
                <Text style={{ color: "white" }}>
                  {user.introduce ? "" : user.introduce}
                </Text>
              </View>

              {/* 팔로잉, 팔로워 */}
              <View style={styles.followContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Follow", {
                      user,
                      type: "following",
                    })
                  }
                  style={styles.followItem}
                >
                  <Text style={styles.followNumber}>
                    {user.following_count}
                  </Text>
                  <Text style={styles.followLabel}>팔로잉</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Follow", {
                      user,
                      type: "follower",
                    })
                  }
                  style={styles.followItem}
                >
                  <Text style={styles.followNumber}>
                    {user.followers_count}
                  </Text>
                  <Text style={styles.followLabel}>팔로워</Text>
                </TouchableOpacity>
              </View>

              {/* 프로필 공유 및 수정 버튼 */}
              <View style={styles.profileButtonContainer}>
                <TouchableOpacity style={styles.profileButton}>
                  <Text style={styles.profileButtonText}>프로필 공유</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    user.is_following
                      ? styles.profileButton
                      : styles.followButton
                  }
                  onPress={handleFollow}
                >
                  <Text style={styles.profileButtonText}>
                    {user.is_following ? "팔로잉" : "팔로우"}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ gap: 3, marginBottom: 10 }}>
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  캐릭터
                </Text>
                <Text style={{ color: "#ffffff80" }}>
                  {user.characters.length}개의 캐릭터
                </Text>
              </View>
            </>
          }
        />
      )}
    </SafeAreaView>
  );
}

export default ProfileScreen;

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
  userInfoContainer: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
  },
  userTextContainer: {
    justifyContent: "center",
    gap: 3,
  },
  nickname: {
    color: "white",
    fontSize: 24,
    fontWeight: "500",
  },
  userId: {
    color: "#ffffff80",
    fontSize: 16,
  },
  followContainer: {
    flexDirection: "row",
    gap: 5,
    marginVertical: 10,
  },
  followItem: {
    flexDirection: "row",
    gap: 3,
  },
  followNumber: {
    color: "white",
  },
  followLabel: {
    color: "#ffffff80",
  },
  profileButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    marginBottom: 50,
  },
  profileButton: {
    flex: 1,
    backgroundColor: "rgb(62, 62, 65)",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  followButton: {
    flex: 1,
    backgroundColor: "rgb(82 32 204)",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  profileButtonText: {
    color: "white",
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    marginBottom: 6,
    gap: 4,
    width: imageWidth,
  },
  image: {
    width: "100%",
    height: imageWidth,
    borderRadius: 12,
  },
  name: {
    color: "white",
    fontWeight: "bold",
  },
  intro: {
    color: "#ffffff80",
  },
  tag: {
    color: "#ffffffb3",
  },
  flatListContent: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    marginTop: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
