import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import useCharacterStore from "../../stores/useCharacterStore";

function Content() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    name,
    setName,
    character_info,
    setCharacterInfo,
    character_image,
    setImage,
  } = useCharacterStore();

  const MAX_LENGTH = 1200;
  const inputLength = name.length + description.length + character_info.length;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <>
      {/* 글자수 */}
      <View style={styles.charCountContainer}>
        <Text
          style={[
            styles.charCountText,
            inputLength < MAX_LENGTH
              ? styles.charCountTextNormal
              : styles.charCountTextError,
          ]}
        >
          {inputLength}/1,200자
        </Text>
      </View>

      {/* 캐릭터 제작 */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewContent}
      >
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>
            User님 만의 상상을 현실로 만들어 보세요
          </Text>
        </View>

        {/* 캐릭터 구분 */}
        <View style={styles.inputCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>제목</Text>
            <View>
              <TextInput
                value={title}
                onChangeText={(text) => setTitle(text)}
                maxLength={20}
                placeholder="제목을 입력해주세요."
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                style={styles.textInput}
              />
              <Text style={styles.maxLengthText}>{title.length}/20</Text>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>상세 설명</Text>
            <TextInput
              value={description}
              onChangeText={(text) => setDescription(text)}
              placeholder="상황, 관계, 세계관 등을 설명해주세요."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              multiline={true}
              style={[styles.textInput, styles.multilineTextInput]}
            />
          </View>
        </View>

        {/* 캐릭터 설정 */}
        <View style={styles.subSectionTitleContainer}>
          <Text style={styles.subSectionTitle}>캐릭터를 만들어 주세요</Text>
        </View>
        <View style={styles.inputCard}>
          {/* 이미지 등록 */}
          <View>
            <View style={styles.imagePickerContainer}>
              <TouchableOpacity
                style={styles.imagePickerBorder}
                onPress={pickImage}
              >
                {character_image ? (
                  <Image
                    source={{ uri: character_image }}
                    style={styles.characterImage}
                  />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.imagePlaceholderPlus}>+</Text>
                    <Text style={styles.imagePlaceholderText}>
                      캐릭터 이미지를
                    </Text>
                    <Text style={styles.imagePlaceholderText}>
                      추가해주세요
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          {/* 캐릭터 정보 */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>이름</Text>
            <View>
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                maxLength={10}
                placeholder="짧은 이름이 부르기 편해요. ex.수현"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                style={styles.textInput}
              />
              <Text style={styles.maxLengthText}>{name.length}/10</Text>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>설명</Text>
            <TextInput
              value={character_info}
              onChangeText={(text) => setCharacterInfo(text)}
              placeholder={`캐릭터의 특징, 행동 감정 표현에 대해서 써주시면 개성있는 캐릭터를 만들 수 있어요\nex. 수현은 말이 험하고 온갖 비속어를 휘황찬란하게 사용한다`}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              multiline={true}
              style={[styles.textInput, styles.multilineTextInput]}
            />
          </View>
        </View>
        {/* 경고 */}
        <View>
          <Text style={styles.warningText}>
            ※ 저작권 침해 / 선정성 등 비윤리적인 캐릭터는 삭제될 수 있어요
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

export default Content;

const styles = StyleSheet.create({
  charCountContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#ffffff14",
    borderBottomWidth: 1,
  },
  charCountText: {
    padding: 10,
  },
  charCountTextNormal: {
    color: "#ffffff80",
  },
  charCountTextError: {
    color: "rgb(240 68 56)",
  },
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
  inputCard: {
    backgroundColor: "rgb(38, 39, 39)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  inputGroup: {
    gap: 7,
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
  maxLengthText: {
    position: "absolute",
    color: "rgba(255, 255, 255, 0.5)",
    right: 10,
    top: "30%",
  },
  multilineTextInput: {
    height: 100,
  },
  subSectionTitleContainer: {
    marginBottom: 10,
  },
  subSectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  imagePickerContainer: {
    padding: 10,
    alignItems: "center",
  },
  imagePickerBorder: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgb(103, 40, 255)",
    borderRadius: 12,
  },
  characterImage: {
    width: 128,
    height: 128,
    borderRadius: 12,
  },
  imagePlaceholder: {
    width: 128,
    height: 128,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholderPlus: {
    color: "white",
    fontSize: 50,
    marginBottom: 10,
  },
  imagePlaceholderText: {
    color: "white",
  },
  warningText: {
    color: "#ffffff80",
  },
});
