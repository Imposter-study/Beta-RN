import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import useCharacterStore from "../stores/useCharacterStore";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import Markdown from "react-native-markdown-display";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";

function SituationCard({ situation, index }) {
  const navigation = useNavigation();
  const { character_image, deleteExampleSituation } = useCharacterStore();
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
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <TouchableOpacity
          style={styles.headerTouchable}
          onPress={() => setIsOpen((prev) => !prev)}
        >
          <Text style={styles.headerTitle}>상황 예시 {index + 1}</Text>
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("AddSituation", { index })}
          >
            <FontAwesome6 name="pen" size={16} color="#ffffff80" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => deleteExampleSituation(index)}
          >
            <Feather name="trash-2" size={20} color="#ffffff80" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 상황예시 내용 */}
      {isOpen
        ? situation.map((item) =>
            item.role === "user" ? (
              <View key={item.id} style={styles.userMessageWrapper}>
                <View style={styles.userMessageBubble}>
                  <Markdown rules={markdownRules}>{item.message}</Markdown>
                </View>
              </View>
            ) : (
              <View key={item.id} style={styles.aiMessageContainer}>
                <View>
                  {character_image ? (
                    <Image
                      source={{ uri: character_image }}
                      style={styles.characterImage}
                    />
                  ) : (
                    <Feather
                      name="zap"
                      size={24}
                      color="#fff3"
                      style={styles.placeholderIcon}
                    />
                  )}
                </View>
                <View style={styles.aiMessageBubble}>
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

const styles = StyleSheet.create({
  cardContainer: {
    borderColor: "#ffffff14",
    borderWidth: 1,
    borderRadius: 16,
    margin: 10,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTouchable: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
  },
  actionButton: {
    padding: 10,
  },
  userMessageWrapper: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  userMessageBubble: {
    backgroundColor: "rgb(124, 103, 255)",
    borderRadius: 16,
    borderTopRightRadius: 0,
    padding: 10,
    maxWidth: "70%",
    marginHorizontal: 20,
  },
  aiMessageContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    gap: 5,
    marginBottom: 10,
  },
  characterImage: {
    width: 36,
    height: 36,
    borderRadius: 100,
  },
  placeholderIcon: {
    borderRadius: 100,
    padding: 5,
    backgroundColor: "rgb(51 51 51)",
  },
  aiMessageBubble: {
    backgroundColor: "rgb(38, 39, 39)",
    borderRadius: 16,
    borderTopLeftRadius: 0,
    padding: 10,
    maxWidth: "70%",
  },
});
