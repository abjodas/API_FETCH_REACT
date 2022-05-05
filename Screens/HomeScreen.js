import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  ActivityIndicator,
  Image,
  Platform,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import LottieAnimations from "../components/LottieAnimations";
import { useNetInfo } from "@react-native-community/netinfo";

export default function HomeScreen() {
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const [buttonPressed, setButtonStatus] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const [errorType, setErrorType] = useState("");
  const [internetStatus, setInternetStatus] = useState(false);
  useEffect(() => {
    const source = axios.CancelToken.source();
    const url = `https://dog.ceo/api/breeds/image/random`;
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url, { cancelToken: source.token });
        if (response.status === 200) {
          setTodos(response.data);
          setIsLoading(false);
          return;
        } else {
          setErrorType("Failed To Fetch Users");
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          setErrorType("Data detching cancelled");
          console.log("Data fetching cancelled");
        } else {
          setErrorFlag(true);
          setIsLoading(false);
        }
      }
    };
    fetchUsers();
    return () => source.cancel("Data fetching cancelled");
  }, [buttonPressed]);
  useEffect(() => {
    setInternetStatus(netInfo.isConnected);
    console.log(internetStatus);
  });

  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <View>
        {isLoading && <ActivityIndicator size="large" color="black" />}
        {!internetStatus && <Text>Please Connect To The Internet</Text>}
        {!isLoading && hasError && <Text>{errorType}</Text>}
      </View>
      {internetStatus && (
        <View>
          <LottieAnimations />
          <View>
            <Button
              title="Load image"
              onPress={() => {
                setButtonStatus(buttonPressed === true ? false : true);
                return navigation.navigate("ImageDisplay", { todos: todos });
              }}
              disabled={isLoading}
              style={styles.buttonStyles}
            />
          </View>
        </View>
      )}
    </View>
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
