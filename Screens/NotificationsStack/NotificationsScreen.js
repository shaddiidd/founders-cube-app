import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, RefreshControl } from "react-native";
import NotificationCard from "../../Components/Notifications/NotificationCard";
import { get } from "../../fetch";
import Context from "../../Context";
import { useNavigation } from "@react-navigation/native";

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const {loading, setLoading} = useContext(Context);
  const navigation = useNavigation();

  const fetchNotifications = () => {
    setRefreshing(true);
    get("notification")
      .then((response) => {
        setNotifications(response);
      })
      .catch(() => Alert.alert("Sorry!", "There seems to be a problem. Please come back later."))
      .finally(() => {
        setRefreshing(false);
        setLoading(false);
      });
  }
  useEffect(() => {
    setLoading(true);
    fetchNotifications();
  }, []);
  
  if (loading) return <View style={styles.container} />
  return (
    <ScrollView
      style={{ backgroundColor: "#F6F7F7" }}
      contentContainerStyle={[
        styles.container,
        { justifyContent: notifications?.length > 0 ? "flex-start" : "center" },
      ]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchNotifications} />
      }
    >
      <View style={styles.content}>
        {notifications?.length > 0 ? (
          notifications?.map((notification) => (
            <NotificationCard
              notification={notification}
              key={notification.created}
            />
          ))
        ) : (
          <Text style={styles.description}>You have no notifications yet.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    padding: 20,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default NotificationsScreen;
