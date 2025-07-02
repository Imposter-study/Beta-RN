import axios from "axios";
import { API_URL } from "../config";
import * as SecureStore from "expo-secure-store";

const roomAPI = axios.create({
  baseURL: API_URL + "rooms/",
  timeout: 10000,
});

// 요청 인터셉터
roomAPI.interceptors.request.use(
  async (config) => {
    const access = await SecureStore.getItemAsync("access");
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
roomAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // access 토큰 만료로 인한 401 오류일 경우
    if (
      error.response?.status === 401 &&
      !originalRequest._retry // 무한 루프 방지
    ) {
      originalRequest._retry = true;

      try {
        const refresh = await SecureStore.getItemAsync("refresh");

        const res = await axios.post(API_URL + "accounts/token/refresh/", {
          refresh,
        });

        const { access, refresh: newRefresh } = res.data;

        await SecureStore.setItemAsync("access", access);
        await SecureStore.setItemAsync("refresh", newRefresh);

        // 새로운 access 토큰으로 헤더 다시 설정
        originalRequest.headers.Authorization = `Bearer ${access}`;

        // 원래 요청 재시도
        return roomAPI(originalRequest);
      } catch (refreshError) {
        console.error("토큰 재발급 실패", refreshError);
        await SecureStore.deleteItemAsync("access");
        await SecureStore.deleteItemAsync("refresh");
        return Promise.reject(refreshError);
      }
    }

    // 기타 에러는 그대로 전달
    return Promise.reject(error);
  }
);

export default roomAPI;
