import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

export default function LottieAnimations() {
  return (
    <View style={{ width: 500, height: 500 }}>
      <LottieView source={require("../assets/doggy.json")} autoPlay loop />
    </View>
  );
}
