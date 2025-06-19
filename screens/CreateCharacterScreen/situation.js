import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

function Situation() {
  return (
    <>
      {/* 글자수 */}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderBottomColor: "#ffffff14",
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ color: "#ffffff80", padding: 10 }}>0/2,000자</Text>
      </View>

      {/* 인트로 내용 */}
      <ScrollView>
        <View style={{ marginHorizontal: 15 }}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              marginVertical: 10,
            }}
          >
            상황 예시로 캐릭터의 성격과 말투를 표현해 주세요
          </Text>
        </View>

        {/* 상황예시 입력 */}
        <TouchableOpacity
          style={{
            backgroundColor: "rgb(62, 62, 65)",
            borderRadius: 6,
            margin: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "500",
              fontSize: 16,
              padding: 12,
            }}
          >
            + 상황 예시 추가
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

export default Situation;
