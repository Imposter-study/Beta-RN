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
import { useState } from "react";

function Intro() {
  const { name, intro, setIntro, character_image } = useCharacterStore();
  const [sender, setSender] = useState(name);
  const [message, setMessage] = useState("");
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const addIntro = () => {
    const introMessage = { message, role: sender };
    setIntro(introMessage);
    setMessage("");
  };

  const pressAsterisk = () => {
    const before = message.slice(0, selection.start);
    const after = message.slice(selection.end);
    const newMessage = before + "*" + after;

    setMessage(newMessage);

    const newPosition = selection.start + 1;
    setSelection({ start: newPosition, end: newPosition });
  };

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
          {intro.length === 0 ? (
            <Text style={{ color: "#ffffff80" }}>
              캐릭터의 첫 메세지를 입력해주세요
            </Text>
          ) : (
            <View>
              {intro.map((item, idx) =>
                item.role === "user" ? (
                  <View
                    key={idx}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: 5,
                      marginBottom: 20,
                    }}
                  >
                    <TouchableOpacity>
                      {/* 수정 버튼 */}
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
                      {/* 삭제 버튼 */}
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
                        maxWidth: "70%",
                      }}
                    >
                      {item.message}
                    </Text>
                  </View>
                ) : (
                  <View
                    key={idx}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      marginBottom: 20,
                    }}
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
                        maxWidth: "70%",
                      }}
                    >
                      {item.message}
                    </Text>
                    <TouchableOpacity>
                      {/* 수정 버튼 */}
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
                      {/* 삭제 버튼 */}
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
                )
              )}
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
                  onPress={() => setSender(name)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    paddingBottom: 12,
                    borderBottomColor: sender === name && "white",
                    borderBottomWidth: sender === name && 1.5,
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
                  onPress={() => setSender("user")}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    paddingBottom: 12,
                    borderBottomColor: sender === "user" && "white",
                    borderBottomWidth: sender === "user" && 1.5,
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
              value={message}
              onChangeText={(text) => setMessage(text)}
              placeholder={`${sender}의 메세지 입력`}
              placeholderTextColor="#9ca3af"
              multiline={true}
              selection={selection}
              onSelectionChange={({ nativeEvent: { selection } }) =>
                setSelection(selection)
              }
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
                {/* asterisk */}
                <TouchableOpacity onPress={pressAsterisk}>
                  <FontAwesome6
                    name="asterisk"
                    size={18}
                    color="#ffffff80"
                    style={{ padding: 10 }}
                  />
                </TouchableOpacity>
                {/* 전송 버튼 */}
                <TouchableOpacity onPress={() => addIntro()}>
                  <Feather
                    name="arrow-up"
                    size={24}
                    color={message ? "white" : "rgb(115 120 131)"}
                    style={{
                      backgroundColor: message
                        ? "rgb(82 32 204)"
                        : "rgb(45 45 45)",
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
