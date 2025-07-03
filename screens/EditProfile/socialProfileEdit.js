import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { DOMAIN } from "../../config";

function SocialEdit({
  nickname: originalNiokname,
  username: originalUsername,
  profile_picture,
  introduce,
  onChange,
}) {
  const [nickname, setNickname] = useState(originalNiokname);
  const [username, setUsername] = useState(originalUsername);
  const [intro, setIntro] = useState(introduce);
  const [profileImage, setProfileImage] = useState(
    profile_picture !== null ? `http://${DOMAIN}` + profile_picture : null
  );
  const [focused, setFocused] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange({ nickname, username, intro, profileImage });
    }
  }, [nickname, username, intro, profileImage]);

  return (
    <ScrollView
      style={styles.formContainer}
      keyboardShouldPersistTaps="handled" // 스크롤 영역 터치 시 키보드 닫힘
    >
      {/* 프로필 */}
      <>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={pickImage}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={{ width: 70, height: 70, borderRadius: 100 }}
              />
            ) : (
              <FontAwesome name="user-circle-o" size={70} color="gray" />
            )}
            <FontAwesome
              name="pencil"
              size={12}
              color="white"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "rgb(103 40 255)",
                padding: 5,
                borderRadius: 100,
              }}
            />
          </TouchableOpacity>
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileNickname}>{nickname}</Text>
            <Text style={styles.profileUsername}>@{username}</Text>
          </View>
        </View>

        {/* 입력 내용 */}
        <View style={styles.inputGroup}>
          {/* 닉네임 입력 */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>닉네임</Text>
            <TextInput
              placeholder="닉네임"
              placeholderTextColor="rgba(225, 225,225, 0.5)"
              value={nickname}
              onChangeText={(text) => setNickname(text)}
              onFocus={() => setFocused("nickname")}
              onBlur={() => setFocused("")}
              style={[
                styles.input,
                focused === "nickname" && styles.inputFocused,
              ]}
            />
          </View>

          {/* 아이디 입력 */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>아이디</Text>
            <TextInput
              placeholder="아이디"
              placeholderTextColor="rgba(225, 225,225, 0.5)"
              value={username}
              onChangeText={(text) => setUsername(text)}
              onFocus={() => setFocused("username")}
              onBlur={() => setFocused("")}
              style={[
                styles.input,
                focused === "username" && styles.inputFocused,
              ]}
            />
          </View>

          {/* 소개 입력 */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>소개</Text>
            <TextInput
              placeholder="소개를 입력해주세요"
              placeholderTextColor="rgba(225, 225,225, 0.5)"
              multiline={true}
              value={intro}
              onChangeText={(text) => setIntro(text)}
              onFocus={() => setFocused("intro")}
              onBlur={() => setFocused("")}
              style={[
                [styles.input, styles.introInput],
                focused === "intro" && styles.inputFocused,
              ]}
            />
          </View>
        </View>
      </>
    </ScrollView>
  );
}

export default SocialEdit;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  profileContainer: {
    flexDirection: "row",
    marginVertical: 15,
    alignItems: "center",
    gap: 10,
  },
  profileTextContainer: {
    gap: 5,
  },
  profileNickname: {
    color: "white",
    fontSize: 24,
  },
  profileUsername: {
    color: "#ffffff80",
    fontSize: 16,
  },
  inputGroup: {
    marginBottom: 30,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  inputLabel: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "rgb(45,45,45)",
    padding: 10,
    marginVertical: 10,
    borderRadius: 6,
    borderWidth: 0.3,
    borderColor: "rgba(225, 225,225, 0.3)",
    fontSize: 16,
    color: "white",
  },
  introInput: {
    height: 90,
  },
  inputFocused: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "rgb(103, 40, 225)",
  },
});
