import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTab from "../components/bottomTab";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SignInButton from "../components/signInButtons";
import { useState, useEffect, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import accountAPI from "../apis/accountAPI";
import { DOMAIN } from "../config";
import characterAPI from "../apis/characterAPI";
import useCharacterStore from "../stores/useCharacterStore";

function MyPageScreen() {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const getUserProfile = async () => {
    accountAPI
      .get(`my_profile/`)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("유저 조회 실패", error?.response);
      });
  };

  const {
    setTitle,
    setDescription,
    setName,
    setCharacterInfo,
    setImage,
    setPresentation,
    setCreatorComment,
    editIntro,
    editExampleSituation,
    editHashtags,
  } = useCharacterStore();

  const handleEditCharacter = (characterID) => {
    characterAPI
      .get(`${characterID}/`)
      .then((response) => {
        const {
          character_id,
          name,
          character_image,
          title,
          intro,
          description,
          character_info,
          example_situation,
          presentation,
          creator_comment,
          hashtags,
        } = response.data;
        setTitle(title);
        setDescription(description);
        setName(name);
        setCharacterInfo(character_info);
        setImage(character_image);
        setPresentation(presentation);
        setCreatorComment(creator_comment);
        editIntro(intro);
        editExampleSituation(example_situation);
        editHashtags(hashtags);

        navigation.navigate("CreateCharacter", {
          character_id: character_id,
          isEdit: true,
          originalImage: character_image,
        });
      })
      .catch((error) => {
        console.log("캐릭터 정보 가져오기 실패", error?.response);
      });
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([getUserProfile()]);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await SecureStore.getItemAsync("access");
      const loggedIn = !!token;
      setIsLoggedIn(loggedIn); // 토큰 존재 여부로 로그인 상태 결정

      if (loggedIn) {
        getUserProfile();
      }
    };

    checkLogin();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>마이페이지</Text>
        <TouchableOpacity onPress={() => navigation.navigate("More")}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {!isLoggedIn ? (
        <View style={styles.content}>
          <View style={styles.intro}>
            <Text style={styles.introTitle}>beta</Text>
            <Text style={styles.introSubtitle}>
              다양한 AI 캐릭터와 나만의 스토리를 만들어보세요
            </Text>
          </View>

          <SignInButton />
        </View>
      ) : loading ? (
        <View>
          <Text>회원 정보를 가져오는 중입니다</Text>
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* 회원 정보 */}
          <View style={styles.userInfoContainer}>
            {user.profile_picture ? (
              <Image
                source={{ uri: `http://${DOMAIN}` + user.profile_picture }}
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
              <Text style={styles.followNumber}>{user.following_count}</Text>
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
              <Text style={styles.followNumber}>{user.followers_count}</Text>
              <Text style={styles.followLabel}>팔로워</Text>
            </TouchableOpacity>
          </View>

          {/* 프로필 공유 및 수정 버튼 */}
          <View style={styles.profileButtonContainer}>
            <TouchableOpacity style={styles.profileButton}>
              <Text style={styles.profileButtonText}>프로필 공유</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigation.navigate("EditProfile", { user })}
            >
              <Text style={styles.profileButtonText}>프로필 편집</Text>
            </TouchableOpacity>
          </View>

          {/* 유료 서비스 관리 */}
          <View style={styles.serviceContainer}>
            <Text style={styles.serviceTitle}>내 피스 / beta pro</Text>
            <View style={styles.serviceBoxTop}>
              <View style={styles.serviceItem}>
                <FontAwesome name="bitcoin" size={24} color="purple" />
                <Text style={styles.serviceText}>0</Text>
              </View>
              <MaterialIcons name="navigate-next" size={24} color="#ffffff80" />
            </View>
            <View style={styles.serviceBoxBottom}>
              <View style={styles.serviceItem}>
                <Text style={styles.betaBold}>beta</Text>
                <Text style={styles.betaLight}>pro</Text>
                <Text style={styles.serviceDesc}>광고 없이 beta하기</Text>
              </View>
              <View style={styles.servicePurchase}>
                <Text style={styles.purchaseText}>구매하기</Text>
                <MaterialIcons
                  name="navigate-next"
                  size={24}
                  color="#ffffff80"
                />
              </View>
            </View>
          </View>

          {/* 캐릭터 관리 */}
          <View style={styles.characterContainer}>
            <Text style={styles.characterTitle}>캐릭터 관리</Text>
            {user.characters.length === 0 ? (
              <View style={styles.characterEmpty}>
                <Text style={styles.characterEmptyText}>
                  아직 제작한 캐릭터가 없어요
                </Text>
                <Text style={styles.characterGuide}>
                  내가 원하는 캐릭터를 직접 제작해볼까요?
                </Text>
                <TouchableOpacity style={styles.createCharacterButton}>
                  <Text style={styles.createCharacterButtonText}>
                    캐릭터 제작하기
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              user.characters.map((character) => (
                <View
                  key={character.character_id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderWidth: 1,
                    borderColor: "#ffffff0d",
                    borderRadius: 16,
                    backgroundColor: "rgb(38 39 39)",
                    padding: 10,
                    marginVertical: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: `http://${DOMAIN}` + character.character_image,
                      }}
                      style={{ width: 50, height: 50, borderRadius: 100 }}
                    />
                    <View>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 16,
                          fontWeight: "500",
                        }}
                      >
                        {character.name}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        handleEditCharacter(character.character_id)
                      }
                    >
                      <Text
                        style={{
                          color: "white",
                          backgroundColor: "rgb(62, 62, 65)",
                          padding: 10,
                          borderRadius: 6,
                        }}
                      >
                        수정
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      )}

      <BottomTab
        activeTab="Mypage"
        onTabPress={(tabName) => navigation.navigate(tabName)}
      />
    </SafeAreaView>
  );
}

export default MyPageScreen;

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
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 5,
  },
  intro: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  introTitle: {
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
  },
  introSubtitle: {
    color: "rgb(209, 213, 219)",
  },
  loginButtonContainer: {
    gap: 10,
    width: "90%",
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    backgroundColor: "rgb(38, 39, 39)",
    borderColor: "rgb(62, 62, 65)",
    borderWidth: 0.5,
    paddingVertical: 7,
    borderRadius: 8,
  },
  loginIcon: {
    width: 24,
    height: 24,
  },
  googleIcon: {
    width: 24,
    height: 24,
    backgroundColor: "white",
    borderRadius: 12,
  },
  appleLoginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    backgroundColor: "white",
    borderColor: "rgb(62, 62, 65)",
    borderWidth: 0.5,
    paddingVertical: 7,
    borderRadius: 8,
  },
  appleIcon: {
    width: 24,
    height: 24,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
  },
  appleLoginButtonText: {
    color: "black",
    fontSize: 18,
  },
  userInfoContainer: {
    flexDirection: "row",
    gap: 10,
    marginLeft: 20,
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
    marginLeft: 20,
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
    marginHorizontal: 20,
    marginBottom: 50,
  },
  profileButton: {
    flex: 1,
    backgroundColor: "rgb(62, 62, 65)",
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
  serviceContainer: {
    marginHorizontal: 20,
    marginBottom: 50,
  },
  serviceTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
  },
  serviceBoxTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(38,39,39)",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  serviceBoxBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(38,39,39)",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  serviceText: {
    color: "white",
    fontSize: 18,
  },
  betaBold: {
    color: "white",
    fontSize: 14,
    fontWeight: "900",
  },
  betaLight: {
    color: "white",
    fontSize: 14,
    fontWeight: "200",
  },
  serviceDesc: {
    color: "#ffffff80",
    fontSize: 14,
  },
  servicePurchase: {
    flexDirection: "row",
    alignItems: "center",
  },
  purchaseText: {
    color: "#ffffff80",
  },
  characterContainer: {
    marginHorizontal: 20,
    marginBottom: 50,
  },
  characterTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  characterEmpty: {
    alignItems: "center",
    padding: 30,
    gap: 10,
  },
  characterEmptyText: {
    color: "#ffffff80",
    fontSize: 16,
  },
  characterGuide: {
    color: "white",
    fontWeight: "500",
    fontSize: 18,
  },
  createCharacterButton: {
    marginVertical: 10,
  },
  createCharacterButtonText: {
    color: "white",
    backgroundColor: "rgb(82, 32, 204)",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
  },
});
