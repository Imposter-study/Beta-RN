import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import roomAPI from "../apis/roomAPI";
import Modal from "react-native-modal";

function ChatHistoryList({ route }) {
  const { room_id } = route.params;
  const [histories, setHistories] = useState([]);
  const [historyOption, setHistoryOption] = useState(null);
  const [historyOptionId, setHistoryOptionId] = useState(null);
  const [historyTitle, setHistorytitle] = useState("");
  const [historyTitleModalVisible, setHistorytitleModalVisible] =
    useState(false);

  const getChatHistories = () => {
    roomAPI
      .get(`${room_id}/histories/`)
      .then((response) => {
        console.log("대화 내역 조회 성공\n", response.data);
        setHistories(response.data);
      })
      .catch((error) => {
        console.log("대화 내역 조회 실패", error?.response);
      });
  };

  const editChatHistoryTitle = () => {
    roomAPI
      .put(`${room_id}/histories/${historyOptionId}/`, { title: historyTitle })
      .then((response) => {
        console.log("대화 내역 제목 수정 성공\n", response.data.title);
        setHistories((prev) =>
          prev.map((item) =>
            item.history_id !== historyOptionId
              ? item
              : { ...item, title: response.data.title }
          )
        );
        setHistorytitleModalVisible(false);
      })
      .catch((error) => {
        console.log("대화내역 재목 수정 실패", error?.response);
      });
  };

  useEffect(() => {
    getChatHistories();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back-sharp" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>저장된 대화</Text>
        </View>
        <View />
      </View>

      {/* 스크롤 영역 */}
      <ScrollView
        onTouchEnd={() => {
          if (historyOption !== null) {
            setHistoryOption(null); // 옵션 메뉴 닫기
          }
        }}
      >
        <Text style={styles.infoText}>
          대화는 최대 100개까지만 저장할 수 있어요
        </Text>

        {histories.map((history) => (
          <View key={history.history_id} style={styles.historyItem}>
            <TouchableOpacity>
              <Text style={{ color: "white" }}>{history.title}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#ffffff80" }}>
                  {history.saved_date} |{" "}
                </Text>
                <Text style={{ color: "#ffffff80" }}>
                  {history.last_message.substr(0, 30)}...
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setHistoryOption(history.history_id);
                setHistoryOptionId(history.history_id);
              }}
            >
              <Ionicons
                name="ellipsis-vertical-sharp"
                size={16}
                color="white"
              />
            </TouchableOpacity>

            {/* 옵션 메뉴 */}
            {historyOption === history.history_id && (
              <View style={styles.optionMenu}>
                <TouchableOpacity
                  onPress={() => {
                    console.log("제목 수정");
                    setHistorytitle(history.title);
                    setHistorytitleModalVisible(true);
                  }}
                  style={{ padding: 15 }}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    제목 수정
                  </Text>
                </TouchableOpacity>
                <View style={{ backgroundColor: "#ffffff14", height: 1 }} />
                <TouchableOpacity
                  onPress={() => {
                    console.log("대화 삭제");
                  }}
                  style={{ padding: 15 }}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    대화 삭제
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* 대화 내역 제목 입력 모달 */}
      <Modal
        isVisible={historyTitleModalVisible}
        avoidKeyboard={true}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <View
          style={{
            width: Dimensions.get("window").width * 0.8,
            backgroundColor: "rgb(38 39 39)",
            padding: 20,
            borderRadius: 16,
            gap: 10,
          }}
        >
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={{ color: "white", fontSize: 18 }}>
              대화 제목을 입력해주세요
            </Text>
          </View>
          <TextInput
            value={historyTitle}
            onChangeText={setHistorytitle}
            style={{
              backgroundColor: "rgb(45,45,45)",
              padding: 10,
              marginVertical: 10,
              borderRadius: 6,
              borderWidth: 0.3,
              borderColor: "rgba(225, 225,225, 0.3)",
              fontSize: 16,
              color: "white",
            }}
          />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity
              onPress={() => setHistorytitleModalVisible(false)}
              style={{
                flex: 1,
                backgroundColor: "rgba(62,62,65,.9)",
                alignItems: "center",
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "white", padding: 10 }}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => editChatHistoryTitle()}
              style={{
                flex: 1,
                backgroundColor: "rgb(124 103 255)",
                alignItems: "center",
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "white", padding: 10 }}>저장</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default ChatHistoryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1b1b",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
  infoText: {
    color: "rgba(255, 255, 255, 0.7)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    marginHorizontal: 20,
    borderBottomColor: "#ffffff50",
    borderBottomWidth: 0.5,
    position: "relative",
  },
  optionMenu: {
    position: "absolute",
    right: 15,
    zIndex: 100,
    borderRadius: 12,
    backgroundColor: "rgb(38 39 39)",
    borderWidth: 1,
    borderColor: "#ffffff14",
  },
});
