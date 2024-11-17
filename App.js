import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Provider from "./Provider";
import Container from "./Container";
import NetInfo from "@react-native-community/netinfo";
import NoNetworkScreen from "./NoNetworkScreen";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { linking } from "./linking";
// import messaging from "@react-native-firebase/messaging";

export default function App() {
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
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
    <NavigationContainer linking={linking}>
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
