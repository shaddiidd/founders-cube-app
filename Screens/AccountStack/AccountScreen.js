import React, { useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet, Alert, Share, ImageBackground, ScrollView, RefreshControl } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Context from "../../Context";
import ListItem from "../../Components/Account/ListItem";
import CodeOfConducModal from "../../Components/Modals/CodeOfConducModal";

const AccountHome = () => {
  const { user, logout, setLoading, loading, getUserData } = useContext(Context);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserData();
  }, []);
  const handleReferral = async () => {
    try {
      const message = `Hello,\n\nUse my founders cube referral code ${user.referralCode} to get a free month!\n\nDownload the founders cube app or visit https://community.founderscube.com/apply to join the founders community!`;
      await Share.share({ message });
    } catch (error) {
      Alert.alert("Error", "An error occurred while sharing the message.");
    }
  };
  
  if(loading) return <View style={styles.container} />
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ 
        flex: 1,
        alignItems: 'center',
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getUserData} />
      }
    >
      <View style={styles.profilePictureContainer}>
        <ImageBackground
          source={user?.preview?.dummyUrl ? { uri: user?.preview?.dummyUrl } : require("../../assets/profile_picture.png")}
          style={styles.profilePicture}
        >
          <Image
            source={user?.preview?.imageUrl ? { uri: user.preview.imageUrl } : ""}
            style={styles.profilePicture}
          />
        </ImageBackground>
      </View>
      <ListItem nav icon="person-circle-outline" title="Personal Information" onPress={() => navigation.navigate("EditProfile", { user, id: user.uid })} />
      {user?.type !== "admin" && <ListItem icon="link" title="Referral Code" onPress={handleReferral} />}
      {user?.type !== "admin" && <ListItem nav icon="people-outline" title="Membership" to="MembershipScreen" />}
      <CodeOfConducModal />
      <ListItem nav icon="lock-closed-outline" title="Change Password" to="ChangePassword" />
      <ListItem icon="log-out-outline" title="Logout" sep={false} onPress={logout} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
      minHeight: "100%",
      backgroundColor: "#F6F7F7"
  },
  profilePictureContainer: {
    borderColor: '#437689',
    borderWidth: 2,
    borderRadius: 75,
    width: 150,
    height: 150,
    padding: 3,
    marginBottom: 20,
    backgroundColor: "white"
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    resizeMode: 'cover',
    overflow: "hidden"
  },
  list: {
    width: "100%",
    marginTop: 20,
  },
});

export default AccountHome;
