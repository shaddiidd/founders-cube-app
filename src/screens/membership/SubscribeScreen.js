import { useState, useContext } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import Context from "../../states/Context";

export default function SubscribeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { authCheck } = useContext(Context);
  const openWeb = () => {
    Linking.openURL("https://community.thefounderscube.com");
  };
  return (
    <ScrollView
      style={{ backgroundColor: "#F6F7F7" }}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={authCheck} />
      }
    >
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>
        Visit our website to complete your membership details.
      </Text>
      <TouchableOpacity
        onPress={openWeb}
        activeOpacity={0.7}
        style={styles.btn}
      >
        <Text style={styles.btnTxt}>Founders Cube Web</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
    width: "90%",
    textAlign: "center",
  },
  btn: {
    marginTop: 30,
    backgroundColor: "black",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
