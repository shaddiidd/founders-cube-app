import { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Provider from "./Provider";
import Container from "./Container";
import NetInfo from "@react-native-community/netinfo";
import NoNetworkScreen from "./NoNetworkScreen";
import { ActivityIndicator, View, StyleSheet, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { linking } from "./linking";

export default function App() {
  const [isConnected, setIsConnected] = useState(null);
  const [hasNotificationPermission, setHasNotificationPermission] =
    useState(false);

  const requestNotificationPermissions = async () => {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        setHasNotificationPermission(status === "granted");

        if (status === "granted") {
        } else {
          Alert.alert(
            "Permission Required",
            "Please enable notifications to stay updated."
          );
        }
      } else {
        setHasNotificationPermission(true);
      }
    } catch (error) {
      console.error("Error requesting notification permissions:", error);
    }
  };

  useEffect(() => {
    requestNotificationPermissions();

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isConnected === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isConnected) {
    return <NoNetworkScreen />;
  }

  return (
    <NavigationContainer>
      <Provider>
        <Container />
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});