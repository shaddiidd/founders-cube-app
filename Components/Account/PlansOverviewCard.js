import { useContext } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform
} from "react-native";
import { Icon } from "react-native-elements";
import Context from "../../Context";
import { post } from "../../fetch";
import Purchases from "react-native-purchases";
import { useNavigation } from "@react-navigation/native";

export default function PlansOverviewCard({ onPress, pack = {} }) {
  const { user, setLoading } = useContext(Context);
  const navigation = useNavigation();

  const handleAndroidPayment = () => navigation.navigate("PaymentMethodScreen", { pack });
  const handleApplePayment = async () => {
    setLoading(true);
    try {
      Purchases.configure({ apiKey: "appl_kguhLcJJUzoHonbGWcUPFuCSmXg" });
      const products = await Purchases.getProducts([pack.productId]);
      if (!products.length) {
        console.error("No products found");
        return;
      }
      await Purchases.purchaseProduct(pack.productId);
      await post("sales/createAppleOrder", { userId: user.uid, productId: pack.productId });
      navigation.pop();
      Alert.alert("Transaction successful", `You have been subscribed to the ${pack.name} Membership`);
    } catch (error) {
      Alert.alert("Transaction failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8, marginBottom: 15 }}>
        {pack.isFavourite ? <Icon name="star" color="gold" /> : <></>}
        <Text style={styles.name}> {pack.name || ""}</Text>
      </View>
      <View style={[styles.card, styles.scrollContent]}>
        <View style={{ width: "100%" }}>
          <Text style={styles.price}>${pack.appStorePrice || ""}</Text>
          <Text style={styles.length}>{pack.duration || ""} Months</Text>
          <View style={styles.sep} />
          {pack.features?.map((bullet) => (
            <View style={styles.bullet} key={bullet}>
              <Icon name="checkmark" type="ionicon" size={15} color="#237695" />
              <Text style={styles.bulletTxt}>{bullet}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={handleApplePayment}>
          <Text style={styles.btnText}>Go {pack.name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "black",
    width: "95%",
    // height: "100%",
    padding: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 15,
    alignItems: "center",
  },
  name: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  card: {
    backgroundColor: "white",
    width: "100%",
    flex: 1,
    padding: 15,
    borderRadius: 10,
  },
  scrollContent: {
    // flex: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    textAlign: "center",
    color: "#237695",
    fontWeight: "bold",
    fontSize: 30,
  },
  length: {
    textAlign: "center",
    color: "#666",
    fontWeight: "500",
    fontSize: 16
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
    fontSize: 16
  },
  btn: {
    borderRadius: 10,
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: "#000"
  },
  btnText: {
    color: "#000",
    fontWeight: "500",
    fontSize: 15,
  },
});
