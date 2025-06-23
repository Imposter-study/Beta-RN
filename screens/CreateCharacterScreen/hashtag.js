import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  Keyboard,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";
import useCharacterStore from "../../stores/useCharacterStore";

function Hashtag() {
  const navigation = useNavigation();
  const { hashtag, setHashtag, deleteHashtag } = useCharacterStore();
  const [tag, setTag] = useState("");

  const tagCount = hashtag.length;

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {/* 헤더 */}
          <View style={styles.header}>
            <View></View>
            <Text style={styles.headerTitle}>해시태그 입력({tagCount}/10)</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.confirmButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tagsContainer}>
            {hashtag.map((t, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.tagBubble}
                onPress={() => deleteHashtag(idx)}
              >
                <Text style={styles.tagText}>#{t}</Text>
                <EvilIcons name="close" size={14} color="#ffffff80" />
              </TouchableOpacity>
            ))}
            {tagCount < 10 ? (
              <View style={styles.tagInputBubble}>
                <Text style={styles.tagInputHash}>#</Text>
                <TextInput
                  value={tag}
                  onChangeText={(text) => setTag(text)}
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    setHashtag(tag);
                    setTag("");
                  }}
                  autoFocus={true}
                  style={styles.tagTextInput}
                />
              </View>
            ) : null}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default Hashtag;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1a1b1b",
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "500",
  },
  confirmButtonText: {
    color: "rgb(124 103 255)",
    fontSize: 16,
    fontWeight: "500",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 0.7,
    borderBottomColor: "#ffffff0d",
  },
  tagBubble: {
    flexDirection: "row",
    backgroundColor: "rgb(62 62 65)",
    padding: 10,
    borderRadius: 6,
    alignSelf: "flex-start",
    alignItems: "center",
  },
  tagText: {
    color: "white",
  },
  tagInputBubble: {
    flexDirection: "row",
    backgroundColor: "rgb(62 62 65)",
    padding: 10,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  tagInputHash: {
    color: "rgb(229 231 235)",
  },
  tagTextInput: {
    minWidth: 20,
    color: "rgb(229 231 235)",
  },
});
