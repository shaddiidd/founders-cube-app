import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import Context from "../../Context";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const { loading } = useContext(Context);

  if (loading) return <View style={styles.container} />
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/welcome.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Image
        source={require("../../assets/cube-whitebg.png")}
        style={styles.cube}
        resizeMode="contain"
      />
      <TouchableOpacity activeOpacity={0.7} style={styles.btn} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.btnTxt}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={styles.btnOutline} onPress={() => navigation.navigate("Apply")}>
        <Text style={styles.btnOutlineTxt}>Apply Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");
const aspectRatio = 785 / 728;
const height = width * aspectRatio;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F8FC",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  image: {
    width,
    height,
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 80,
  },
  cube: {
    width: 120,
    height: 55,
    marginTop: 20,
    marginBottom: 10,
  },
  btn: {
    width: "90%",
    height: 55,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "rgb(36, 118, 149)",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  btnOutline: {
    width: "90%",
    height: 55,
    marginTop: 10,
    borderRadius: 10,
    borderColor: "rgb(36, 118, 149)",
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  btnOutlineTxt: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgb(36, 118, 149)",
  },
});

export default WelcomeScreen;
