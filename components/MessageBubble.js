import { StyleSheet, Image, View, Text } from "react-native";
import Markdown from "react-native-markdown-display";
import { markdownRules } from "../utils/markdownRules";
import Feather from "@expo/vector-icons/Feather";

export function AiMessage({ image, name, content }) {
  return (
    <>
      <Image
        source={{
          uri: image,
        }}
        style={styles.aiImage}
      />
      <View style={styles.aiChatContent}>
        <Text style={styles.aiName}>{name}</Text>
        <View style={styles.aiChatBox}>
          <Markdown rules={markdownRules}>{content}</Markdown>
        </View>
      </View>
    </>
  );
}

export function SimpleAiMessage({ image, content }) {
  return (
    <>
      {image ? (
        <Image
          source={{
            uri: image,
          }}
          style={styles.aiImage}
        />
      ) : (
        <Feather
          name="zap"
          size={24}
          color="#fff3"
          style={styles.placeholderIcon}
        />
      )}
      <View style={styles.aiChatBox}>
        <Markdown rules={markdownRules}>{content}</Markdown>
      </View>
    </>
  );
}

export function UserMessage({ content }) {
  return (
    <View style={styles.userChatBox}>
      <Markdown rules={markdownRules}>{content}</Markdown>
    </View>
  );
}

const styles = StyleSheet.create({
  userChatBox: {
    backgroundColor: "rgb(124, 103, 255)",
    borderRadius: 16,
    borderTopRightRadius: 0,
    padding: 10,
    maxWidth: "70%",
    marginHorizontal: 10,
  },
  aiImage: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  aiChatContent: {
    flex: 1,
    gap: 5,
    alignItems: "flex-start",
  },
  aiName: {
    color: "#ffffffb3",
  },
  aiChatBox: {
    backgroundColor: "rgb(38, 39, 39)",
    borderRadius: 16,
    borderTopLeftRadius: 0,
    padding: 10,
    maxWidth: "80%",
    alignSelf: "flex-start",
  },
  placeholderIcon: {
    borderRadius: 100,
    padding: 5,
    backgroundColor: "rgb(51 51 51)",
  },
});
