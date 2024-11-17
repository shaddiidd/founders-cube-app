import { useNavigation } from "@react-navigation/native";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const NotificationCard = ({ notification }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (notification.redirect.path === "blog") {
      navigation.navigate("BlogScreen", { id: notification.redirect.id });
    } else if (notification.redirect.path === "onboarding") {
      navigation.navigate("Onboarding", { id: notification.redirect.id });
    } else if (notification.redirect.path === "membership") {
      navigation.navigate("MembershipScreen");
    }
  };
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={notification.redirect ? 0.7 : 1}
      onPress={notification.redirect ? handlePress : () => {}}
    >
      <View style={{ flexDirection: "row", alignItems: "center", maxWidth: "80%" }}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                notification.type !== "alert"
                  ? "#D3DDE1"
                  : "rgba(224, 42, 42, 0.35)",
            },
          ]}
        >
          <Icon
            name={notification.type === "onboarding" ? "mail" : "notifications"}
            type="ionicon"
            color={notification.type !== "alert" ? "#457789" : "#E02A2A"}
            size={20}
          />
        </View>
        <View style={{ marginLeft: 15, macWidth: "10%" }}>
          <Text style={styles.title}>
            {notification.title}
          </Text>
          <Text style={styles.date}>{notification.created}</Text>
        </View>
      </View>
        <Icon
          name="chevron-forward-outline"
          type="ionicon"
          color="#777"
          size={25}
        />
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
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  date: {
    color: "#666",
    marginTop: 2
  },
});

export default NotificationCard;
