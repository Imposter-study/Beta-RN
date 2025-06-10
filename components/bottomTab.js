import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";

function BottomTab({ activeTab = "home", onTabPress }) {
  const tabs = [
    { name: "Home", icon: "home", label: "홈" },
    { name: "ChatList", icon: "message-circle", label: "대화" },
    { name: "create", icon: "plus", label: "제작" },
    { name: "Mypage", icon: "user", label: "마이페이지" },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tabItem}
          onPress={() => onTabPress(tab.name)}
        >
          <Feather
            name={tab.icon}
            size={24}
            color={activeTab === tab.name ? "white" : "#ffffff80"}
          />
          <Text
            style={
              activeTab === tab.name
                ? styles.tabTextActive
                : styles.tabTextInactive
            }
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 7,
  },
  tabItem: {
    alignItems: "center",
    gap: 5,
  },
  tabTextActive: {
    color: "white",
  },
  tabTextInactive: {
    color: "#ffffff80",
  },
});
