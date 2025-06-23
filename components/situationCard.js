import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import useCharacterStore from "../stores/useCharacterStore";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import Markdown from "react-native-markdown-display";

function SituationCard({ situation, index }) {
  const { character_image } = useCharacterStore();
  const [isOpen, setIsOpen] = useState(false);

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
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setIsOpen((prev) => !prev)}
        >
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
                  <Markdown rules={markdownRules}>{item.message}</Markdown>
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
                  <Markdown rules={markdownRules}>{item.message}</Markdown>
                </View>
              </View>
            )
          )
        : null}
    </View>
  );
}

export default SituationCard;
