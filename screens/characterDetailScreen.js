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
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 12,
          borderBottomColor: "#ffffff0d",
          borderBottomWidth: 0.3,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-sharp" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ padding: 10 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: character.imageUri }}
            style={{ width: imageWidth, height: imageWidth, borderRadius: 12 }}
          />
        </View>
        <View style={{ padding: 10, gap: 3 }}>
          <Text style={{ color: "white", fontSize: 32, fontWeight: "bold" }}>
            {character.name}
          </Text>
          <Text style={{ color: "#ffffffb3" }}>{character.intro}</Text>
          <Text style={{ color: "rgb(167,153,255)", fontSize: 16 }}>
            {character.tag}
          </Text>
        </View>
        <View style={{ flexDirection: "row", padding: 10, gap: 3 }}>
          <Image
            source={{ uri: character.imageUri }}
            style={{
              borderRadius: 100,
              width: 50,
              height: 50,
            }}
          />
          <View
            style={{
              maxWidth: "60%",
              padding: 10,
              borderRadius: 12,
              marginVertical: 4,
              backgroundColor: "rgb(38,39,39)",
              borderTopLeftRadius: 0,
            }}
          >
            <Text style={{ color: "white" }}>캐릭터 첫 메세지</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "rgb(38,39,39)",
            margin: 10,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 7,
            }}
          >
            상세설명
          </Text>
          <Text style={{ color: "#ffffffb3" }}>상세설명 내용</Text>
        </View>
        <View
          style={{
            backgroundColor: "rgb(38,39,39)",
            marginHorizontal: 10,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 7,
            }}
          >
            크리에이터
          </Text>
          <View style={{ flexDirection: "row", gap: 3 }}>
            {/* <Image source={{uri:}}/> */}
            <FontAwesome name="user-circle-o" size={24} color="gray" />
            <View>
              <Text style={{ color: "white" }}>닉네임</Text>
              <Text style={{ color: "#ffffff80", fontSize: 12 }}>
                {character.creator}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: "rgb(26, 27, 27)",
          borderTopColor: "#ffffff14",
          borderTopWidth: 0.3,
        }}
      >
        <View
          style={{
            backgroundColor: "rgb(82, 32, 204)",
            marginHorizontal: 20,
            marginVertical: 10,
            padding: 10,
            alignItems: "center",
            borderRadius: 6,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>대화 시작하기</Text>
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
    // alignItems: "center",
  },
});
