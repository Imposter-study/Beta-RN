import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { DOMAIN } from "../config";
import { useEffect, useState } from "react";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.45;

export const CharacterCard = ({ item }) => {
  const navigation = useNavigation();
  const [characterImage, setCharacterImage] = useState(item.character_image);

  useEffect(() => {
    if (item.character_image.startsWith("http")) {
    } else {
      setCharacterImage(`http://${DOMAIN}${item.character_image}`);
    }
  }, []);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("CharacterDetail", {
          character_id: item.character_id,
        })
      }
    >
      <Image
        source={{
          uri: characterImage,
        }}
        style={styles.image}
      />
      <View>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.intro}>{item.presentation}</Text>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            maxWidth: imageWidth,
            overflow: "hidden",
          }}
        >
          {item.hashtags.map((hashtag, index) => (
            <Text key={index} style={styles.tag} ellipsizeMode="tail">
              #{hashtag.tag_name}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
