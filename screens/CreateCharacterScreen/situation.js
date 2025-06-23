import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import useCharacterStore from "../../stores/useCharacterStore";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import Markdown from "react-native-markdown-display";

function Situation() {
  const navigation = useNavigation();
  const { name, example_situation, character_image } = useCharacterStore();
  const [isOpen, setIsOpen] = useState(true);

  const markdownRules = {
    paragraph: (node, children, parent, styles) => {
      const siblings = parent[0].children;
      const isLast = node.index === siblings[siblings.length - 1].index;

      return (
        <Text
          key={node.key}
          style={{ color: "white", marginBottom: isLast ? 0 : 16 }}
        >
          {children}
        </Text>
      );
    },

    em: (node, children, parent, styles) => (
      <Text key={node.key} style={{ fontStyle: "italic", color: "#ffffff80" }}>
        {children}
      </Text>
    ),

    bold: (node, children, parent, styles) => (
      <Text key={node.key} style={{ fontWeight: "bold", color: "white" }}>
        {children}
      </Text>
    ),
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
          <View
            style={{
              borderColor: "#ffffff14",
              borderWidth: 1,
              borderRadius: 16,
              margin: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 20,
                paddingHorizontal: 15,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity style={{ flex: 1 }}>
                <Text style={{ color: "white", fontSize: 18 }}>
                  상황 예시 {index + 1}
                </Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity>
                  <Text style={{ color: "white" }}>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ color: "white" }}>삭제</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 상황예시 내용 */}
            {isOpen
              ? situation.map((item) =>
                  item.role === "user" ? (
                    <View style={{ alignItems: "flex-end", marginBottom: 10 }}>
                      <View
                        key={item.id}
                        style={{
                          backgroundColor: "rgb(124, 103, 255)",
                          borderRadius: 16,
                          borderTopRightRadius: 0,
                          padding: 10,
                          maxWidth: "70%",
                          marginHorizontal: 20,
                        }}
                      >
                        <Markdown rules={markdownRules}>
                          {item.message}
                        </Markdown>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: "row",
                        marginHorizontal: 20,
                        gap: 5,
                        marginBottom: 10,
                      }}
                    >
                      <View>
                        {character_image ? (
                          <Image
                            source={{ uri: character_image }}
                            style={{ width: 36, height: 36, borderRadius: 100 }}
                          />
                        ) : (
                          <Feather
                            name="zap"
                            size={24}
                            color="#fff3"
                            style={{
                              borderRadius: 100,
                              padding: 5,
                              backgroundColor: "rgb(51 51 51)",
                            }}
                          />
                        )}
                      </View>
                      <View
                        key={item.id}
                        style={{
                          backgroundColor: "rgb(38, 39, 39)",
                          borderRadius: 16,
                          borderTopLeftRadius: 0,
                          padding: 10,
                          maxWidth: "70%",
                        }}
                      >
                        <Markdown rules={markdownRules}>
                          {item.message}
                        </Markdown>
                      </View>
                    </View>
                  )
                )
              : null}
          </View>
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
