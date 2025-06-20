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
      style={{ flex: 1 }}
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
              <Text
                style={{
                  color: "rgb(124 103 255)",
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                확인
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
              paddingHorizontal: 15,
              paddingVertical: 20,
              borderBottomWidth: 0.7,
              borderBottomColor: "#ffffff0d",
            }}
          >
            {hashtag.map((t, idx) => (
              <TouchableOpacity
                key={idx}
                style={{
                  flexDirection: "row",
                  backgroundColor: "rgb(62 62 65)",
                  padding: 10,
                  borderRadius: 6,
                  alignSelf: "flex-start",
                  alignItems: "center",
                }}
                onPress={() => deleteHashtag(idx)}
              >
                <Text style={{ color: "white" }}>#{t}</Text>
                <EvilIcons name="close" size={14} color="#ffffff80" />
              </TouchableOpacity>
            ))}
            {tagCount < 10 ? (
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "rgb(62 62 65)",
                  padding: 10,
                  borderRadius: 6,
                  alignSelf: "flex-start",
                }}
              >
                <Text style={{ color: "rgb(229 231 235)" }}>#</Text>
                <TextInput
                  value={tag}
                  onChangeText={(text) => setTag(text)}
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    setHashtag(tag);
                    setTag("");
                  }}
                  autoFocus={true}
                  style={{
                    minWidth: 20,
                    color: "rgb(229 231 235)",
                  }}
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
});
