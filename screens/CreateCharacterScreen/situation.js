import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import useCharacterStore from "../../stores/useCharacterStore";
import { useNavigation } from "@react-navigation/native";
import SituationCard from "../../components/situationCard";
import { useEffect } from "react";

function Situation() {
  const navigation = useNavigation();
  const { name, example_situation } = useCharacterStore();

  useEffect(() => {}, [example_situation]);

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

        {/* 상황 예시 리스트 */}
        {example_situation.map((situation, index) => (
          <SituationCard key={index} situation={situation} index={index} />
        ))}

        {/* 상황예시 입력 버튼 */}
        <TouchableOpacity
          disabled={!name}
          style={{
            backgroundColor: "rgb(62, 62, 65)",
            borderRadius: 6,
            margin: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("AddSituation")}
        >
          {!name ? (
            <Text
              style={{
                color: "rgb(115 120 131)",
                fontWeight: "500",
                fontSize: 16,
                padding: 12,
              }}
            >
              캐릭터 이름을 먼저 입력해주세요
            </Text>
          ) : (
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
          )}
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

export default Situation;
