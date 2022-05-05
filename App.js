import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Image,
  Platform,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import HomeScreen from "./Screens/HomeScreen";
import ImageDisplay from "./components/ImageDisplay";

import { NavigationContainer } from "@react-navigation/native";

import "react-native-gesture-handler";

import Constants from "expo-constants";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ImageDisplay"
          component={ImageDisplay}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      {/* <Button
          title="Load user"
          onPress={changeUserIdHandler}
          disabled={isLoading}
          style={styles.buttonStyles}
        /> */}
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  containerFlat: {},
  separator: {
    width: "100%",
    backgroundColor: "black",
    height: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "dodgerblue",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapperStyle: {
    minHeight: 128,
  },
  buttonStyles: {
    padding: 100,
  },
});
