import React, { useState, useRef } from "react"; // useRef import
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
  Alert,
  Dimensions, // Dimensions import
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Content from "./content";
import { useNavigation } from "@react-navigation/native";
import Intro from "./intro";
import Situation from "./situation";
import Introduction from "./introduction";
import useCharacterStore from "../../stores/useCharacterStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axios from "axios";
import { API_URL } from "../../config";
import Modal from "react-native-modal";

const { width, height } = Dimensions.get("window"); // 화면 크기 가져오기

function CreateCharacter() {
  const navigation = useNavigation();
  const [nowScreen, setNowScreen] = useState("content");

  const [modalVisible, setModalVisible] = useState(false);
  const [showCommandGuide, setShowCommandGuide] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 }); // 메뉴 위치 상태 추가
  const menuIconRef = useRef(null); // 아이콘 ref 추가
  const [pendingModal, setPendingModal] = useState(null);

  const { resetCharacter, title, name, intro, character_image } =
    useCharacterStore();
  const isCharacterValid = !!(
    title &&
    name &&
    intro.length > 0 &&
    character_image
  );

  const onClose = () => {
    const title = "지금 나가면 수정한 내용이 삭제돼요";
    const message = `제한된 분량을 초과하거나, 형식에 맞지 않는 내용이 있어\n저장할 수 없어요.\n저장하시려면 수정해주세요.`;
    Alert.alert(title, message, [
      { text: "취소" },
      {
        text: "나가기",
        onPress: () => {
          resetCharacter();
          navigation.goBack();
        },
      },
    ]);
  };

  // 캐릭터 임시저장
  const onSave = () => {
    const title = "작성 중인 내용을 저장할까요?";
    const message = `저장된 내용은\n마이페이지에서 확인할 수 있어요`;
    Alert.alert(title, message, [
      { text: "취소" },
      {
        text: "임시 저장",
        onPress: async () => {
          try {
            // 현재 상태 가져오가
            const {
              title,
              description,
              character_image,
              name,
              character_info,
              intro,
              example_situation,
              presentation,
              hashtag,
              creator_comment,
              is_character_public,
              is_description_public,
              is_example_public,
            } = useCharacterStore.getState();

            // // AsyncStorage에 저장
            // await AsyncStorage.setItem(
            //   title,
            //   JSON.stringify({
            //     title,
            //     description,
            //     character_image,
            //     name,
            //     character_info,
            //     intro,
            //     example_situation,
            //     presentation,
            //     hashtag,
            //     creator_comment,
            //     is_character_public,
            //     is_description_public,
            //     is_example_public,
            //   })
            // );

            Toast.show({
              type: "info",
              text1: "작성한 내용이 저장되었어요",
              text2: "다른 유저들에게 공개하려면 등록해 주세요",
              position: "top",
              visibilityTime: 3000,
            });
          } catch (error) {
            console.log("저장 실패", error);
          }
        },
      },
    ]);
  };

  // 캐릭터 생성 완료
  const onRegister = () => {
    // 현재 상태 가져오가
    const {
      title,
      description,
      character_image,
      name,
      character_info,
      intro,
      example_situation,
      presentation,
      hashtag,
      creator_comment,
      is_character_public,
      is_description_public,
      is_example_public,
    } = useCharacterStore.getState();

    // axios
    //   .post(API_URL + "characters/", {
    //     title,
    //     description,
    //     character_image,
    //     name,
    //     character_info,
    //     intro,
    //     example_situation,
    //     presentation,
    //     hashtag,
    //     creator_comment,
    //     is_character_public,
    //     is_description_public,
    //     is_example_public,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     navigation.navigate("Home");
    //   })
    //   .catch((error) => {
    //     console.error("캐릭터 생성에 실패하였습니다.", error);
    //   });
    resetCharacter();
    navigation.navigate("Home");
    Toast.show({
      type: "success",
      text1: "등록 되었어요",
      position: "top",
      visibilityTime: 3000,
    });
  };

  const handleOpenMenu = () => {
    if (menuIconRef.current) {
      menuIconRef.current.measure((fx, fy, width, height, px, py) => {
        // px, py는 스크린상의 절대 위치
        // 메뉴를 아이콘 아래에 표시하고, 오른쪽으로 정렬되도록 조정
        // 메뉴의 너비를 고려하여 px에서 빼줍니다. (메뉴 너비 150px 가정)
        const menuWidth = 150; // 메뉴의 예상 너비
        const adjustedX = px + width - menuWidth - 10; // 아이콘 오른쪽 끝에서 메뉴 너비만큼 왼쪽으로 이동, 여백 10px
        const adjustedY = py + height + 5; // 아이콘 아래 5px 간격

        setMenuPosition({ x: adjustedX, y: adjustedY });
        setModalVisible(true);
      });
    }
  };

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
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => onClose()}>
                <Ionicons name="close" size={28} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>제작</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity
                ref={menuIconRef} // ref 연결
                onPress={handleOpenMenu} // 메뉴 열기 함수 호출
              >
                <Ionicons
                  name="ellipsis-horizontal-sharp"
                  size={20}
                  color="white"
                  style={{ padding: 10 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                disabled={!isCharacterValid}
                onPress={onSave}
              >
                <Text
                  style={
                    isCharacterValid
                      ? styles.saveButtonText
                      : {
                          color: "rgb(115 120 131)",
                          backgroundColor: "rgb(62, 62, 65)",
                          padding: 10,
                          borderRadius: 6,
                          fontSize: 16,
                        }
                  }
                >
                  저장
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={!isCharacterValid}
                onPress={onRegister}
                style={styles.registerButton}
              >
                <Text
                  style={
                    isCharacterValid
                      ? styles.registerButtonText
                      : {
                          color: "rgb(115 120 131)",
                          backgroundColor: "rgb(62, 62, 65)",
                          padding: 10,
                          borderRadius: 6,
                          fontSize: 16,
                        }
                  }
                >
                  등록
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 상단 탭 */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setNowScreen("content")}
              style={[
                styles.tabButton,
                nowScreen === "content"
                  ? styles.tabButtonActive
                  : styles.tabButtonInactive,
              ]}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  nowScreen === "content"
                    ? styles.tabButtonTextActive
                    : styles.tabButtonTextInactive,
                ]}
              >
                *내용
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setNowScreen("intro")}
              style={[
                styles.tabButton,
                nowScreen === "intro"
                  ? styles.tabButtonActive
                  : styles.tabButtonInactive,
              ]}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  nowScreen === "intro"
                    ? styles.tabButtonTextActive
                    : styles.tabButtonTextInactive,
                ]}
              >
                *인트로
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setNowScreen("example situation")}
              style={[
                styles.tabButton,
                nowScreen === "example situation"
                  ? styles.tabButtonActive
                  : styles.tabButtonInactive,
              ]}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  nowScreen === "example situation"
                    ? styles.tabButtonTextActive
                    : styles.tabButtonTextInactive,
                ]}
              >
                상황 예시
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setNowScreen("introduction")}
              style={[
                styles.tabButton,
                nowScreen === "introduction"
                  ? styles.tabButtonActive
                  : styles.tabButtonInactive,
              ]}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  nowScreen === "introduction"
                    ? styles.tabButtonTextActive
                    : styles.tabButtonTextInactive,
                ]}
              >
                소개
              </Text>
            </TouchableOpacity>
          </View>

          {nowScreen === "content" ? <Content /> : null}
          {nowScreen === "intro" ? <Intro /> : null}
          {nowScreen === "example situation" ? <Situation /> : null}
          {nowScreen === "introduction" ? <Introduction /> : null}
        </SafeAreaView>
      </TouchableWithoutFeedback>

      {/* 옵션 버튼 클릭 시 모달 (Modal 컴포넌트는 SafeAreaView 바깥에 두는 것이 일반적) */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="fadeIn" // 페이드인 애니메이션
        animationOut="fadeOut" // 페이드아웃 애니메이션
        backdropOpacity={0} // 배경 오버레이 투명도
        style={styles.menuModal} // 모달 스타일 적용
        onModalHide={() => {
          // 기존 모달 닫히고 나서 실행
          if (pendingModal === "commandGuide") {
            setShowCommandGuide(true);
            setPendingModal(null);
          }
        }}
      >
        <View
          style={[
            styles.menuContainer,
            { top: menuPosition.y, left: menuPosition.x }, // 계산된 위치 적용
          ]}
        >
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              Alert.alert(
                "삭제",
                "정말로 삭제하시겠습니까?",
                [
                  { text: "취소", style: "cancel" },
                  {
                    text: "삭제",
                    onPress: () => console.log("삭제 처리 로직"),
                  },
                ],
                { cancelable: true }
              );
              setModalVisible(false); // 메뉴 닫기
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              삭제
            </Text>
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setModalVisible(false);
              setPendingModal("commandGuide");
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              명령어 안내
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* 명령어 안내 모달 */}
      <Modal
        isVisible={showCommandGuide}
        onBackdropPress={() => {
          setShowCommandGuide(false);
        }}
        animationIn="slideInUp"
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View
          style={{
            backgroundColor: "rgb(38,38,39)",
            flex: 0.45,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            padding: 20, // 내부 패딩 추가
          }}
        >
          <Text style={styles.commandGuideTitle}>작성 팁</Text>
          <View style={styles.commandGuideSection}>
            <Text style={styles.commandGuideText}>*상황, 행동, 생각*</Text>
            <Text style={styles.commandGuideDescription}>
              *을 사용해서 상황, 행동, 생각을 표현할 수 있어요
            </Text>
          </View>
          <View style={styles.commandGuideSection}>
            <Text style={styles.commandGuideText}>
              {"{{"}user{"}}"}
            </Text>
            <Text style={styles.commandGuideDescription}>
              {"{{"}user{"}}"}를 사용해서 유저를 입력할 수 있어요
            </Text>
          </View>
          <View>
            <View
              style={{ backgroundColor: "rgb(26 27 27)", borderRadius: 16 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 20,
                }}
              >
                <Text style={{ color: "#ffffff80" }}>예시</Text>
                <Text
                  style={{
                    color: "#ffffff80",
                    backgroundColor: "rgb(124 103 255)",
                    fontSize: 18,
                    padding: 10,
                    alignSelf: "flex-end",
                    borderRadius: 16,
                    borderTopRightRadius: 0,
                  }}
                >
                  그녀는 이석을 짝사랑하고 있다
                </Text>
              </View>
              <View
                style={{ borderBottomWidth: 1, borderBottomColor: "#ffffff0d" }}
              />
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  padding: 20,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: "rgb(229 231 235)",
                    backgroundColor: "#ffffff14",
                    borderRadius: 40,
                    padding: 10,
                    fontStyle: "italic",
                  }}
                >
                  *그녀는 {"{{"}user{"}}"}을 짝사랑하고 있다*
                </Text>
                <Text
                  style={{
                    color: "#fff3",
                    backgroundColor: "#ffffff14",
                    fontSize: 18,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    alignSelf: "flex-end",
                    borderRadius: 100,
                  }}
                >
                  ↑
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

export default CreateCharacter;

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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "500",
  },
  headerRight: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
  saveButton: {
    // No specific style needed here if text has styles
  },
  saveButtonText: {
    color: "white",
    backgroundColor: "rgb(62, 62, 65)",
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
  },
  registerButton: {
    // No specific style needed here if text has styles
  },
  registerButtonText: {
    color: "white",
    backgroundColor: "rgb(82, 32, 204)",
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tabButton: {
    flex: 0.25,
    justifyContent: "center",
    alignItems: "center",
  },
  tabButtonActive: {
    borderBottomColor: "white",
    borderBottomWidth: 2,
  },
  tabButtonInactive: {
    borderBottomColor: "#ffffff14",
    borderBottomWidth: 1,
  },
  tabButtonText: {
    fontSize: 18,
    padding: 15,
  },
  tabButtonTextActive: {
    color: "white",
    fontWeight: "500",
  },
  tabButtonTextInactive: {
    color: "#ffffff80",
  },
  // 메뉴 모달 관련 스타일
  menuModal: {
    justifyContent: "flex-start", // 상단 정렬
    alignItems: "flex-end", // 오른쪽 정렬
    margin: 0, // 화면 전체를 덮도록 마진 0
  },
  menuContainer: {
    position: "absolute", // 절대 위치로 배치
    borderRadius: 12,
    backgroundColor: "rgb(38 39 39)",
    borderWidth: 1,
    borderColor: "#ffffff14",
    width: 150, // 메뉴 너비 고정
    // 그림자 효과 (iOS)
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // 그림자 효과 (Android)
    elevation: 5,
  },
  menuItem: {
    padding: 15,
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#ffffff14",
  },
  // 명령어 안내 모달 스타일
  commandGuideTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  commandGuideSection: {
    marginBottom: 15,
  },
  commandGuideText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  commandGuideDescription: {
    color: "#ffffffb3",
    fontSize: 14,
  },
});
