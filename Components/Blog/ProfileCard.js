import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Touchable } from "react-native";
import { Icon } from "react-native-elements";
import Context from "../../Context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileCard = () => {
  const { user, loading } = useContext(Context);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const linkCount = user?.links ? Object.keys(user.links).length : 0;
    if (user?.preview?.imageUrl && user?.industry && user?.bio && linkCount)
      setVisible(false);
    else setVisible(true);
  }, [user]);

  if (loading) return <></>;

  return (
    <View style={[styles.container, !visible && { display: "none" }]}>
      <Text style={styles.title}>Hello {user?.name?.split(" ")[0]}!</Text>
      <Text style={styles.subtitle}>
        Here are a few steps to complete your profile!
      </Text>
      <View style={styles.sep} />
      <View style={styles.step}>
        <Icon
          name={
            user.preview?.imageUrl
              ? "checkmark-circle"
              : "checkmark-circle-outline"
          }
          type="ionicon"
          color={user.preview?.imageUrl ? "green" : "grey"}
          size={25}
          style={styles.icon}
        />
        <Text>Upload a profile picture</Text>
      </View>
      <View style={styles.step}>
        <Icon
          name={user.industry ? "checkmark-circle" : "checkmark-circle-outline"}
          type="ionicon"
          color={user.industry ? "green" : "grey"}
          size={25}
          style={styles.icon}
        />
        <Text>Add the industry you work in</Text>
      </View>
      <View style={styles.step}>
        <Icon
          name={user?.bio ? "checkmark-circle" : "checkmark-circle-outline"}
          type="ionicon"
          color={user?.bio ? "green" : "grey"}
          size={25}
          style={styles.icon}
        />
        <Text>Tell us about yourself</Text>
      </View>
      <View style={styles.step}>
        <Icon
          name={
            user?.links && Object.keys(user?.links)?.length
              ? "checkmark-circle"
              : "checkmark-circle-outline"
          }
          type="ionicon"
          color={
            user?.links && Object.keys(user?.links)?.length ? "green" : "grey"
          }
          size={25}
          style={styles.icon}
        />
        <Text>Add links to connect with founders</Text>
      </View>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate("Account");
          navigation.push("EditProfile", { user, id: user.uid });
        }}
      >
        <Text style={styles.btnTxt}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  sep: {
    height: 0.5,
    backgroundColor: "#ccc",
    marginTop: 5,
    marginBottom: 5,
  },
  step: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  btn: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    alignItems: "center",
  },
  btnTxt: {
    color: "white",
    fontWeight: "500",
  },
});

export default ProfileCard;
