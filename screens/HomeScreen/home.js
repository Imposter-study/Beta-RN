import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { API_URL } from "../../config";
import axios from "axios";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.45;

function Home() {
  const navigation = useNavigation();
  const [characters, setCharacters] = useState([]);

  const getCharacters = () => {
    axios
      .get(API_URL + `characters/`)
      .then((response) => {
        console.log(response.data);
        setCharacters(response.data);
      })
      .catch((error) => {
        console.log("캐릭터 조회 실패", error?.response);
      });
  };

  const renderItem = ({ index }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("CharacterDetail", {
            character: characters[index],
          })
        }
      >
        <Image
          source={{
            uri:
              characters[index].character_image ||
              "https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800",
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.name}>{characters[index].name}</Text>
          <Text style={styles.intro}>{characters[index].presentation}</Text>
          <Text style={styles.tag}>#해시태그</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <View style={styles.container}>
      {/* 캐릭터 리스트 */}
      <FlatList
        data={characters}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1a1b1b",
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
