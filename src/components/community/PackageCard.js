import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import goldenStar from "../../assets/Community/golden-star.png";

const PackageCard = ({ id, title, price, months, star }) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.content}>
          <View style={styles.detailsContainer}>
            <Text style={styles.details}>{price} JD</Text>
            <Text style={styles.details}>{months} Months</Text>
          </View>
          {star ? <Image style={styles.star} source={goldenStar} /> : null}
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.editButton}
        onPress={() => navigation.navigate("ModifyPackages", { id })}
      >
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#437689",
    backgroundColor: "white",
    width: "90%"
  },
  card: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  detailsContainer: {
    flexDirection: "column",
  },
  details: {
    fontSize: 16,
    color: "#666",
  },
  star: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  editButton: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#437689",
    alignItems: "center",
  },
  editText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PackageCard;
