import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import Context from "../../states/Context";
import { get } from "../../utils/fetch";
import { useNavigation } from "@react-navigation/native";

export default function PaymentDetailsScreen({ route }) {
  const { id } = route.params;
  const { loading, setLoading } = useContext(Context);
  const [payment, setPayment] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    get(`sales/${id}`)
      .then((response) => {
        setPayment(response);
      })
      .catch(() => {
        Alert.alert("Sorry", "There seems to be a problem. Please come back later.");
      })
      .finally(() => setLoading(false));
  }, [id]);
  if (!Object.keys(payment).length) return <View style={styles.container}/>

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={{ flex: 1 }}>
          <Text style={styles.price}>JD {payment?.total}</Text>
          <Text style={styles.mainDetails}>
            {payment?.package?.name}{payment?.package?.name.toLowerCase() !== "exclusive reward" && " plan fees"}
          </Text>
          <Text style={styles.mainDetails}>{payment?.created}</Text>
        </View>
        <View style={styles.listIconContainer}>
          {payment?.method?.toLowerCase() === "cliq" && (
            <Icon
              name="cash-outline"
              type="ionicon"
              size={35}
              color="#437689"
            />
          )}
          {payment?.method?.toLowerCase() === "bank" && (
            <Icon
              name="business-outline"
              type="ionicon"
              size={35}
              color="#437689"
            />
          )}
          {payment?.method?.toLowerCase() === "card" && (
            <Icon
              name="card-outline"
              type="ionicon"
              size={35}
              color="#437689"
            />
          )}
          {payment?.method?.toLowerCase() === "gift" && (
            <Icon
              name="gift-outline"
              type="ionicon"
              size={35}
              color="#437689"
            />
          )}
          {payment?.method?.toLowerCase() === "apple" && (
            <Icon
              name="logo-apple"
              type="ionicon"
              size={35}
              color="#437689"
            />
          )}
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.cardRow}>
            <Text style={{ color: "#666" }}>Transaction ID</Text>
            <Text style={styles.value} selectable>{id}</Text>
        </View>
        <View style={styles.cardRow}>
            <Text style={{ color: "#666" }}>Duration</Text>
            <Text style={styles.value} selectable>{payment?.package?.duration} Month{payment?.package?.duration > 1 && "s"}</Text>
        </View>
        <View style={styles.cardRow}>
            <Text style={{ color: "#666" }}>Payment method</Text>
            <Text style={styles.value} selectable>{payment?.method?.toUpperCase()}</Text>
        </View>
        <View style={styles.cardRow}>
            <Text style={{ color: "#666" }}>Status</Text>
            <Text style={styles.value} selectable>{payment?.status?.charAt(0).toUpperCase() + payment?.status?.slice(1).toLowerCase()}</Text>
        </View>
        {payment.reviewedAt ? <View style={styles.cardRow}>
            <Text style={{ color: "#666" }}>Review date</Text>
            <Text style={styles.value} selectable>{payment.reviewedAt}</Text>
        </View> : <></>}
        {payment.startDate ? <View style={styles.cardRow}>
            <Text style={{ color: "#666" }}>Start date</Text>
            <Text style={styles.value} selectable>{payment.startDate}</Text>
        </View> : <></>}
        {payment.expiryDate ? <View style={styles.cardRow}>
            <Text style={{ color: "#666" }}>End date</Text>
            <Text style={styles.value} selectable>{payment.expiryDate}</Text>
        </View> : <></>}
      </View>
      {payment?.preview?.imageUrl && <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => navigation.navigate("ViewImageScreen", { imageUrl: payment?.preview?.imageUrl })}>
        <Icon name="image" color="white" />
        <Text style={styles.btnText}>  View Screenshot</Text>
      </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F6F7F7",
    flex: 1,
    paddingTop: 10
  },
  main: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    width: "90%",
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 10,
  },
  mainDetails: {
    color: "#666",
    marginBottom: 2,
  },
  listIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#eee",
  },
  card: {
    backgroundColor: "white",
    width: "90%",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 10,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10
  },
  value: {
    fontWeight: "500",
    maxWidth: "50%",
    textAlign: "right"
  },
  btn: {
    borderRadius: 10,
    width: "90%",
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    marginTop: 20
  },
  btnText: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
  },
});
