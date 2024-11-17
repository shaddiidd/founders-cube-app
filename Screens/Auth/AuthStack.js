import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import LoginScreen from './LoginScreen';
import ApplyScreen from './ApplyScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import WelcomeScreen from './WelcomeScreen';
import ListScreen from '../ListScreen';
import ResetPasswordScreen from "../AccountStack/ResetPasswordScreen";

const Stack = createNativeStackNavigator();

const AccountStack = () => (
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
);

export default AccountStack;
