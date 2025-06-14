import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function ChatEdit() {
  return (
    <View style={styles.formContainer}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginVertical: 15,
        }}
      >
        <Ionicons
          name="add"
          size={30}
          color="white"
          style={{
            borderWidth: 1,
            borderRadius: "100%",
            padding: 5,
            backgroundColor: "#ffffff0d",
            borderColor: "#ffffff14",
          }}
        />
        <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
          대화 프로필 추가
        </Text>
      </TouchableOpacity>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 15,
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <FontAwesome name="user-circle-o" size={40} color="gray" />
            <View style={{ gap: 5 }}>
              <Text style={{ color: "white", fontSize: 16 }}>채팅 닉네임</Text>
              <Text style={{ color: "#fff3", fontSize: 12 }}>설명없음</Text>
            </View>
          </View>
          <TouchableOpacity>
            <FontAwesome name="pencil" size={18} color="#ffffff80" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default ChatEdit;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
});
