import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CommunityCard = ({ icon, name, color, to }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.container, to === "" && styles.inactive]}
      onPress={() => to && navigation.navigate(to, { special: name === "Special Members" })}
      disabled={to === ""}
      activeOpacity={0.7}
    >
      <Image style={styles.icon} source={icon} />
      <Text style={[styles.name, { color }]}>{name}</Text>
      {to === "" && <Text style={styles.soon}>SOON</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 10,
    width: "90%",
    height: 120,
    marginBottom: 20,
    position: "relative",
    backgroundColor: "white"
  },
  inactive: {
    userSelect: "none",
    cursor: "default",
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  soon: {
    margin: 0,
    fontWeight: "bold",
    color: "#7dbcd9",
    position: "absolute",
    top: 10,
    right: 10,
  },
  icon: {
    height: 50,
    resizeMode: "contain",
    marginBottom: 5
  },
});

export default CommunityCard;
