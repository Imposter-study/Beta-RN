import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

function CreateCharacter() {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {/* 헤더 */}
          <View style={styles.header}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={28} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>제작</Text>
            </View>
            <View
              style={{ flexDirection: "row", gap: 7, alignItems: "center" }}
            >
              <TouchableOpacity>
                <Ionicons
                  name="ellipsis-horizontal-sharp"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity style={{}}>
                <Text
                  style={{
                    color: "white",
                    backgroundColor: "rgb(62, 62, 65)",
                    padding: 10,
                    borderRadius: 6,
                    fontSize: 16,
                  }}
                >
                  저장
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{}}>
                <Text
                  style={{
                    color: "white",
                    backgroundColor: "rgb(82, 32, 204)",
                    padding: 10,
                    borderRadius: 6,
                    fontSize: 16,
                  }}
                >
                  등록
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 상단 탭 */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.25,
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "white",
                borderBottomWidth: 2,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "500",
                  padding: 10,
                }}
              >
                *내용
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.25,
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#ffffff14",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "500",
                  padding: 10,
                }}
              >
                *인트로
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.25,
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#ffffff14",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "500",
                  padding: 10,
                }}
              >
                상황 예시
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.25,
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#ffffff14",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "500",
                  padding: 10,
                }}
              >
                소개
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            {/* 글자수 */}
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderBottomColor: "#ffffff14",
                borderBottomWidth: 1,
              }}
            >
              <Text style={{ color: "#ffffff80", padding: 10 }}>0/1,200자</Text>
            </View>

            {/* 캐릭터 제작 */}
            <ScrollView style={{ marginHorizontal: 15 }}>
              <View style={{ marginVertical: 20 }}>
                <Text
                  style={{ color: "white", fontSize: 22, fontWeight: "500" }}
                >
                  User님 만의 상상을 현실로 만들어 보세요
                </Text>
              </View>

              {/* 캐릭터 구분 */}
              <View
                style={{
                  backgroundColor: "rgb(38, 39, 39)",
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 20,
                }}
              >
                <View style={{ gap: 7, marginBottom: 20 }}>
                  <Text style={{ color: "rgb(229, 231, 235)", fontSize: 16 }}>
                    제목
                  </Text>
                  <TextInput
                    placeholder="제목을 입력해주세요."
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    style={{
                      paddingHorizontal: 7,
                      paddingVertical: 10,
                      borderWidth: 1,
                      borderColor: "#ffffff0d",
                      borderRadius: 6,
                    }}
                  />
                </View>
                <View style={{ gap: 7 }}>
                  <Text style={{ color: "rgb(229, 231, 235)", fontSize: 16 }}>
                    상세 설명
                  </Text>
                  <TextInput
                    placeholder="상황, 관계, 세계관 등을 설명해주세요."
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    multiline={true}
                    style={{
                      paddingHorizontal: 7,
                      paddingVertical: 10,
                      borderWidth: 1,
                      borderColor: "#ffffff0d",
                      borderRadius: 6,
                      height: 100,
                    }}
                  />
                </View>
              </View>

              {/* 캐릭터 설정 */}
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "500" }}
                >
                  캐릭터를 만들어 주세요
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "rgb(38, 39, 39)",
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 10,
                }}
              >
                <View style={{ gap: 7, marginBottom: 20 }}>
                  <Text style={{ color: "rgb(229, 231, 235)", fontSize: 16 }}>
                    이름
                  </Text>
                  <TextInput
                    placeholder="짧은 이름이 부르기 편해요. ex.수현"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    style={{
                      paddingHorizontal: 7,
                      paddingVertical: 10,
                      borderWidth: 1,
                      borderColor: "#ffffff0d",
                      borderRadius: 6,
                    }}
                  />
                </View>
                <View style={{ gap: 7 }}>
                  <Text style={{ color: "rgb(229, 231, 235)", fontSize: 16 }}>
                    설명
                  </Text>
                  <TextInput
                    placeholder={`캐릭터의 특징, 행동 감정 표현에 대해서 써주시면 개성있는 캐릭터를 만들 수 있어요\nex. 수현은 말이 험하고 온갖 비속어를 휘황찬란하게 사용한다`}
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    multiline={true}
                    style={{
                      paddingHorizontal: 7,
                      paddingVertical: 10,
                      borderWidth: 1,
                      borderColor: "#ffffff0d",
                      borderRadius: 6,
                      height: 100,
                    }}
                  />
                </View>
              </View>
              {/* 경고 */}
              <View>
                <Text style={{ color: "#ffffff80" }}>
                  ※ 저작권 침해 / 선정성 등 비윤리적인 캐릭터는 삭제될 수 있어요
                </Text>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default CreateCharacter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1a1b1b",
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomColor: "#ffffff0d",
    borderBottomWidth: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "500",
  },
});
