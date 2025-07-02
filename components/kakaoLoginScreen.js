import React, { useRef, useState } from "react";
import { WebView } from "react-native-webview";
import { KAKAO_CLIENT_ID, REDIRECT_URI, BACKEND_LOGIN_URL } from "../config";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import qs from "qs";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { useSocialSignupStroe } from "../stores/useSignupStore";

export default function KakaoLoginScreen() {
  const navigation = useNavigation();
  const webviewRef = useRef(null);
  const [webviewKey, setWebviewKey] = useState(0);
  const [usedCode, setUsedCode] = useState(null); // 중복 요청 방지
  const { setNickname, setAccess, setRefresh } = useSocialSignupStroe();

  const authUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&prompt=login`;

  const handleNavChange = async (navState) => {
    const { url } = navState;

    try {
      const parsedUrl = new URL(url);
      const code = parsedUrl.searchParams.get("code");

      if (code && code !== usedCode) {
        setUsedCode(code); // 재사용 방지

        const tokenRes = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          qs.stringify({
            grant_type: "authorization_code",
            client_id: KAKAO_CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            code,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const { access_token } = tokenRes.data;

        const loginRes = await axios.post(BACKEND_LOGIN_URL, { access_token });
        console.log("백엔드 응답:", loginRes.data);

        const { is_signup } = loginRes.data; // 소셜로그인으로 회원가입이 완료된 유저인지 확인
        if (is_signup) {
          const { access, refresh, nickname } = loginRes.data;
          // 토큰을 저장
          await SecureStore.setItemAsync("access", access);
          await SecureStore.setItemAsync("refresh", refresh);
          await SecureStore.setItemAsync("nickname", nickname);
          // 로그인 성공 시 홈으로 이동
          navigation.replace("Home");
        } else {
          const { kakao_id, nickname, access, refresh } = loginRes.data;
          setNickname(nickname);
          setAccess(access);
          setRefresh(refresh);
          navigation.navigate("SignUp", {
            screen: "SignUpStep2",
          });
        }
      }
    } catch (error) {
      console.error("로그인 에러:", error?.response?.data || error.message);
      // WebView를 새로고침하여 로그인 재시도 유도
      setWebviewKey((prev) => prev + 1);
      setUsedCode(null);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        key={webviewKey}
        ref={webviewRef}
        source={{ uri: authUrl }}
        onNavigationStateChange={handleNavChange}
        startInLoadingState
        javaScriptEnabled
      />
    </SafeAreaView>
  );
}
