import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
  ScrollView,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.3;

function Recommend() {
  const navigation = useNavigation();

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
    <View style={styles.container}>
      <ScrollView>
        {/* 실시간 TOP 10 캐릭터 */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>실시간 TOP 10 캐릭터</Text>
            <Button title="더보기" color={"#7C67FF"} />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {topCharacters.map((char, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() =>
                  navigation.navigate("CharacterDetail", { character: char })
                }
              >
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: char.imageUri }} style={styles.image} />
                  <View style={styles.rankOverlay}>
                    <Text style={styles.rankText}>{index + 1}</Text>
                  </View>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{char.name}</Text>
                  <Text style={styles.intro}>{char.intro}</Text>
                  <Text style={styles.tag}>{char.tag}</Text>
                  <Text style={styles.creator}>{char.creator}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 유죄남 모음 */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              내 맘을 훔쳐간 유죄남 모음.zip
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {topCharacters.map((char, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() =>
                  navigation.navigate("CharacterDetail", { character: char })
                }
              >
                <Image source={{ uri: char.imageUri }} style={styles.image} />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{char.name}</Text>
                  <Text style={styles.intro}>{char.intro}</Text>
                  <Text style={styles.tag}>{char.tag}</Text>
                  <Text style={styles.creator}>{char.creator}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 주목받기 시작한 캐릭터들 */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              이제 막 주목받기 시작한 캐릭터들
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {topCharacters.map((char, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() =>
                  navigation.navigate("CharacterDetail", { character: char })
                }
              >
                <Image source={{ uri: char.imageUri }} style={styles.image} />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{char.name}</Text>
                  <Text style={styles.intro}>{char.intro}</Text>
                  <Text style={styles.tag}>{char.tag}</Text>
                  <Text style={styles.creator}>{char.creator}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

export default Recommend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1a1b1b",
  },
  sectionContainer: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollContent: {
    paddingVertical: 10,
  },
  card: {
    marginHorizontal: 10,
    gap: 4,
    width: imageWidth,
  },
  imageWrapper: {
    position: "relative",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: imageWidth,
    borderRadius: 12,
    marginHorizontal: 10,
  },
  rankOverlay: {
    position: "absolute",
    bottom: 0,
    left: -16,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  rankText: {
    color: "#00000080",
    fontWeight: "bold",
    fontSize: imageWidth * 0.6,
  },
  textContainer: {
    width: "100%",
    padding: 5,
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
  creator: {
    color: "#ffffff80",
    borderRadius: 6,
    backgroundColor: "black",
    alignSelf: "flex-start",
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginTop: 4,
  },
});
