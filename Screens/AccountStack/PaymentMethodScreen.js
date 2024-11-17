import React, { useState, useEffect, useContext } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PaymentMethodCard from "../../Components/Account/PaymentMethodCard";

const PaymentMethodScreen = ({ route }) => {
  const navigation = useNavigation();
  const { pack } = route.params;

  return (
    <View style={styles.container}>
      <PaymentMethodCard type="CLIQ" onPress={() => navigation.navigate("PaymentScreen", { pack, type: "CLIQ" })} />
      <PaymentMethodCard type="Bank" onPress={() => navigation.navigate("PaymentScreen", { pack, type: "Bank" })} />
      {/* <PaymentMethodCard type="Card" onPress={() => navigation.navigate("PaymentScreen", { pack, type: "Card" })} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F6F7F7",
    flex: 1,
    paddingTop: 10
  },
});

export default PaymentMethodScreen;