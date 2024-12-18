import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "./AccountScreen";
import EditProfileScreen from "./EditProfileScreen";
import ListScreen from "../ListScreen";
import ResetPasswordScreen from "./ResetPasswordScreen";
import PaymentDetailsScreen from "./PaymentDetailsScreen";
import MembershipScreen from "./MembershipScreen";
import MembershipPlansScreen from "./MembershipPlansScreen.js";
import "../../gesture-handler";
import PaymentScreen from "./PaymentScreen.js";
import PaymentMethodScreen from "./PaymentMethodScreen.js";
import LinkScreen from "./LinkScreen.js";
import ViewImageScreen from "../ViewImageScreen.js";

import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import DeleteAccountScreen from "./DeleteAccountScreen.js";

const Stack = createNativeStackNavigator();

const AccountStack = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const getURL = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        const { hostname, path } = Linking.parse(initialUrl);
        handleDeepLink(hostname, path);
      }
    };
  
    getURL();
  
    const subscription = Linking.addEventListener("url", ({ url }) => {
      const { path } = Linking.parse(url);
      handleDeepLink(hostname, path);
    });
  
    return () => subscription.remove();
  }, []);

  const handleDeepLink = (hostname,path) => {
    if (!path && hostname === "reset-password") navigation.navigate("ChangePassword");
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#F6F7F7",
        },
        headerTintColor: "#000",
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "600",
        },
        headerTitleAlign: "center",
      }}
      initialRouteName="Profile"
    >
      <Stack.Screen
        name="Profile"
        component={AccountScreen}
        options={{
          title: "Account",
        }}
      />
      <Stack.Screen
        name="Link"
        component={LinkScreen}
        options={{
          title: "Add Link",
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: "Personal Information",
        }}
      />
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{
          title: "Choose from the list",
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ResetPasswordScreen}
        options={{
          title: "Change Password",
        }}
      />
      <Stack.Screen
        name="PaymentDetails"
        component={PaymentDetailsScreen}
        options={{
          title: "Payment Details",
        }}
      />
      <Stack.Screen
        name="MembershipScreen"
        component={MembershipScreen}
        options={{
          title: "Membership",
        }}
      />
      <Stack.Screen
        name="MembershipPlansScreen"
        component={MembershipPlansScreen}
        options={{
          title: "Membership Plans",
        }}
      />
      <Stack.Screen
        name="PaymentMethodScreen"
        component={PaymentMethodScreen}
        options={{
          title: "Payment Method",
        }}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          title: "Payment",
        }}
      />
      <Stack.Screen
        name="ViewImageScreen"
        component={ViewImageScreen}
        options={{
          title: "Screenshot",
        }}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccountScreen}
        options={{
          title: "Delete Account",
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
