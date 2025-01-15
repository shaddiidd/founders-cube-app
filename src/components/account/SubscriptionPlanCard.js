import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import Context from "../../states/Context";

export default function SubscriptionPlanCard({ payment }) {
  const navigation = useNavigation();
  const { user } = useContext(Context);

  const isExpiryLessThan30DaysAway = () => {
    if (!user?.expiry) return true;
    const currentDate = new Date();
    const expiryDate = new Date(user.expiry);

    const thirtyDaysFromNow = new Date(currentDate);
    thirtyDaysFromNow.setDate(currentDate.getDate() + 30);

    return expiryDate < thirtyDaysFromNow;
  };

  return (
    <LinearGradient
      colors={["#5E96AB", "#3E6471", "#253C44"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.card}
    >
      {payment ? (
        <Text style={styles.cardTitle}>{payment?.package?.name}{payment.package.name.toLowerCase() !== "exclusive reward" && " Plan"}</Text>
      ) : (
        <Text style={styles.cardTitle}>No Active Plan</Text>
      )}
      {payment?.expiryDate && (
        <Text style={{ color: "white" }}>End date: {payment?.expiryDate}</Text>
      )}
      {payment?.status.toLowerCase() === "pending" &&(
        <Text style={{ color: "white" }}>Your last payment is being reviewed</Text>
      )}
      {isExpiryLessThan30DaysAway() &&
        payment?.status?.toLowerCase() !== "pending" && (
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("MembershipPlansScreen")}
          >
            <Text style={{ fontWeight: "500" }}>{user?.expiry ? "Extend Membership" : "Become a Member"}</Text>
          </TouchableOpacity>
        )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    borderRadius: 10,
    overflow: "hidden",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  btnContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: 270,
    justifyContent: "space-between",
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
});
