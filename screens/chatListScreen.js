import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTab from "../components/bottomTab";

function ChatListScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.container}>
        {/* 상단메뉴 */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>대화</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <MaterialIcons name="manage-search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="settings" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 스크랩한 캐릭터 */}
        <View style={styles.scrapSection}>
          <Text style={styles.scrapTitle}>스크랩한 캐릭터</Text>
          <View style={styles.scrapBox}>
            <Text style={styles.scrapText}>아직 스크랩한 캐릭터가 없어요</Text>
          </View>
        </View>

        {/* 대화 목록 */}
        <View style={styles.chatSection}>
          <Text style={styles.chatSort}>최신순/오래된순</Text>
          <View style={styles.emptyChatBox}>
            <Text style={styles.emptyChatText}>
              아직 대화한 캐릭터가 없어요
            </Text>
          </View>
        </View>

        {/* 하단메뉴 */}
        <BottomTab
          activeTab="ChatList"
          onTabPress={(tabName) => navigation.navigate(tabName)}
        />
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
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#ffffff20",
    borderBottomWidth: 0.3,
    padding: 16,
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 10,
  },
  scrapSection: {
    paddingVertical: 20,
    marginBottom: 10,
  },
  scrapTitle: {
    color: "white",
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  scrapBox: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderBottomColor: "#ffffff20",
    borderBottomWidth: 0.3,
  },
  scrapText: {
    color: "#ffffff80",
    fontSize: 16,
  },
  chatSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chatSort: {
    color: "#ffffffb3",
    fontSize: 16,
  },
  emptyChatBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyChatText: {
    color: "#ffffffb3",
  },
});
