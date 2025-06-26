// KakaoLoginScreen.js
import React, { useRef, useState } from "react";
import { WebView } from "react-native-webview";
import { KAKAO_CLIENT_ID, REDIRECT_URI, BACKEND_LOGIN_URL } from "../config";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function KakaoLoginScreen() {
  const navigation = useNavigation();
  const webviewRef = useRef(null);

  const authUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}`;

  const handleNavChange = async (navState) => {
    const { url } = navState;
    // console.log(url);

    try {
      const parsedUrl = new URL(url);
      const code = parsedUrl.searchParams.get("code");

      if (code) {
        console.log("인증 코드:", code);

        const data = {
          grant_type: "authorization_code",
          client_id: KAKAO_CLIENT_ID,
          redirect_uri: REDIRECT_URI,
          code: code,
        };
        axios
          .post("https://kauth.kakao.com/oauth/token", data, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
          .then((response) => {
            console.log("카카오 발급 인증코드", response.data);
            const { access_token } = response.data;
            axios.post(BACKEND_LOGIN_URL, { access_token }).then((response) => {
              console.log(response.data);
              console.log("카카오 로그인 성공");
              navigation.replace("Home");
            });
          })
          .catch((error) => console.log(error.response));
      }
    } catch (error) {
      console.error("URL 파싱 실패:", error);
    }
  };

  return (
    <WebView
      ref={webviewRef}
      source={{ uri: authUrl }}
      onNavigationStateChange={handleNavChange}
      startInLoadingState
      javaScriptEnabled
    />
  );
}
