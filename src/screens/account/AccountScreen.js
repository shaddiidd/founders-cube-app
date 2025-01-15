import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Alert,
  Share,
  ImageBackground,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Context from "../../states/Context";
import ListItem from "../../components/account/ListItem";
import CodeOfConducModal from "../../components/modals/CodeOfConducModal";
import { Text } from "react-native";

const AccountHome = () => {
  const { user, logout, loading, getUserData } = useContext(Context);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const refreshAccount = () => {
    setRefreshing(true);
    getUserData().then(() => setRefreshing(false));
  };
  const handleReferral = async () => {
    try {
      const message = `Salam! 🚀\n\nI'm part of the *Founders Cube* community, and it's been a game-changer for me!\n\nTo get *2 FREE months* when you join, insert my referral code:\n\n${user.referralCode}\n\nLet's grow and succeed together—can’t wait to see you inside! 💡`;
      await Share.share({ message });
    } catch (error) {
      Alert.alert("Error", "An error occurred while sharing the message.");
    }
  };

  if (loading) return <View style={styles.container} />;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshAccount} />
      }
    >
      <View style={styles.profilePictureContainer}>
        <ImageBackground
          source={
            user?.preview?.dummyUrl
              ? { uri: user?.preview?.dummyUrl }
              : require("../../../assets/profile_picture.png")
          }
          style={styles.profilePicture}
        >
          <Image
            source={
              user?.preview?.imageUrl ? { uri: user.preview.imageUrl } : ""
            }
            style={styles.profilePicture}
          />
        </ImageBackground>
      </View>
      <ListItem
        nav
        icon="person-circle-outline"
        title="Personal Information"
        onPress={() =>
          navigation.navigate("EditProfile", { user, id: user.uid })
        }
      />
      {user?.type === "member" && (
        <ListItem icon="link" title="Referral Code" onPress={handleReferral} />
      )}
      {user?.type === "member" && (
        <ListItem
          nav
          icon="people-outline"
          title="Membership"
          to="MembershipScreen"
        />
      )}
      <CodeOfConducModal />
      <ListItem
        nav
        icon="lock-closed-outline"
        title="Change Password"
        to="ChangePassword"
      />
      <ListItem
        icon="log-out-outline"
        title="Logout"
        sep={false}
        onPress={logout}
      />
      <TouchableOpacity
        style={{ position: "absolute", bottom: 30 }}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("DeleteAccount")}
      >
        <Text style={{ color: "red", fontSize: 15, fontWeight: "500" }}>
          Delete Account
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "#F6F7F7",
  },
  profilePictureContainer: {
    borderColor: "#437689",
    borderWidth: 2,
    borderRadius: 75,
    width: 150,
    height: 150,
    padding: 3,
    marginBottom: 20,
    backgroundColor: "white",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    resizeMode: "cover",
    overflow: "hidden",
  },
  list: {
    width: "100%",
    marginTop: 20,
  },
});

export default AccountHome;
