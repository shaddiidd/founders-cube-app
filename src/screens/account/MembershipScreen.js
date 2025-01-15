import {
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  View,
  RefreshControl,
} from "react-native";
import SubscriptionPlanCard from "../../components/account/SubscriptionPlanCard";
import { useContext, useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { get } from "../../utils/fetch";
import Context from "../../states/Context";
import PaymentListItem from "../../components/account/PaymentListItem";

export default function MembershipScreen() {
  const [payments, setPayments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { loading, setLoading, user, getUserData } = useContext(Context);

  const fetchPayments = () => {
    setRefreshing(true);
    get(`sales/user/${user.uid}`)
      .then((response) => {
        const updatedResponse = Object.keys(response).map((id) => ({
          id,
          ...response[id],
        }));
        setPayments(updatedResponse);
      })
      .then(() => getUserData())
      .catch(() => {
        Alert.alert(
          "Sorry",
          "There seems to be a problem. Please come back later."
        );
      })
      .finally(() => {
        setRefreshing(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchPayments();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPayments();
    }, [])
  );

  if (loading) return <View style={styles.container} />;
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchPayments} />
      }
    >
      <SubscriptionPlanCard
        payment={
          payments.find((payment) => payment.isActive) ||
          payments.sort((a, b) => b.created - a.created)[0]
        }
      />
      <Text style={styles.header}>Payment History</Text>
      {payments.length > 0 &&
        payments.map((payment) => (
          <PaymentListItem payment={payment} key={payment.id} />
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7F7",
    paddingTop: 10,
  },
  header: {
    width: "90%",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "left",
    marginTop: 20,
    marginBottom: 10,
  },
});
