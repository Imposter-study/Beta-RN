import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

function SignUpStep1() {

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-sharp" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
          회원가입
        </Text>
        <View>
          <Ionicons name="chevron-back-sharp" size={24} color="#1a1b1b" />
        </View>
      </View>

      {/* 입력 내용 */}
      <View style={{ flex: 1, marginHorizontal: 15, marginTop: 20 }}>
        <View style={{ marginTop: 30 }}>
          {/* 아이디 입력 */}
          <View style={{ marginBottom: 15 }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
              아이디
            </Text>
            <TextInput
              placeholder="아이디"
              placeholderTextColor="rgba(225, 225,225, 0.5)"
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
          </View>

          {/* 패스워드 입력 */}
          <View style={{ marginBottom: 15 }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
              패스워드
            </Text>
            <TextInput
              placeholder="패스워드"
              placeholderTextColor="rgba(225, 225,225, 0.5)"
              secureTextEntry={true} // 패스워드 입력 모드
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
          </View>

          {/* 패스워드 확인 입력 */}
          <View style={{ marginBottom: 15 }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
              패스워드 확인
            </Text>
            <TextInput
              placeholder="패스워드 확인"
              placeholderTextColor="rgba(225, 225,225, 0.5)"
              secureTextEntry={true} // 패스워드 입력 모드
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
          </View>
        </View>
      </View>

      {/*  다음 버튼 */}
      <View style={{ marginHorizontal: 20 }}>
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Text
            style={{
              backgroundColor: "rgb(45, 45, 45)",
              color: "rgb(115, 120, 131)",
              paddingVertical: 15,
              borderRadius: 6,
              fontSize: 16,
              width: "100%",
              textAlign: "center",
            }}
          >
            다음
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default SignUpStep1;

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
});
