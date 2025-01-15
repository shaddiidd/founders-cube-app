import { View, StyleSheet, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PaymentMethodCard from "../../components/account/PaymentMethodCard";

const PaymentMethodScreen = ({ route }) => {
  const navigation = useNavigation();
  const { pack } = route.params;
  
  return (
    <View style={styles.container}>
      <PaymentMethodCard type="CLIQ" onPress={() => navigation.navigate("PaymentScreen", { pack, type: "CLIQ" })} />
      <PaymentMethodCard type="Bank" onPress={() => navigation.navigate("PaymentScreen", { pack, type: "Bank" })} />
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
