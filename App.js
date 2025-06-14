import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen/index";
import ChatListScreen from "./screens/chatListScreen";
import CharacterDetailScreen from "./screens/characterDetailScreen";
import MyPageScreen from "./screens/myPageScreen";
import SignUpScreen from "./screens/SignUpScreen/index";
import SignInScreen from "./screens/signInScreen";
import EditProfile from "./screens/editProfile";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >
          {/* 회원가입 스크린*/}
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          {/* 로그인 스크린 */}
          <Stack.Screen name="SignIn" component={SignInScreen} />
          {/* 홈 스크린 */}
          <Stack.Screen name="Home" component={HomeScreen} />
          {/* 채팅 목록 스크린 */}
          <Stack.Screen name="ChatList" component={ChatListScreen} />
          {/* 캐릭터 상세 스크린 */}
          <Stack.Screen
            name="CharacterDetail"
            component={CharacterDetailScreen}
          />
          {/* 마이페이지 스크린 */}
          <Stack.Screen name="Mypage" component={MyPageScreen} />
          {/* 프로필 편집 스크린 */}
          <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
        <StatusBar style="light" backgroundColor="#1a1b1b" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
