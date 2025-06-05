import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import HomeScreen from "./screens/homeScreen";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

function Root() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <HomeScreen />
      <StatusBar style="light" backgroundColor="#1a1b1b" translucent={false} />
    </View>
  );
}
export default function App() {
  return (
    <SafeAreaProvider>
      <Root />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1b1b",
    alignItems: "center",
  },
});
