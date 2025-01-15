import { Image, View, Text, StyleSheet } from "react-native";

export default function NoNetworkScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/cube-whitebg.png")}
        style={styles.cube}
      />
      <Text style={styles.title}>No Network Connection</Text>
      <Text style={styles.subtitle}>Make sure youre connected to the internet and try again.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F7F7",
  },
  cube: {
    width: 120,
    height: 70,
    resizeMode: "contain",
    marginBottom: 10
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    width: "90%",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    width: "80%"
  }
});
