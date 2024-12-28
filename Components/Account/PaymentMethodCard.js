import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const PaymentMethodCard = ({ type, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.card} onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.iconContainer}>
          {type === "CLIQ" && (
            <Icon
              name="cash-outline"
              type="ionicon"
              size={30}
              color="#437689"
            />
          )}
          {type === "Bank" && (
            <Icon
              name="business-outline"
              type="ionicon"
              size={30}
              color="#437689"
            />
          )}
          {type === "Card" && (
            <Icon
              name="card-outline"
              type="ionicon"
              size={30}
              color="#437689"
            />
          )}
          {type === "Apple Pay" && (
            <Icon
              name="logo-apple"
              type="ionicon"
              size={30}
              color="#437689"
            />
          )}
        </View>
        <Text style={styles.title}>{type}</Text>
      </View>
      <Icon name="chevron-forward" type="ionicon" color="#777" size={22} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    width: "90%",
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "#eee",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default PaymentMethodCard;
