import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import NotificationCard from "../../Components/Notifications/NotificationCard";
import { get, post } from "../../fetch";
import Context from "../../Context";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { loading, setLoading } = useContext(Context);
  const navigation = useNavigation();

  const fetchNotifications = () => {
    setRefreshing(true);
    get("notification")
      .then((response) => {
        const updatedResponse = Object.keys(response).map((id) => ({
          id,
          ...response[id],
        }));
        setNotifications(updatedResponse);
      })
      .catch(() =>
        Alert.alert(
          "Sorry!",
          "There seems to be a problem. Please come back later."
        )
      )
      .finally(() => {
        setRefreshing(false);
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    fetchNotifications();
  }, []);

  const read = (id) => {
    post(`notification/read/${id}`)
    const newNotifications = notifications.map((notification) => {
      if (notification.id === id) {
        return { ...notification, isRead: true };
      }
      return notification;
    });

    setNotifications(newNotifications);
  };

  const readAll = () => {
    post("notification/readAll");
    const newNotifications = notifications.map((notification) => {
      notification.isRead = true;
      return notification;
    });
    setNotifications(newNotifications);
  };

  if (loading) return <View style={styles.container} />;
  return (
    <ScrollView
      style={{ backgroundColor: "#F6F7F7" }}
      contentContainerStyle={[
        styles.container,
        { justifyContent: notifications?.length > 0 ? "flex-start" : "center" },
      ]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={fetchNotifications}
        />
      }
    >
      <View style={styles.content}>
        {notifications?.length > 0 ? (
          notifications?.map((notification) => (
            <NotificationCard
              notification={notification}
              read={read}
              key={notification?.id || notification?.created}
            />
          ))
        ) : (
          <Text style={styles.description}>You have no notifications.</Text>
        )}
      </View>
      {notifications.length ? (
        <TouchableOpacity
          onPress={readAll}
          style={styles.postBtn}
          activeOpacity={0.7}
        >
          <Icon
            name="mark-email-read"
            type="material"
            color="white"
            size={25}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
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
  postBtn: {
    position: "absolute",
    backgroundColor: "#3E6471",
    borderRadius: 25,
    bottom: 15,
    right: 15,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default NotificationsScreen;
