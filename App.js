import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import SignUp from "./features/auth/screens/SignUpScreen";
import SignIn from "./features/auth/screens/SignIn";
import HomeScreen from "./features/home/screens";
import ChatList from "./features/chat/screens/ChatList";
import Chat from "./features/chat/screens/Chat";
import ChatHistoryList from "./features/chat/screens/ChatHistoryList";
import ChatHistoryDetail from "./features/chat/screens/ChatHistoryDetail";
import CharacterSearch from "./features/character/screens/CharacterSearch";
import CharacterDetail from "./features/character/screens/CharacterDetail";
import CreateCharacter from "./features/character/screens/CreateCharacter";
import Hashtag from "./features/character/screens/CreateCharacter/hashtag";
import AddSituation from "./features/character/screens/CreateCharacter/addSituation";
import MyPage from "./features/mypage/screens/MyPage";
import AccountInfo from "./features/mypage/screens/AccountInfo";
import Profile from "./features/mypage/screens/Profile";
import EditProfile from "./features/mypage/screens/EditProfile";
import CreateChatProfile from "./features/mypage/screens/CreateChatProfile";
import Follow from "./features/mypage/screens/Follow";
import MoreScreen from "./features/mypage/screens/moreScreen";
import KakaoLoginScreen from "./features/auth/screens/kakaoLoginScreen";

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
          <Stack.Screen name="SignUp" component={SignUp} />
          {/* 로그인 스크린 */}
          <Stack.Screen name="SignIn" component={SignIn} />
          {/* 홈 스크린 */}
          <Stack.Screen name="Home" component={HomeScreen} />
          {/* 채팅 목록 스크린 */}
          <Stack.Screen name="ChatList" component={ChatList} />
          {/* 채팅 스크린 */}
          <Stack.Screen name="Chat" component={Chat} />
          {/* 대화 내역 목록 스크린 */}
          <Stack.Screen name="ChatHistoryList" component={ChatHistoryList} />
          {/* 대화 내역 상세 스크린 */}
          <Stack.Screen
            name="ChatHistoryDetail"
            component={ChatHistoryDetail}
          />
          {/* 캐릭터 검색 스크린 */}
          <Stack.Screen name="CharacterSearch" component={CharacterSearch} />
          {/* 캐릭터 상세 스크린 */}
          <Stack.Screen name="CharacterDetail" component={CharacterDetail} />
          {/* 캐릭터 제작 페이지 */}
          <Stack.Screen name="CreateCharacter" component={CreateCharacter} />
          {/* 캐릭터 제작 - 해시태그 페이지 */}
          <Stack.Screen name="Hashtag" component={Hashtag} />
          {/* 캐릭터 제작 - 상황 예시 추가 페이지 */}
          <Stack.Screen name="AddSituation" component={AddSituation} />
          {/* 마이페이지 스크린 */}
          <Stack.Screen name="Mypage" component={MyPage} />
          {/* 더보기 스크린 */}
          <Stack.Screen name="More" component={MoreScreen} />
          {/* 계정정보 스크린 */}
          <Stack.Screen name="AccountInfo" component={AccountInfo} />
          {/* 프로필 스크린 */}
          <Stack.Screen name="Profile" component={Profile} />
          {/* 프로필 편집 스크린 */}
          <Stack.Screen name="EditProfile" component={EditProfile} />
          {/* 대화 프로필  */}
          <Stack.Screen name="ChatProfile" component={CreateChatProfile} />
          {/* 팔로우 스크린 */}
          <Stack.Screen name="Follow" component={Follow} />
          {/* 카카오 로그인 */}
          <Stack.Screen name="KakaoLogin" component={KakaoLoginScreen} />
        </Stack.Navigator>
        <StatusBar style="light" backgroundColor="#1a1b1b" />
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
}
