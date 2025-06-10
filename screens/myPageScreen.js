import { StyleSheet, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTab from "../components/bottomTab";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

function MyPageScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 10,
          paddingVertical: 12,
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 24, fontWeight: "600" }}>
          마이페이지
        </Text>
        <Ionicons name="menu" size={24} color="white" />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          gap: 5,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text style={{ color: "white", fontSize: 60, fontWeight: "bold" }}>
            beta
          </Text>
          <Text style={{ color: "rgb(209, 213, 219)" }}>
            다양한 AI 캐릭터와 나만의 스토리를 만들어보세요
          </Text>
        </View>
        <View style={{ gap: 10, width: "90%" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              backgroundColor: "rgb(38, 39, 39)",
              borderColor: "rgb(62, 62, 65)",
              borderWidth: 0.5,
              paddingVertical: 7,
              borderRadius: 8,
            }}
          >
            <Image
              source={require("../assets/kakao-symbol.png")}
              style={{ width: 24, height: 24 }}
            />
            <Text style={{ color: "white", fontSize: 18 }}>
              카카오 계정으로 계속하기
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              backgroundColor: "rgb(38, 39, 39)",
              borderColor: "rgb(62, 62, 65)",
              borderWidth: 0.5,
              paddingVertical: 7,
              borderRadius: 8,
            }}
          >
            <Image
              source={require("../assets/google-symbol.png")}
              style={{
                width: 24,
                height: 24,
                backgroundColor: "white",
                borderRadius: "100%",
              }}
            />
            <Text style={{ color: "white", fontSize: 18 }}>
              Google 계정으로 계속하기
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              backgroundColor: "white",
              borderColor: "rgb(62, 62, 65)",
              borderWidth: 0.5,
              paddingVertical: 7,
              borderRadius: 8,
            }}
          >
            <Image
              source={require("../assets/apple-symbol.png")}
              style={{ width: 24, height: 24 }}
              resizeMode="contain" // 이미지 비율 유지하면서 긴쪽을 기준으로 맞춰서 보여줌
            />
            <Text style={{ color: "black", fontSize: 18 }}>
              Apple로 계속하기
            </Text>
          </View>
        </View>
      </View>
      <BottomTab
        activeTab="Mypage"
        onTabPress={(tabName) => navigation.navigate(tabName)}
      />
    </SafeAreaView>
  );
}

export default MyPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1a1b1b",
  },
});
