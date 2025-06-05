import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

const data = Array(20).fill(null);

function HomeScreen() {
  const renderItem = ({ index }) => {
    return (
      <TouchableOpacity style={{ marginBottom: 6, gap: 4 }}>
        <Image
          source={{
            uri: "https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800",
          }}
          style={{ width: 100, height: 100, borderRadius: 12 }}
        />
        <View>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            캐릭터 이름 {index + 1}
          </Text>
          <Text style={{ color: "#ffffff80" }}>캐릭터 인트로 소개글</Text>
          <Text style={{ color: "#ffffffb3" }}>#해시태그</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "#1a1b1b",
        alignItems: "center",
      }}
    >
      <Text>Home</Text>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
});
