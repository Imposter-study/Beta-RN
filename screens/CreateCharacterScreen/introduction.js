import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
} from "react-native";
import useCharacterStore from "../../stores/useCharacterStore";
import { useState } from "react";

function Introduction() {
  const { presentation, setPresentation } = useCharacterStore();
  const [creatorComment, setCreatorComment] = useState("");

  return (
    <>
      {/* 캐릭터 제작 */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 15 }}
      >
        <View style={{ marginVertical: 20 }}>
          <Text style={{ color: "white", fontSize: 22, fontWeight: "500" }}>
            다른 유저들에게 소개해주세요
          </Text>
        </View>

        {/* 캐릭터 소개 */}
        <View
          style={{
            backgroundColor: "rgb(38, 39, 39)",
            borderRadius: 16,
            padding: 16,
            marginBottom: 10,
          }}
        >
          <View style={{ gap: 7, marginBottom: 20 }}>
            <Text style={{ color: "rgb(229, 231, 235)", fontSize: 16 }}>
              소개글
            </Text>
            <View>
              <TextInput
                value={presentation}
                onChangeText={(text) => setPresentation(text)}
                maxLength={40}
                placeholder="제목과 함께 보일 소개글을 써주세요"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                multiline={true}
                style={{
                  color: "white",
                  paddingHorizontal: 7,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: "#ffffff0d",
                  borderRadius: 6,
                  height: 70,
                  backgroundColor: "#0000000d",
                }}
              />
              <Text
                style={{
                  color: "rgba(255, 255, 255, 0.5)",
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                }}
              >
                {presentation.length}/40
              </Text>
            </View>
          </View>
          <View style={{ gap: 7, marginBottom: 20 }}>
            <View style={{ gap: 5 }}>
              <Text style={{ color: "rgb(229, 231, 235)", fontSize: 16 }}>
                해시태그
              </Text>
              <Text style={{ color: "#ffffff80" }}>
                해시태그가 있으면 10배 더 많이 노출될 거에요
              </Text>
            </View>
            <View>
              <TouchableOpacity>
                <Text
                  style={{
                    color: "white",
                    backgroundColor: "rgb(62, 62, 65)",
                    padding: 10,
                    borderRadius: 5,
                    alignSelf: "flex-start",
                  }}
                >
                  + 추가 0/10
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ gap: 7 }}>
            <Text style={{ color: "rgb(229, 231, 235)", fontSize: 16 }}>
              크리에이터 코멘트
            </Text>
            <View>
              <TextInput
                value={creatorComment}
                onChangeText={(text) => setCreatorComment(text)}
                maxLength={150}
                placeholder={`유저들에게 하고 싶은 말을 써주세요\n상세 페이지에서 보여 드려요\nex. 대화 많이 해주셔서 감사해요`}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                multiline={true}
                style={{
                  color: "white",
                  paddingHorizontal: 7,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: "#ffffff0d",
                  borderRadius: 6,
                  height: 150,
                  backgroundColor: "#0000000d",
                }}
              />
              <Text
                style={{
                  color: "rgba(255, 255, 255, 0.5)",
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                }}
              >
                {creatorComment.length}/150
              </Text>
            </View>
          </View>
        </View>

        {/* 공개 여부 */}
        <View
          style={{
            backgroundColor: "rgb(38, 39, 39)",
            borderRadius: 16,
            padding: 16,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "#ffffff0d",
              paddingBottom: 10,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ gap: 3 }}>
              <Text style={{ color: "white", fontWeight: "500" }}>
                다른 유저들에게 공개
              </Text>
              <Text style={{ color: "#ffffff80", fontSize: 12 }}>
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
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "#ffffff0d",
              paddingVertical: 10,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ gap: 3 }}>
              <Text style={{ color: "white", fontWeight: "500" }}>
                상세 설명 공개
              </Text>
              <Text style={{ color: "#ffffff80", fontSize: 12 }}>
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
          <View
            style={{
              flexDirection: "row",
              paddingTop: 10,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ gap: 3 }}>
              <Text style={{ color: "white", fontWeight: "500" }}>
                상황 예시 공개
              </Text>
              <Text style={{ color: "#ffffff80", fontSize: 12 }}>
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

        <View
          style={{
            backgroundColor: "rgb(38, 39, 39)",
            borderRadius: 16,
            padding: 16,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ gap: 3 }}>
              <Text style={{ color: "white", fontWeight: "500" }}>
                스냅샷 기능 사용
              </Text>
              <Text style={{ color: "#ffffff80", fontSize: 12 }}>
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
