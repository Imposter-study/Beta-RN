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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            marginVertical: 5,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <Text
                style={{
                  color: "white",
                  backgroundColor: "#6728FF",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  margin: 3,
                  borderRadius: 18,
                  fontSize: 16,
                }}
              >
                실시간
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  color: "white",
                  backgroundColor: "#3E3E41",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  margin: 3,
                  borderRadius: 18,
                  fontSize: 16,
                }}
              >
                일간
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  color: "white",
                  backgroundColor: "#3E3E41",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  margin: 3,
                  borderRadius: 18,
                  fontSize: 16,
                }}
              >
                주간
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  color: "white",
                  backgroundColor: "#3E3E41",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  margin: 3,
                  borderRadius: 18,
                  fontSize: 16,
                }}
              >
                월간
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ color: "#FFFFFF80", fontSize: 16 }}>
              전체 인기순 / 남성 인기순 / 여성 인기순
            </Text>
          </View>
        </View>

        {/* 실시간 랭킹 */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>
            지금 뜨는 랭킹 캐릭터
          </Text>
          <Text style={{ color: "#FFFFFF80", paddingVertical: 5 }}>
            20분전 업데이트 됨
          </Text>
        </View>
        <View>
          {topCharacters.map((char, index) => (
            <TouchableOpacity
              key={index}
              style={{ flexDirection: "row", marginBottom: 20 }}
            >
              <View
                style={{
                  position: "relative",
                  flexDirection: "row",
                  marginLeft: 24,
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: -5,
                    fontWeight: "900",
                    zIndex: 1,
                  }}
                >
                  <Text
                    style={{ color: "#737883", fontSize: imageWidth * 0.5 }}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Image source={{ uri: char.imageUri }} style={styles.image} />
              </View>
              <View style={{ justifyContent: "center", gap: 5 }}>
                <Text style={{ color: "white", fontWeight: "500" }}>
                  {char.name} {index + 1}
                </Text>
                <Text style={{ color: "#FFFFFF80", fontWeight: "500" }}>
                  {char.intro}
                </Text>
                <Text style={{ color: "#FFFFFFB3", fontWeight: "500" }}>
                  {char.tag}
                </Text>
                <Text
                  style={{
                    color: "#ffffff80",
                    borderRadius: 6,
                    backgroundColor: "black",
                    alignSelf: "flex-start",
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                    marginTop: 4,
                  }}
                >
                  {char.creator}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={{
              marginHorizontal: 24,
              alignItems: "center",
              backgroundColor: "#3E3E41",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "white",
                paddingVertical: 10,
                fontSize: 16,
              }}
            >
              전체보기
            </Text>
          </TouchableOpacity>
        </View>

        {/* 일간 랭킹 */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>
            오늘의 랭킹 캐릭터
          </Text>
          <Text style={{ color: "#FFFFFF80", paddingVertical: 5 }}>
            매일 오전 6시에 업데이트 됨
          </Text>
        </View>
        <View>
          {topCharacters.map((char, index) => (
            <TouchableOpacity
              key={index}
              style={{ flexDirection: "row", marginBottom: 20 }}
            >
              <View
                style={{
                  position: "relative",
                  flexDirection: "row",
                  marginLeft: 24,
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: -5,
                    fontWeight: "900",
                    zIndex: 1,
                  }}
                >
                  <Text
                    style={{ color: "#737883", fontSize: imageWidth * 0.5 }}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Image source={{ uri: char.imageUri }} style={styles.image} />
              </View>
              <View style={{ justifyContent: "center", gap: 5 }}>
                <Text style={{ color: "white", fontWeight: "500" }}>
                  {char.name} {index + 1}
                </Text>
                <Text style={{ color: "#FFFFFF80", fontWeight: "500" }}>
                  {char.intro}
                </Text>
                <Text style={{ color: "#FFFFFFB3", fontWeight: "500" }}>
                  {char.tag}
                </Text>
                <Text
                  style={{
                    color: "#ffffff80",
                    borderRadius: 6,
                    backgroundColor: "black",
                    alignSelf: "flex-start",
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                    marginTop: 4,
                  }}
                >
                  {char.creator}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={{
              marginHorizontal: 24,
              alignItems: "center",
              backgroundColor: "#3E3E41",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "white",
                paddingVertical: 10,
                fontSize: 16,
              }}
            >
              전체보기
            </Text>
          </TouchableOpacity>
        </View>

        {/* 주간 랭킹 */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>
            이번 주의 랭킹 캐릭터
          </Text>
          <Text style={{ color: "#FFFFFF80", paddingVertical: 5 }}>
            매주 월요일 오전 6시에 업데이트 됨
          </Text>
        </View>
        <View>
          {topCharacters.map((char, index) => (
            <TouchableOpacity
              key={index}
              style={{ flexDirection: "row", marginBottom: 20 }}
            >
              <View
                style={{
                  position: "relative",
                  flexDirection: "row",
                  marginLeft: 24,
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: -5,
                    fontWeight: "900",
                    zIndex: 1,
                  }}
                >
                  <Text
                    style={{ color: "#737883", fontSize: imageWidth * 0.5 }}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Image source={{ uri: char.imageUri }} style={styles.image} />
              </View>
              <View style={{ justifyContent: "center", gap: 5 }}>
                <Text style={{ color: "white", fontWeight: "500" }}>
                  {char.name} {index + 1}
                </Text>
                <Text style={{ color: "#FFFFFF80", fontWeight: "500" }}>
                  {char.intro}
                </Text>
                <Text style={{ color: "#FFFFFFB3", fontWeight: "500" }}>
                  {char.tag}
                </Text>
                <Text
                  style={{
                    color: "#ffffff80",
                    borderRadius: 6,
                    backgroundColor: "black",
                    alignSelf: "flex-start",
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                    marginTop: 4,
                  }}
                >
                  {char.creator}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={{
              marginHorizontal: 24,
              alignItems: "center",
              backgroundColor: "#3E3E41",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "white",
                paddingVertical: 10,
                fontSize: 16,
              }}
            >
              전체보기
            </Text>
          </TouchableOpacity>
        </View>

        {/* 월간 랭킹 */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>
            6월의 랭킹 캐릭터
          </Text>
          <Text style={{ color: "#FFFFFF80", paddingVertical: 5 }}>
            매월 1일 오전 6시에 업데이트 됨
          </Text>
        </View>
        <View>
          {topCharacters.map((char, index) => (
            <TouchableOpacity
              key={index}
              style={{ flexDirection: "row", marginBottom: 20 }}
            >
              <View
                style={{
                  position: "relative",
                  flexDirection: "row",
                  marginLeft: 24,
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: -5,
                    fontWeight: "900",
                    zIndex: 1,
                  }}
                >
                  <Text
                    style={{ color: "#737883", fontSize: imageWidth * 0.5 }}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Image source={{ uri: char.imageUri }} style={styles.image} />
              </View>
              <View style={{ justifyContent: "center", gap: 5 }}>
                <Text style={{ color: "white", fontWeight: "500" }}>
                  {char.name} {index + 1}
                </Text>
                <Text style={{ color: "#FFFFFF80", fontWeight: "500" }}>
                  {char.intro}
                </Text>
                <Text style={{ color: "#FFFFFFB3", fontWeight: "500" }}>
                  {char.tag}
                </Text>
                <Text
                  style={{
                    color: "#ffffff80",
                    borderRadius: 6,
                    backgroundColor: "black",
                    alignSelf: "flex-start",
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                    marginTop: 4,
                  }}
                >
                  {char.creator}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={{
              marginHorizontal: 24,
              alignItems: "center",
              backgroundColor: "#3E3E41",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "white",
                paddingVertical: 10,
                fontSize: 16,
              }}
            >
              전체보기
            </Text>
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
  image: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: 12,
    marginHorizontal: 10,
  },
});
