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

function Situation() {
  const navigation = useNavigation();
  const { name, example_situation } = useCharacterStore();

  return (
    <>
      {/* 글자수 */}
      <View style={styles.charCountContainer}>
        <Text style={styles.charCountText}>0/2,000자</Text>
      </View>

      {/* 인트로 내용 */}
      <ScrollView>
        <View style={styles.introContentContainer}>
          <Text style={styles.introTitle}>
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
          style={styles.addSituationButton}
          onPress={() => navigation.navigate("AddSituation")}
        >
          {!name ? (
            <Text style={styles.addSituationButtonTextDisabled}>
              캐릭터 이름을 먼저 입력해주세요
            </Text>
          ) : (
            <Text style={styles.addSituationButtonText}>+ 상황 예시 추가</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

export default Situation;

const styles = StyleSheet.create({
  charCountContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#ffffff14",
    borderBottomWidth: 1,
  },
  charCountText: {
    color: "#ffffff80",
    padding: 10,
  },
  introContentContainer: {
    marginHorizontal: 15,
  },
  introTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  addSituationButton: {
    backgroundColor: "rgb(62, 62, 65)",
    borderRadius: 6,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addSituationButtonTextDisabled: {
    color: "rgb(115 120 131)",
    fontWeight: "500",
    fontSize: 16,
    padding: 12,
  },
  addSituationButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    padding: 12,
  },
});
