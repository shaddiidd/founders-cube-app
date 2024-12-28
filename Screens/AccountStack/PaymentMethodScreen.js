import React, { useContext } from "react";
import { View, Alert, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PaymentMethodCard from "../../Components/Account/PaymentMethodCard";
import Purchases from "react-native-purchases";
import Context from "../../Context";
import { post } from "../../fetch";

const PaymentMethodScreen = ({ route }) => {
  const navigation = useNavigation();
  const { pack } = route.params;
  const { user, setLoading } = useContext(Context);

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
      navigation.pop(2);
      Alert.alert("Transaction successful", `You have been subscribed to the ${pack.name} Membership`);
    } catch (error) {
      Alert.alert("Transaction failed", error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <PaymentMethodCard type="CLIQ" onPress={() => navigation.navigate("PaymentScreen", { pack, type: "CLIQ" })} />
      <PaymentMethodCard type="Bank" onPress={() => navigation.navigate("PaymentScreen", { pack, type: "Bank" })} />
      {Platform.OS === "ios" && <PaymentMethodCard type="Apple Pay" onPress={handleApplePayment} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F6F7F7",
    flex: 1,
    paddingTop: 10,
  },
});

export default PaymentMethodScreen;
