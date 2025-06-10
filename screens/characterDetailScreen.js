import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.9;

function CharacterDetailScreen({ route }) {
  const { character } = route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-sharp" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: character.imageUri }}
            style={styles.characterImage}
          />
        </View>
        <View style={styles.characterInfo}>
          <Text style={styles.characterName}>{character.name}</Text>
          <Text style={styles.characterIntro}>{character.intro}</Text>
          <Text style={styles.characterTag}>{character.tag}</Text>
        </View>
        <View style={styles.messageContainer}>
          <Image
            source={{ uri: character.imageUri }}
            style={styles.messageImage}
          />
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>캐릭터 첫 메세지</Text>
          </View>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.sectionTitle}>상세설명</Text>
          <Text style={styles.sectionContent}>상세설명 내용</Text>
        </View>
        <View style={styles.creatorBox}>
          <Text style={styles.sectionTitle}>크리에이터</Text>
          <View style={styles.creatorInfo}>
            <FontAwesome name="user-circle-o" size={24} color="gray" />
            <View>
              <Text style={styles.creatorName}>닉네임</Text>
              <Text style={styles.creatorId}>{character.creator}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.chatButton}>
          <Text style={styles.chatButtonText}>대화 시작하기</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default CharacterDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1a1b1b",
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomColor: "#ffffff0d",
    borderBottomWidth: 0.3,
  },
  scrollContainer: {
    padding: 10,
  },
  imageContainer: {
    alignItems: "center",
  },
  characterImage: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: 12,
  },
  characterInfo: {
    padding: 10,
    gap: 3,
  },
  characterName: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  characterIntro: {
    color: "#ffffffb3",
  },
  characterTag: {
    color: "rgb(167,153,255)",
    fontSize: 16,
  },
  messageContainer: {
    flexDirection: "row",
    padding: 10,
    gap: 3,
  },
  messageImage: {
    borderRadius: 100,
    width: 50,
    height: 50,
  },
  messageBubble: {
    maxWidth: "60%",
    padding: 10,
    borderRadius: 12,
    marginVertical: 4,
    backgroundColor: "rgb(38,39,39)",
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: "white",
  },
  detailBox: {
    backgroundColor: "rgb(38,39,39)",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  creatorBox: {
    backgroundColor: "rgb(38,39,39)",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 7,
  },
  sectionContent: {
    color: "#ffffffb3",
  },
  creatorInfo: {
    flexDirection: "row",
    gap: 3,
  },
  creatorName: {
    color: "white",
  },
  creatorId: {
    color: "#ffffff80",
    fontSize: 12,
  },
  bottomContainer: {
    backgroundColor: "rgb(26, 27, 27)",
    borderTopColor: "#ffffff14",
    borderTopWidth: 0.3,
  },
  chatButton: {
    backgroundColor: "rgb(82, 32, 204)",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  chatButtonText: {
    color: "white",
    fontSize: 16,
  },
});
