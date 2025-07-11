import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import characterAPI from "../../../apis/characterAPI";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.43;

function CharacterSearch() {
  const navigation = useNavigation();

  const [focused, setFocused] = useState(false);
  const [word, setWord] = useState("");
  const [characters, setCharacters] = useState([]);

  const getSearchedCharacter = () => {
    characterAPI
      .get(`search/?name=${word}`)
      .then((response) => {
        console.log("캐릭터 검색 성공");
        console.log(response.data);
        setCharacters(response.data);
      })
      .catch((error) => {
        console.log("캐릭터 검색 실패", error?.response);
        setCharacters([]);
      });
  };

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
          <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap" }}>
            {characters[index].hashtags.map((item, index) => (
              <Text key={index} style={styles.tag}>
                #{item.tag_name}
              </Text>
            ))}
          </View>
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
            @{characters[index].user.username}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-sharp" size={24} color="white" />
            </TouchableOpacity>
            <TextInput
              value={word}
              onChangeText={setWord}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onSubmitEditing={getSearchedCharacter}
              returnKeyType="search"
              style={[styles.textInput, focused && styles.textInputFocused]}
            />
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              검색 결과
            </Text>
            <Text
              style={{
                color: "rgba(255, 255, 255/.5)",
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              {characters.length || 0}개의 캐릭터
            </Text>
          </View>
          <FlatList
            data={characters}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            numColumns={2}
            contentContainerStyle={styles.flatListContent}
            columnWrapperStyle={styles.columnWrapper}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default CharacterSearch;

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
    marginHorizontal: 10,
    gap: 5,
  },
  textInput: {
    flex: 1,
    backgroundColor: "rgb(45,45,45)",
    padding: 10,
    marginVertical: 10,
    borderRadius: 6,
    borderWidth: 0.3,
    borderColor: "rgba(225, 225,225, 0.3)",
    fontSize: 16,
    color: "white",
  },
  textInputFocused: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "rgb(103, 40, 225)",
  },
  flatListContent: {
    paddingHorizontal: 20,
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
