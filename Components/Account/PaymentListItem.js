import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

export default function PaymentListItem({ payment }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.listItem}
      activeOpacity={0.7}
      onPress={() => navigation.navigate("PaymentDetails", { id: payment.id })}
    >
      <View
        style={[
          styles.listIconContainer,
          {
            backgroundColor:
              payment?.status === "pending"
                ? "#ffd32c"
                : payment?.status === "rejected"
                ? "#FF0000cc"
                : "#eee",
          },
        ]}
      >
        {payment.method.toLowerCase() === "cliq" && (
          <Icon name="cash-outline" type="ionicon" size={30} color={payment?.status === "approved" ? "#437689" : "white"} />
        )}
        {payment.method.toLowerCase() === "bank" && (
          <Icon
            name="business-outline"
            type="ionicon"
            size={30}
            color={payment?.status === "approved" ? "#437689" : "white"}
          />
        )}
        {payment.method.toLowerCase() === "card" && (
          <Icon name="card-outline" type="ionicon" size={30} color={payment?.status === "approved" ? "#437689" : "white"} />
        )}
        {payment.method.toLowerCase() === "gift" && (
          <Icon name="gift-outline" type="ionicon" size={30} color="#437689" />
        )}
      </View>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemDate}>{payment.created}</Text>
        <Text style={styles.listItemDescription} numberOfLines={1}>
          {payment.package.name}{" "}
          {payment.package.name.toLowerCase() !== "exclusive reward" && "Plan"}{" "}
          ({payment?.package?.duration} month
          {payment?.package?.duration > 1 && "s"})
        </Text>
      </View>
      <Text style={styles.listItemPrice}>JD {payment.total}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 25,
  },
  listIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#eee",
  },
  listItemDate: {
    fontSize: 14,
  },
  listItemDescription: {
    width: "95%",
    fontSize: 17,
    fontWeight: "500",
  },
  listItemContent: {
    flex: 1,
  },
  listItemType: {
    width: "95%",
    marginTop: 10,
    marginBottom: 20,
  },
  listItemPrice: {
    fontSize: 18,
    fontWeight: "500",
  },
});
