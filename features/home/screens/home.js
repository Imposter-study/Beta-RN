import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import characterAPI from "../../../apis/characterAPI";
import { CharacterCard } from "../../../components/CharacterCard";

function Home() {
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

  return (
    <View style={styles.container}>
      {/* 캐릭터 리스트 */}
      <FlatList
        data={characters}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <CharacterCard item={item} />}
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
});
