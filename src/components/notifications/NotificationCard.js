import { useNavigation } from "@react-navigation/native";
import { Text, View, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { Icon } from "react-native-elements";

const NotificationCard = ({ notification, read }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    read(notification?.id);
    if (notification?.redirect?.path === "blog") {
      navigation.navigate("BlogScreen", { id: notification?.redirect.id });
    } else if (notification?.redirect?.path === "onboarding") {
      navigation.navigate("Onboarding", { id: notification?.redirect.id });
    } else if (notification?.redirect?.path === "membership") {
      Linking.openURL("https://community.thefounderscube.com/account/membership");
    }
  };
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", maxWidth: "80%" }}
      >
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                notification?.type !== "alert"
                  ? "#D3DDE1"
                  : "rgba(224, 42, 42, 0.35)",
            },
          ]}
        >
          <Icon
            name={notification?.type === "onboarding" ? "mail" : "notifications"}
            type="ionicon"
            color={notification?.type !== "alert" ? "#457789" : "#E02A2A"}
            size={20}
          />
          {!notification?.isRead && <View style={styles.redDot} />}
        </View>
        <View style={{ marginLeft: 15, macWidth: "10%" }}>
          <Text style={styles.title}>{notification?.title}</Text>
          <Text style={styles.date}>{notification?.created}</Text>
        </View>
      </View>
     {notification?.redirect &&  <Icon
        name="chevron-forward-outline"
        type="ionicon"
        color="#777"
        size={25}
      />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    paddingRight: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    position: "relative"
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  date: {
    color: "#666",
    marginTop: 2,
  },
  redDot: {
    position: "absolute",
    top: -3,
    right: -3, 
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: "white",
  },

});

export default NotificationCard;
