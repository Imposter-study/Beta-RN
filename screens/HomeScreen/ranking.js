import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.25;

function Ranking() {
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
      <ScrollView>
        <View style={styles.topTabContainer}>
          <View style={styles.topTabButtons}>
            <TouchableOpacity>
              <Text
                style={[styles.topTabButtonText, styles.topTabButtonActive]}
              >
                실시간
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.topTabButtonText}>일간</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.topTabButtonText}>주간</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.topTabButtonText}>월간</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.topTabDescription}>
              전체 인기순 / 남성 인기순 / 여성 인기순
            </Text>
          </View>
        </View>

        {/* 실시간 랭킹 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>지금 뜨는 랭킹 캐릭터</Text>
          <Text style={styles.sectionSubTitle}>20분전 업데이트 됨</Text>
        </View>
        <View>
          {topCharacters.map((char, index) => (
            <TouchableOpacity key={index} style={styles.characterRow}>
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
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>오늘의 랭킹 캐릭터</Text>
          <Text style={styles.sectionSubTitle}>
            매일 오전 6시에 업데이트 됨
          </Text>
        </View>
        <View>
          {topCharacters.map((char, index) => (
            <TouchableOpacity key={index} style={styles.characterRow}>
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
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>이번 주의 랭킹 캐릭터</Text>
          <Text style={styles.sectionSubTitle}>
            매주 월요일 오전 6시에 업데이트 됨
          </Text>
        </View>
        <View>
          {topCharacters.map((char, index) => (
            <TouchableOpacity key={index} style={styles.characterRow}>
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
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>6월의 랭킹 캐릭터</Text>
          <Text style={styles.sectionSubTitle}>
            매월 1일 오전 6시에 업데이트 됨
          </Text>
        </View>
        <View>
          {topCharacters.map((char, index) => (
            <TouchableOpacity key={index} style={styles.characterRow}>
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
