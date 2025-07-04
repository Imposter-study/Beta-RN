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
import characterAPI from "../../apis/characterAPI";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.45;

function Home() {
  const navigation = useNavigation();
  const [characters, setCharacters] = useState();

  const getCharacters = () => {
    characterAPI
      .get("")
      .then((response) => {
        // console.log(response.data);
        setCharacters(response.data);
      })
      .catch((error) => {
        console.log("캐릭터 조회 실패", error?.response);
      });
  };

  useEffect(() => {
    getCharacters();
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
            uri: characters[index].character_image,
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
