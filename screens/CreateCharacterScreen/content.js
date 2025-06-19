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
import { useState } from "react";
import useCharacterStore from "../../stores/useCharacterStore";

function Content() {
  // const [image, setImage] = useState(null);
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
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderBottomColor: "#ffffff14",
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            color: inputLength < MAX_LENGTH ? "#ffffff80" : "rgb(240 68 56)",
            padding: 10,
          }}
        >
          {inputLength}/1,200자
        </Text>
      </View>

      {/* 캐릭터 제작 */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 15 }}
      >
        <View style={{ marginVertical: 20 }}>
          <Text style={{ color: "white", fontSize: 22, fontWeight: "500" }}>
            User님 만의 상상을 현실로 만들어 보세요
          </Text>
        </View>

        {/* 캐릭터 구분 */}
        <View
          style={{
            backgroundColor: "rgb(38, 39, 39)",
            borderRadius: 16,
            padding: 16,
            marginBottom: 20,
          }}
        >
          <View style={{ gap: 7, marginBottom: 20 }}>
            <Text style={{ color: "rgb(229, 231, 235)", fontSize: 16 }}>
              제목
            </Text>
            <View>
              <TextInput
                value={title}
                onChangeText={(text) => setTitle(text)}
                maxLength={20}
                placeholder="제목을 입력해주세요."
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                style={{
                  color: "white",
                  paddingHorizontal: 7,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: "#ffffff0d",
                  borderRadius: 6,
                  backgroundColor: "#0000000d",
                }}
              />
              <Text
                style={{
                  position: "absolute",
                  color: "rgba(255, 255, 255, 0.5)",
                  right: 10,
                  top: "30%",
                }}
              >
                {title.length}/20
              </Text>
            </View>
          </View>
          <View style={{ gap: 7 }}>
            <Text style={{ color: "rgb(229, 231, 235)", fontSize: 16 }}>
              상세 설명
            </Text>
            <TextInput
              value={description}
              onChangeText={(text) => setDescription(text)}
              placeholder="상황, 관계, 세계관 등을 설명해주세요."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              multiline={true}
              style={{
                color: "white",
                paddingHorizontal: 7,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: "#ffffff0d",
                borderRadius: 6,
                height: 100,
                backgroundColor: "#0000000d",
              }}
            />
          </View>
        </View>

        {/* 캐릭터 설정 */}
        <View style={{ marginBottom: 10 }}>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
            캐릭터를 만들어 주세요
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "rgb(38, 39, 39)",
            borderRadius: 16,
            padding: 16,
            marginBottom: 10,
          }}
        >
          {/* 이미지 등록 */}
          <View>
            <View style={{ padding: 10, alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderStyle: "dashed",
                  borderColor: "rgb(103, 40, 255)",
                  borderRadius: 12,
                }}
                onPress={pickImage}
              >
                {character_image ? (
                  <Image
                    source={{ uri: character_image }}
                    style={{
                      width: 128,
                      height: 128,
                      borderRadius: 12,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: 128,
                      height: 128,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 50,
                        marginBottom: 10,
                      }}
                    >
                      +
                    </Text>
                    <Text style={{ color: "white" }}>캐릭터 이미지를</Text>
                    <Text style={{ color: "white" }}>추가해주세요</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          {/* 캐릭터 정보 */}
          <View style={{ gap: 7, marginBottom: 20 }}>
            <Text style={{ color: "rgb(229, 231, 235)", fontSize: 16 }}>
              이름
            </Text>
            <View>
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                maxLength={10}
                placeholder="짧은 이름이 부르기 편해요. ex.수현"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                style={{
                  color: "white",
                  paddingHorizontal: 7,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: "#ffffff0d",
                  borderRadius: 6,
                  backgroundColor: "#0000000d",
                }}
              />
              <Text
                style={{
                  position: "absolute",
                  color: "rgba(255, 255, 255, 0.5)",
                  right: 10,
                  top: "30%",
                }}
              >
                {name.length}/10
              </Text>
            </View>
          </View>
          <View style={{ gap: 7 }}>
            <Text style={{ color: "rgb(229, 231, 235)", fontSize: 16 }}>
              설명
            </Text>
            <TextInput
              value={character_info}
              onChangeText={(text) => setCharacterInfo(text)}
              placeholder={`캐릭터의 특징, 행동 감정 표현에 대해서 써주시면 개성있는 캐릭터를 만들 수 있어요\nex. 수현은 말이 험하고 온갖 비속어를 휘황찬란하게 사용한다`}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              multiline={true}
              style={{
                color: "white",
                paddingHorizontal: 7,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: "#ffffff0d",
                borderRadius: 6,
                height: 100,
                backgroundColor: "#0000000d",
              }}
            />
          </View>
        </View>
        {/* 경고 */}
        <View>
          <Text style={{ color: "#ffffff80" }}>
            ※ 저작권 침해 / 선정성 등 비윤리적인 캐릭터는 삭제될 수 있어요
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

export default Content;
