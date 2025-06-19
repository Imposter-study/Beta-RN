import { StyleSheet, View, Text, ScrollView } from "react-native";

function Intro() {
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
        <Text style={{ color: "#ffffff80", padding: 10 }}>0/1,500자</Text>
      </View>

      {/* 인트로 내용 */}
      <View style={{ flex: 1, marginHorizontal: 15 }}>
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: "bold",
            marginVertical: 10,
          }}
        >
          첫 상황을 만들어주세요
        </Text>
        <ScrollView>
          <Text style={{ color: "#ffffff80" }}>
            캐릭터의 첫 메세지를 입력해주세요
          </Text>
        </ScrollView>
      </View>

      {/* 인트로 입력 */}
      <View
        style={{
          backgroundColor: "rgb(38, 39, 39)",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      >
        <Text
          style={{
            color: "#ffffff80",
            fontSize: 16,
            padding: 12,
          }}
        >
          캐릭터의 이름을 먼저 입력해주세요
        </Text>
      </View>
    </>
  );
}

export default Intro;
