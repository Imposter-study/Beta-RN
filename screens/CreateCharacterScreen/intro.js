import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import useCharacterStore from "../../stores/useCharacterStore";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

function Intro() {
  const { name } = useCharacterStore();

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
        {!name ? (
          <Text
            style={{
              color: "#ffffff80",
              fontSize: 16,
              padding: 12,
            }}
          >
            캐릭터의 이름을 먼저 입력해주세요
          </Text>
        ) : (
          <View style={{ padding: 12 }}>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ffffff0d",
              }}
            >
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    paddingBottom: 12,
                    borderBottomColor: "white",
                    borderBottomWidth: 1.5,
                  }}
                >
                  {/* 이미지 자리 */}
                  <Feather name="zap" size={24} color="black" />
                  <Text style={{ color: "#ffffff80" }}>{name}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    paddingBottom: 12,
                  }}
                >
                  <Feather name="eye" size={24} color="black" />
                  <Text style={{ color: "white" }}>유저</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TextInput
              placeholder={`${name}의 메세지 입력`}
              placeholderTextColor="#9ca3af"
              multiline={true}
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "400",
                marginTop: 10,
                padding: 10,
                minHeight: 70,
                maxHeight: 124,
              }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    color: "white",
                    backgroundColor: "rgb(62 62 65)",
                    borderRadius: 18,
                    paddingVertical: 7,
                    paddingHorizontal: 10,
                    alignSelf: "flex-start",
                  }}
                >
                  {"{{"}user{"}}"}
                </Text>
              </TouchableOpacity>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <TouchableOpacity>
                  <FontAwesome6
                    name="asterisk"
                    size={18}
                    color="#ffffff80"
                    style={{ padding: 10 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather
                    name="arrow-up"
                    size={24}
                    color="rgb(115 120 131)"
                    style={{
                      backgroundColor: "rgb(45 45 45)",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 100,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </>
  );
}

export default Intro;
