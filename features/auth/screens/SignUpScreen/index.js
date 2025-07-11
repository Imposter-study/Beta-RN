import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpStep1 from "./signUpStep1";
import SignUpStep2 from "./signUpStep2";
import SignUpStep3 from "./signUpStep3";

const Stack = createNativeStackNavigator();

function SignUp() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* 회원가입 1 : 아이디 및 패스워드 입력 */}
        <Stack.Screen name="SignUpStep1" component={SignUpStep1} />
        {/* 회원가입 2 : 닉네임 입력 */}
        <Stack.Screen name="SignUpStep2" component={SignUpStep2} />
        {/* 회원가입 3 : 나이(생년월일) 및 성별 입력 */}
        <Stack.Screen name="SignUpStep3" component={SignUpStep3} />
      </Stack.Navigator>
  );
}

export default SignUp;
