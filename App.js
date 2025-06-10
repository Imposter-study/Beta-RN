import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen/index";
import ChatListScreen from "./screens/chatListScreen";
import CharacterDetailScreen from "./screens/characterDetailScreen";
import MyPageScreen from "./screens/myPageScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ChatList" component={ChatListScreen} />
          <Stack.Screen
            name="CharacterDetail"
            component={CharacterDetailScreen}
          />
          <Stack.Screen name="Mypage" component={MyPageScreen} />
        </Stack.Navigator>
        <StatusBar style="light" backgroundColor="#1a1b1b" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
