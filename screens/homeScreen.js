import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

const data = Array(20).fill(null);
const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.45;

function HomeScreen() {
  const renderItem = ({ index }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <Image
          source={{
            uri: "https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800",
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.name}>캐릭터 이름 {index + 1}</Text>
          <Text style={styles.intro}>캐릭터 인트로 소개글</Text>
          <Text style={styles.tag}>#해시태그</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Home</Text> */}
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          //   backgroundColor: "tomato",
          borderBottomColor: "#ffffff20",
          borderBottomWidth: 0.3,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            padding: 16,
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              홈
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{ color: "#ffffff80", fontWeight: "bold", fontSize: 20 }}
            >
              추천
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{ color: "#ffffff80", fontWeight: "bold", fontSize: 20 }}
            >
              랭킹
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            padding: 16,
            alignItems: "center",
            gap: 24,
          }}
        >
          <TouchableOpacity>
            <Feather name="search" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "#5220cc", borderRadius: 6, padding: 10 }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.columnWrapper}
      />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 7,
        }}
      >
        <TouchableOpacity style={{ alignItems: "center", gap: 5 }}>
          <Feather name="home" size={24} color="white" />
          <Text style={{ color: "white" }}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center", gap: 5 }}>
          <Feather name="message-circle" size={24} color="#ffffff80" />
          <Text style={{ color: "#ffffff80" }}>대화</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center", gap: 5 }}>
          <Feather name="plus" size={24} color="#ffffff80" />
          <Text style={{ color: "#ffffff80" }}>제작</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center", gap: 5 }}>
          <Feather name="user" size={24} color="#ffffff80" />
          <Text style={{ color: "#ffffff80" }}>마이페이지</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1a1b1b",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
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
});
