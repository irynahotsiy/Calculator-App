import * as Font from "expo-font";
import { Platform } from "react-native";

export function fetchFonts() {
  if (Platform.OS === "ios" || Platform.OS === "android") {
    return Expo.Font.loadAsync({
      "linotte-reg": require("../assets/fonts/Linotte-Regular.ttf"),
    });
  } else {
    return Font.loadAsync({
      "linotte-reg": require("../assets/fonts/Linotte-Regular.ttf"),
    });
  }
}
