import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import useCharacterStore from "../../stores/useCharacterStore";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import EvilIcons from "@expo/vector-icons/EvilIcons";

function Introduction() {
  const navigation = useNavigation();
  const { presentation, setPresentation, hashtag, deleteHashtag } =
    useCharacterStore();
  const [creatorComment, setCreatorComment] = useState("");

  const tagCount = hashtag.length;

  return (
    <>
      {/* 캐릭터 제작 */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewContent}
      >
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>다른 유저들에게 소개해주세요</Text>
        </View>

        {/* 캐릭터 소개 */}
        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>소개글</Text>
            <View>
              <TextInput
                value={presentation}
                onChangeText={(text) => setPresentation(text)}
                maxLength={40}
                placeholder="제목과 함께 보일 소개글을 써주세요"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                multiline={true}
                style={[styles.textInput, styles.multilinePresentationInput]}
              />
              <Text style={styles.charCountOverlay}>
                {presentation.length}/40
              </Text>
            </View>
          </View>
          <View style={[styles.inputGroup, styles.marginBottom20]}>
            <View style={styles.hashtagHeader}>
              <Text style={styles.inputLabel}>해시태그</Text>
              <Text style={styles.hashtagSubtitle}>
                해시태그가 있으면 10배 더 많이 노출될 거에요
              </Text>
            </View>
            <View style={styles.hashtagContainer}>
              {hashtag.map((t, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.hashtagBubble}
                  onPress={() => deleteHashtag(idx)}
                >
                  <Text style={styles.hashtagText}>#{t}</Text>
                  <EvilIcons name="close" size={14} color="#ffffff80" />
                </TouchableOpacity>
              ))}
              {tagCount < 10 ? (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Hashtag")}
                >
                  <Text style={styles.addHashtagButton}>
                    + 추가 {tagCount}/10
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>크리에이터 코멘트</Text>
            <View>
              <TextInput
                value={creatorComment}
                onChangeText={(text) => setCreatorComment(text)}
                maxLength={150}
                placeholder={`유저들에게 하고 싶은 말을 써주세요\n상세 페이지에서 보여 드려요\nex. 대화 많이 해주셔서 감사해요`}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                multiline={true}
                style={[styles.textInput, styles.multilineCreatorCommentInput]}
              />
              <Text style={styles.charCountOverlay}>
                {creatorComment.length}/150
              </Text>
            </View>
          </View>
        </View>

        {/* 공개 여부 */}
        <View style={styles.card}>
          <View style={[styles.switchRow, styles.borderBottom]}>
            <View style={styles.switchTextContainer}>
              <Text style={styles.switchTitle}>다른 유저들에게 공개</Text>
              <Text style={styles.switchSubtitle}>
                누구나 대화할 수 있어요 공개로 등록하면 다시 비공개로 바꿀 수
                없어요
              </Text>
            </View>
            <Switch
              trackColor={{
                false: "rgb(89 91 99)",
                true: "rgb(124, 103, 255)",
              }}
            />
          </View>
          <View
            style={[
              styles.switchRow,
              styles.borderBottom,
              styles.paddingVertical10,
            ]}
          >
            <View style={styles.switchTextContainer}>
              <Text style={styles.switchTitle}>상세 설명 공개</Text>
              <Text style={styles.switchSubtitle}>
                내용 탭의 상세 설명을 다른 유저가 볼 수 있어요
              </Text>
            </View>
            <Switch
              trackColor={{
                false: "rgb(89 91 99)",
                true: "rgb(124, 103, 255)",
              }}
            />
          </View>
          <View style={[styles.switchRow, styles.paddingTop10]}>
            <View style={styles.switchTextContainer}>
              <Text style={styles.switchTitle}>상황 예시 공개</Text>
              <Text style={styles.switchSubtitle}>
                상황 예시를 다른 유저가 볼 수 있어요
              </Text>
            </View>
            <Switch
              trackColor={{
                false: "rgb(89 91 99)",
                true: "rgb(124, 103, 255)",
              }}
            />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.switchRow}>
            <View style={styles.switchTextContainer}>
              <Text style={styles.switchTitle}>스냅샷 기능 사용</Text>
              <Text style={styles.switchSubtitle}>
                캐릭토 프로필과 대화 내용을 바탕으로 이미지를 만들 수 있어요.
              </Text>
            </View>
            <Switch
              trackColor={{
                false: "rgb(89 91 99)",
                true: "rgb(124, 103, 255)",
              }}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default Introduction;

const styles = StyleSheet.create({
  scrollViewContent: {
    marginHorizontal: 15,
  },
  sectionTitleContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "500",
  },
  card: {
    backgroundColor: "rgb(38, 39, 39)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  inputGroup: {
    gap: 7,
    marginBottom: 20,
  },
  marginBottom20: {
    marginBottom: 20,
  },
  inputLabel: {
    color: "rgb(229, 231, 235)",
    fontSize: 16,
  },
  textInput: {
    color: "white",
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ffffff0d",
    borderRadius: 6,
    backgroundColor: "#0000000d",
  },
  multilinePresentationInput: {
    height: 70,
  },
  multilineCreatorCommentInput: {
    height: 150,
  },
  charCountOverlay: {
    color: "rgba(255, 255, 255, 0.5)",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  hashtagHeader: {
    gap: 5,
  },
  hashtagSubtitle: {
    color: "#ffffff80",
    fontSize: 14,
  },
  hashtagContainer: {
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
  },
  hashtagBubble: {
    flexDirection: "row",
    backgroundColor: "rgb(62 62 65)",
    padding: 10,
    borderRadius: 6,
    alignSelf: "flex-start",
    alignItems: "center",
  },
  hashtagText: {
    color: "white",
  },
  addHashtagButton: {
    color: "white",
    backgroundColor: "rgb(62, 62, 65)",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff0d",
  },
  paddingVertical10: {
    paddingVertical: 10,
  },
  paddingTop10: {
    paddingTop: 10,
  },
  switchTextContainer: {
    gap: 3,
  },
  switchTitle: {
    color: "white",
    fontWeight: "500",
  },
  switchSubtitle: {
    color: "#ffffff80",
    fontSize: 12,
  },
});
