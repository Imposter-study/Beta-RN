import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import useCharacterStore from "../../stores/useCharacterStore";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

function Intro() {
  const { name, intro, setIntro, character_image } = useCharacterStore();

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
        <ScrollView style={{ marginTop: 10 }}>
          {intro.length !== 0 ? (
            <Text style={{ color: "#ffffff80" }}>
              캐릭터의 첫 메세지를 입력해주세요
            </Text>
          ) : (
            <View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                {character_image ? (
                  <Image
                    source={{ uri: character_image }}
                    style={{ width: 36, height: 36, borderRadius: 100 }}
                  />
                ) : (
                  <Feather
                    name="zap"
                    size={18}
                    color="#fff3"
                    style={{
                      borderRadius: 100,
                      padding: 10,
                      backgroundColor: "rgb(51 51 51)",
                    }}
                  />
                )}
                {/* 캐릭터(AI) 메세지 */}
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    padding: 10,
                    backgroundColor: "rgb(38 39 39)",
                    borderRadius: 16,
                    borderTopLeftRadius: 0,
                    alignSelf: "flex-start",
                  }}
                >
                  test
                </Text>
                <TouchableOpacity>
                  <FontAwesome6
                    name="pen"
                    size={14}
                    color="#ffffff80"
                    style={{
                      padding: 10,
                      backgroundColor: "rgb(38 39 39)",
                      borderRadius: 100,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather
                    name="trash-2"
                    size={14}
                    color="#ffffff80"
                    style={{
                      padding: 10,
                      backgroundColor: "rgb(38 39 39)",
                      borderRadius: 100,
                    }}
                  />
                </TouchableOpacity>
              </View>
              {/* 유저 메세지 */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 5,
                }}
              >
                <TouchableOpacity>
                  <FontAwesome6
                    name="pen"
                    size={14}
                    color="#ffffff80"
                    style={{
                      padding: 10,
                      backgroundColor: "rgb(38 39 39)",
                      borderRadius: 100,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather
                    name="trash-2"
                    size={14}
                    color="#ffffff80"
                    style={{
                      padding: 10,
                      backgroundColor: "rgb(38 39 39)",
                      borderRadius: 100,
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    padding: 10,
                    backgroundColor: "rgb(124 103 255)",
                    borderRadius: 16,
                    borderTopRightRadius: 0,
                    alignSelf: "flex-start",
                  }}
                >
                  test
                </Text>
              </View>
            </View>
          )}
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
                  {character_image ? (
                    <Image
                      source={{ uri: character_image }}
                      style={{ width: 24, height: 24, borderRadius: 100 }}
                    />
                  ) : (
                    <Feather
                      name="zap"
                      size={14}
                      color="#fff3"
                      style={{
                        borderRadius: 100,
                        padding: 5,
                        backgroundColor: "rgb(51 51 51)",
                      }}
                    />
                  )}
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
                  <Feather
                    name="eye"
                    size={14}
                    color="#fff3"
                    style={{
                      borderRadius: 100,
                      padding: 5,
                      backgroundColor: "rgb(51 51 51)",
                    }}
                  />
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
