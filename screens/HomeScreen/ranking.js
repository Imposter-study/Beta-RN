import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.25;

function Ranking() {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  // 각 섹션의 y위치를 저장할 상태
  const [sectionPositions, setSectionPoisitions] = useState({});
  // 탭 선택 상태
  const [selectedTab, setSelectedTab] = useState("realtime");

  // 드롭다운 상태 선언
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("전체 인기순");
  const [items, setItems] = useState([
    { label: "전체 인기순", value: "전체 인기순" },
    { label: "남성 인기순", value: "남성 인기순" },
    { label: "여성 인기순", value: "여성 인기순" },
  ]);

  // 스크롤 위치에 따라 탭 업데이트
  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    // 섹션 키와 위치 배열로 변환 (y 기준 오름차순 정렬)
    const sortedSections = Object.entries(sectionPositions).sort(
      (a, b) => a[1] - b[1]
    );

    // 현재 scrollY가 어느 섹션에 해당하는지 찾기
    let currentTab = selectedTab;
    for (let i = 0; i < sortedSections.length; i++) {
      const [key, pos] = sortedSections[i];
      const nextPos =
        i + 1 < sortedSections.length ? sortedSections[i + 1][1] : Infinity;

      if (scrollY >= pos && scrollY < nextPos) {
        currentTab = key;
        break;
      }
    }

    if (currentTab !== selectedTab) {
      setSelectedTab(currentTab);
    }
  };

  // 탭 클릭 시 해당 위치로 스크롤
  const onTabPress = (tabKey) => {
    setSelectedTab(tabKey);
    if (scrollViewRef.current && sectionPositions[tabKey] !== undefined) {
      scrollViewRef.current.scrollTo({
        y: sectionPositions[tabKey],
        animated: true,
      });
    }
  };

  // 섹션이 화면에 렌더링 될 때 위치 측정해서 저장
  const onLayoutSection = (tabKey, event) => {
    const { y } = event.nativeEvent.layout;
    setSectionPoisitions((prev) => ({ ...prev, [tabKey]: y }));
  };

  const topCharacters = Array(10).fill({
    id: 1,
    imageUri:
      "https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800",
    name: "캐릭터 이름",
    intro: "캐릭터 인트로 소개글",
    tag: "#해시태그",
    creator: "@creator",
  });

  return (
    <View style={styles.container}>
      <View style={styles.topTabContainer}>
        <View style={styles.topTabButtons}>
          <TouchableOpacity onPress={() => onTabPress("realtime")}>
            <Text
              // style={[styles.topTabButtonText, styles.topTabButtonActive]}
              style={
                selectedTab === "realtime"
                  ? styles.topTabButtonActive
                  : styles.topTabButtonText
              }
            >
              실시간
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onTabPress("daily")}>
            <Text
              style={
                selectedTab === "daily"
                  ? [styles.topTabButtonActive]
                  : styles.topTabButtonText
              }
            >
              일간
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onTabPress("weekly")}>
            <Text
              style={
                selectedTab === "weekly"
                  ? styles.topTabButtonActive
                  : styles.topTabButtonText
              }
            >
              주간
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onTabPress("monthly")}>
            <Text
              style={
                selectedTab === "monthly"
                  ? styles.topTabButtonActive
                  : styles.topTabButtonText
              }
            >
              월간
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ zIndex: 1 }}>
          {/* <Text style={styles.topTabDescription}>
              전체 인기순 / 남성 인기순 / 여성 인기순
            </Text> */}
          <DropDownPicker
            open={open}
            value={selectedCategory}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedCategory}
            setItems={setItems}
            containerStyle={
              {
                //   width: "auto",
              }
            }
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
              width: 120,
            }}
            labelStyle={{ color: "#FFFFFF80" }}
            textStyle={{ color: "white" }} // 드롭다운 리스트 텍스트 색
            dropDownContainerStyle={{
              backgroundColor: "rgb(62, 62, 65)",
              borderColor: "#ffffff14",
              width: "auto",
            }}
            listItemContainerStyle={{
              width: 120,
            }}
            arrowIconStyle={{ tintColor: "#FFFFFF80" }} // 화살표 색깔 변경
          />
        </View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1 }}
        scrollEventThrottle={16} // 16ms 마다 onScroll 호출, 부드러운 반응
        onScroll={handleScroll}
      >
        {/* 실시간 랭킹 */}
        <View
          style={styles.sectionHeader}
          onLayout={(e) => onLayoutSection("realtime", e)}
        >
          <Text style={styles.sectionTitle}>지금 뜨는 랭킹 캐릭터</Text>
          <Text style={styles.sectionSubTitle}>20분전 업데이트 됨</Text>
        </View>
        <View>
          {topCharacters.map((char, index) => (
            <TouchableOpacity
              key={index}
              style={styles.characterRow}
              onPress={() =>
                navigation.navigate("CharacterDetail", { character: char })
              }
            >
              <View style={styles.characterImageWrapper}>
                <View style={styles.rankNumberWrapper}>
                  <Text
                    style={[styles.rankNumber, { fontSize: imageWidth * 0.5 }]}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Image source={{ uri: char.imageUri }} style={styles.image} />
              </View>
              <View style={styles.characterInfo}>
                <Text style={styles.characterName}>
                  {char.name} {index + 1}
                </Text>
                <Text style={styles.characterIntro}>{char.intro}</Text>
                <Text style={styles.characterTag}>{char.tag}</Text>
                <Text style={styles.characterCreator}>{char.creator}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>전체보기</Text>
          </TouchableOpacity>
        </View>

        {/* 일간 랭킹 */}
        <View
          style={styles.sectionHeader}
          onLayout={(e) => onLayoutSection("daily", e)}
        >
          <Text style={styles.sectionTitle}>오늘의 랭킹 캐릭터</Text>
          <Text style={styles.sectionSubTitle}>
            매일 오전 6시에 업데이트 됨
          </Text>
        </View>
        <View>
          {topCharacters.map((char, index) => (
            <TouchableOpacity
              key={index}
              style={styles.characterRow}
              onPress={() =>
                navigation.navigate("CharacterDetail", { character: char })
              }
            >
              <View style={styles.characterImageWrapper}>
                <View style={styles.rankNumberWrapper}>
                  <Text
                    style={[styles.rankNumber, { fontSize: imageWidth * 0.5 }]}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Image source={{ uri: char.imageUri }} style={styles.image} />
              </View>
              <View style={styles.characterInfo}>
                <Text style={styles.characterName}>
                  {char.name} {index + 1}
                </Text>
                <Text style={styles.characterIntro}>{char.intro}</Text>
                <Text style={styles.characterTag}>{char.tag}</Text>
                <Text style={styles.characterCreator}>{char.creator}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>전체보기</Text>
          </TouchableOpacity>
        </View>

        {/* 주간 랭킹 */}
        <View
          style={styles.sectionHeader}
          onLayout={(e) => onLayoutSection("weekly", e)}
        >
          <Text style={styles.sectionTitle}>이번 주의 랭킹 캐릭터</Text>
          <Text style={styles.sectionSubTitle}>
            매주 월요일 오전 6시에 업데이트 됨
          </Text>
        </View>
        <View>
          {topCharacters.map((char, index) => (
            <TouchableOpacity
              key={index}
              style={styles.characterRow}
              onPress={() =>
                navigation.navigate("CharacterDetail", { character: char })
              }
            >
              <View style={styles.characterImageWrapper}>
                <View style={styles.rankNumberWrapper}>
                  <Text
                    style={[styles.rankNumber, { fontSize: imageWidth * 0.5 }]}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Image source={{ uri: char.imageUri }} style={styles.image} />
              </View>
              <View style={styles.characterInfo}>
                <Text style={styles.characterName}>
                  {char.name} {index + 1}
                </Text>
                <Text style={styles.characterIntro}>{char.intro}</Text>
                <Text style={styles.characterTag}>{char.tag}</Text>
                <Text style={styles.characterCreator}>{char.creator}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>전체보기</Text>
          </TouchableOpacity>
        </View>

        {/* 월간 랭킹 */}
        <View
          style={styles.sectionHeader}
          onLayout={(e) => onLayoutSection("monthly", e)}
        >
          <Text style={styles.sectionTitle}>6월의 랭킹 캐릭터</Text>
          <Text style={styles.sectionSubTitle}>
            매월 1일 오전 6시에 업데이트 됨
          </Text>
        </View>
        <View>
          {topCharacters.map((char, index) => (
            <TouchableOpacity
              key={index}
              style={styles.characterRow}
              onPress={() =>
                navigation.navigate("CharacterDetail", { character: char })
              }
            >
              <View style={styles.characterImageWrapper}>
                <View style={styles.rankNumberWrapper}>
                  <Text
                    style={[styles.rankNumber, { fontSize: imageWidth * 0.5 }]}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Image source={{ uri: char.imageUri }} style={styles.image} />
              </View>
              <View style={styles.characterInfo}>
                <Text style={styles.characterName}>
                  {char.name} {index + 1}
                </Text>
                <Text style={styles.characterIntro}>{char.intro}</Text>
                <Text style={styles.characterTag}>{char.tag}</Text>
                <Text style={styles.characterCreator}>{char.creator}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>전체보기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default Ranking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1a1b1b",
  },
  topTabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 5,
    alignItems: "center",
  },
  topTabButtons: {
    flexDirection: "row",
  },
  topTabButtonText: {
    color: "white",
    backgroundColor: "#3E3E41",
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 3,
    borderRadius: 18,
    fontSize: 16,
  },
  topTabButtonActive: {
    backgroundColor: "#6728FF",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 3,
    borderRadius: 18,
    fontSize: 16,
  },
  topTabDescription: {
    color: "#FFFFFF80",
    fontSize: 16,
  },
  sectionHeader: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  sectionSubTitle: {
    color: "#FFFFFF80",
    paddingVertical: 5,
  },
  characterRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  characterImageWrapper: {
    position: "relative",
    flexDirection: "row",
    marginLeft: 24,
  },
  rankNumberWrapper: {
    position: "absolute",
    bottom: 0,
    left: -5,
    zIndex: 1,
  },
  rankNumber: {
    color: "#737883",
    fontWeight: "900",
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: 12,
    marginHorizontal: 10,
  },
  characterInfo: {
    justifyContent: "center",
    gap: 5,
  },
  characterName: {
    color: "white",
    fontWeight: "500",
  },
  characterIntro: {
    color: "#FFFFFF80",
    fontWeight: "500",
  },
  characterTag: {
    color: "#FFFFFFB3",
    fontWeight: "500",
  },
  characterCreator: {
    color: "#ffffff80",
    borderRadius: 6,
    backgroundColor: "black",
    alignSelf: "flex-start",
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginTop: 4,
  },
  viewAllButton: {
    marginHorizontal: 24,
    alignItems: "center",
    backgroundColor: "#3E3E41",
    borderRadius: 6,
  },
  viewAllButtonText: {
    color: "white",
    paddingVertical: 10,
    fontSize: 16,
  },
});
