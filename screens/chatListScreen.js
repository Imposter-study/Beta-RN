import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

function ChatListScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.container}>
        {/* 상단메뉴 */}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomColor: "#ffffff20",
            borderBottomWidth: 0.3,
            padding: 16,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>
            대화
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity>
              <MaterialIcons name="manage-search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="settings" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 스크랩한 캐릭터 */}
        <View style={{ paddingVertical: 20, marginBottom: 10 }}>
          <Text
            style={{
              color: "white",
              marginBottom: 20,
              paddingHorizontal: 20,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            스크랩한 캐릭터
          </Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              borderBottomColor: "#ffffff20",
              borderBottomWidth: 0.3,
            }}
          >
            <Text style={{ color: "#ffffff80", fontSize: 16 }}>
              아직 스크랩한 캐릭터가 없어요
            </Text>
          </View>
        </View>

        {/* 대화 목록 */}
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <Text style={{ color: "#ffffffb3", fontSize: 16 }}>
            최신순/오래된순
          </Text>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                color: "#ffffffb3",
              }}
            >
              아직 대화한 캐릭터가 없어요
            </Text>
          </View>
        </View>

        {/* 하단메뉴 */}
        <View style={styles.bottomTab}>
          <TouchableOpacity
            style={styles.bottomTabItem}
            onPress={() => navigation.navigate("Home")}
          >
            <Feather name="home" size={24} color="#ffffff80" />
            <Text style={styles.bottomTabText}>홈</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomTabItem}>
            <Feather name="message-circle" size={24} color="white" />
            <Text style={styles.bottomTabTextActive}>대화</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomTabItem}>
            <Feather name="plus" size={24} color="#ffffff80" />
            <Text style={styles.bottomTabText}>제작</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomTabItem}>
            <Feather name="user" size={24} color="#ffffff80" />
            <Text style={styles.bottomTabText}>마이페이지</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1a1b1b",
  },
  bottomTab: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 7,
  },
  bottomTabItem: {
    alignItems: "center",
    gap: 5,
  },
  bottomTabTextActive: {
    color: "white",
  },
  bottomTabText: {
    color: "#ffffff80",
  },
});
