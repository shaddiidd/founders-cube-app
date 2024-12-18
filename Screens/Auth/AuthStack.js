import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import LoginScreen from './LoginScreen';
import ApplyScreen from './ApplyScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import WelcomeScreen from './WelcomeScreen';
import ListScreen from '../ListScreen';
import ResetPasswordScreen from "../AccountStack/ResetPasswordScreen";

import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";

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

  const handleDeepLink = (hostname, path) => {
    if (path && hostname === "reset-password") navigation.navigate("ResetPassword", { verToken: path });
  };

  return (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#F6F7F7',
      },
      headerTintColor: '#000',
      headerBackTitleVisible: false,
      headerShadowVisible: false,
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: '600',
      },
      headerTitleAlign: "center",
    }}
    initialRouteName='Welcome'
  >
    <Stack.Screen 
      name="Welcome" 
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Login" 
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Apply" 
      component={ApplyScreen}
    />
    <Stack.Screen 
      name="ForgotPassword" 
      component={ForgotPasswordScreen}
      options={{
        title: "Forgot Password"
      }}
    />
    <Stack.Screen 
      name="List" 
      component={ListScreen} 
      options={{
        title: "Choose from the list"
      }}
    />
    <Stack.Screen 
      name="ResetPassword" 
      component={ResetPasswordScreen} 
      options={{
        title: "Reset Password"
      }}
    />
  </Stack.Navigator>
)};

export default AccountStack;
