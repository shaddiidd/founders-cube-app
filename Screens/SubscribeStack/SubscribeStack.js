import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "../../gesture-handler";
import MembershipScreen from "../AccountStack/MembershipScreen.js";
import ViewImageScreen from "../ViewImageScreen.js";
import MembershipPlansScreen from "../AccountStack/MembershipPlansScreen.js";
import PaymentMethodScreen from "../AccountStack/PaymentMethodScreen.js";
import PaymentScreen from "../AccountStack/PaymentScreen.js";
import PaymentDetailsScreen from "../AccountStack/PaymentDetailsScreen.js";
import Context from "../../Context.js";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const Stack = createNativeStackNavigator();

const SubscribeStack = () => {
  const { logout } = useContext(Context);
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
        headerRight: () => (
          <TouchableOpacity onPress={logout} style={{ marginRight: 15 }}>
            <Icon name="log-out-outline" type="ionicon" color="#000" size={24} />
          </TouchableOpacity>
        ),
      }}
      initialRouteName="MembershipScreen"
    >
      <Stack.Screen
        name="MembershipScreen"
        component={MembershipScreen}
        options={{
          title: "Membership",
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
          title: "Screenshot"
        }}
      />
    </Stack.Navigator>
  );
};

export default SubscribeStack;
