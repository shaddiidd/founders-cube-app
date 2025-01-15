import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";

export default function PlansOverviewCardWide({ pack = {} }) {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["#5E96AB", "#3E6471", "#253C44"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.card}
    >
      <View style={styles.firstRow}>
        <View>
          <Text style={styles.name}>
            {pack.name} Plan{" "}
            {pack.isFavourite && (
              <Icon name="star" type="ionicon" color="gold" size={20} />
            )}
          </Text>
          <Text style={styles.price}>JD {pack.price}</Text>
        </View>
        <Text style={styles.length}>{pack.duration} Months</Text>
      </View>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("PaymentMethodScreen", { pack })}
      >
        <Text style={styles.btnText}>Overview</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(35, 119, 149, 0.3)",
    width: "90%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 10
  },
  firstRow: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    color: "white",
    fontWeight: "600",
    fontSize: 22,
  },
  price: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "left",
  },
  length: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    textAlign: "right",
    marginTop: 15,
  },
  perMonth: {
    color: "#3eaad2",
    fontWeight: "500",
    textAlign: "center",
  },
  sep: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
  bullet: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bulletTxt: {
    maxWidth: "90%",
    paddingLeft: 10,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "white",
    borderRadius: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 15,
  },
  btnText: {
    color: "#000",
    fontWeight: "500",
  },
  starContainer: {
    backgroundColor: "#F6F7F7",
    padding: 5,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    position: "absolute",
    top: 0,
    right: 20,
  },
});
