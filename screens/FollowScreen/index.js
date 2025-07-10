import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

function FollowScreen({ route }) {
  const { followers_count, following_count, followings, followers, nickname } =
    route.params.user || {};
  const { type } = route.params;
  const navigation = useNavigation();
  const [category, setCategory] = useState(type);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-sharp" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{nickname}</Text>
        <View />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={
            category === "following"
              ? styles.activeCategory
              : styles.deactiveCategory
          }
          onPress={() => setCategory("following")}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              paddingVertical: 15,
            }}
          >
            {following_count} 팔로잉
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            category === "follower"
              ? styles.activeCategory
              : styles.deactiveCategory
          }
          onPress={() => setCategory("follower")}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              paddingVertical: 15,
            }}
          >
            {followers_count} 팔로워
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default FollowScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1a1b1b",
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomColor: "#ffffff0d",
    borderBottomWidth: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  activeCategory: {
    flex: 0.5,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(103, 40, 255)",
  },
  deactiveCategory: {
    flex: 0.5,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ffffff14",
  },
});
