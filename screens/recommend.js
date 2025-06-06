import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Button,
  ScrollView,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTab from "../components/bottomTab";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.3;

function Recommend() {
  // const navigation = useNavigation();

  const topCharacters = Array(10).fill({
    id: 1,
    imageUri:
      "https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800",
    name: "캐릭터 이름",
    intro: "캐릭터 인트로 소개글",
    tag: "#해시태그",
    creator: "@creator",
  });

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.container}>
        {/* 상단 메뉴 */}
        <View style={styles.topBar}>
          <View style={styles.navLeft}>
            <TouchableOpacity>
              <Text style={styles.navInactive}>홈</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.navActive}>추천</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.navInactive}>랭킹</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.navRight}>
            <TouchableOpacity>
              <Feather name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          {/* 실시간 TOP 10 캐릭터 */}
          <View style={{ padding: 20 }}>
            <View
              style={{
                flexDirection: "row",

                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
              >
                실시간 TOP 10 캐릭터
              </Text>
              <Button title="더보기" color={"#7C67FF"} />
            </View>
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10 }}
              >
                {topCharacters.map((char, index) => (
                  <TouchableOpacity key={index} style={styles.card}>
                    {/* 이미지와 순위 (겹치기) */}
                    <View style={{ position: "relative", marginBottom: 8 }}>
                      <Image
                        source={{ uri: char.imageUri }}
                        style={styles.image}
                      />
                      <View
                        style={{
                          position: "absolute",
                          bottom: 0, // 이미지 하단에 살짝 걸치게
                          left: -16,
                          // backgroundColor: "#7C67FF",
                          // borderRadius: 12,
                          paddingHorizontal: 6,
                          paddingVertical: 2,
                        }}
                      >
                        <Text
                          style={{
                            color: "#00000080",
                            fontWeight: "bold",
                            fontSize: imageWidth * 0.6,
                          }}
                        >
                          {index + 1}
                        </Text>
                      </View>
                    </View>

                    {/* 텍스트 정보들 */}
                    <View
                      style={{
                        width: "100%",
                        padding: 5,
                        marginHorizontal: 10,
                      }}
                    >
                      <Text style={styles.name}>{char.name}</Text>
                      <Text style={styles.intro}>{char.intro}</Text>
                      <Text style={styles.tag}>{char.tag}</Text>
                      <Text
                        style={{
                          color: "#ffffff80",
                          borderRadius: 6,
                          backgroundColor: "black",
                          alignSelf: "flex-start",
                          paddingHorizontal: 4,
                          paddingVertical: 2,
                          marginTop: 4,
                        }}
                      >
                        {char.creator}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* 내 맘을 훔쳐간 유죄남 모음.zip */}
          <View style={{ padding: 20 }}>
            <View
              style={{
                flexDirection: "row",

                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
              >
                내 맘을 훔쳐간 유죄남 모음.zip
              </Text>
              {/* <Button title="더보기" color={"#7C67FF"} /> */}
            </View>
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10 }}
              >
                {topCharacters.map((char, index) => (
                  <TouchableOpacity key={index} style={styles.card}>
                    <Image
                      source={{ uri: char.imageUri }}
                      style={styles.image}
                    />

                    {/* 텍스트 정보들 */}
                    <View
                      style={{
                        width: "100%",
                        padding: 5,
                        marginHorizontal: 10,
                      }}
                    >
                      <Text style={styles.name}>{char.name}</Text>
                      <Text style={styles.intro}>{char.intro}</Text>
                      <Text style={styles.tag}>{char.tag}</Text>
                      <Text
                        style={{
                          color: "#ffffff80",
                          borderRadius: 6,
                          backgroundColor: "black",
                          alignSelf: "flex-start",
                          paddingHorizontal: 4,
                          paddingVertical: 2,
                          marginTop: 4,
                        }}
                      >
                        {char.creator}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* 이제 막 주목받기 시작한 캐릭터들 */}
          <View style={{ padding: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
              >
                이제 막 주목받기 시작한 캐릭터들
              </Text>
              {/* <Button title="더보기" color={"#7C67FF"} /> */}
            </View>
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10 }}
              >
                {topCharacters.map((char, index) => (
                  <TouchableOpacity key={index} style={styles.card}>
                    <Image
                      source={{ uri: char.imageUri }}
                      style={styles.image}
                    />

                    {/* 텍스트 정보들 */}
                    <View
                      style={{
                        width: "100%",
                        padding: 5,
                        marginHorizontal: 10,
                      }}
                    >
                      <Text style={styles.name}>{char.name}</Text>
                      <Text style={styles.intro}>{char.intro}</Text>
                      <Text style={styles.tag}>{char.tag}</Text>
                      <Text
                        style={{
                          color: "#ffffff80",
                          borderRadius: 6,
                          backgroundColor: "black",
                          alignSelf: "flex-start",
                          paddingHorizontal: 4,
                          paddingVertical: 2,
                          marginTop: 4,
                        }}
                      >
                        {char.creator}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>

        {/* 하단 메뉴 */}
        <BottomTab
          activeTab="Home"
          onTabPress={(tabName) => navigation.navigate(tabName)}
        />
      </View>
    </SafeAreaView>
  );
}

export default Recommend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1a1b1b",
  },
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#ffffff20",
    borderBottomWidth: 0.3,
  },
  navLeft: {
    flexDirection: "row",
    gap: 10,
    padding: 16,
    alignItems: "center",
  },
  navRight: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    gap: 24,
  },
  navActive: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  navInactive: {
    color: "#ffffff80",
    fontWeight: "bold",
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: "#5220cc",
    borderRadius: 6,
    padding: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
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
  card: {
    marginHorizontal: 10,
    gap: 4,
    width: imageWidth,
  },
  image: {
    width: "100%",
    height: imageWidth,
    borderRadius: 12,
    marginHorizontal: 10,
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
});
