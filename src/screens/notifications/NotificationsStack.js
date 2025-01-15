import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationsScreen from './NotificationsScreen';
import OnboardingScreen from './OnboardingScreen';
import { useNavigation } from '@react-navigation/native';
import * as Linking from "expo-linking";
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

const NotificationsStack = () => {
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
    if (path && hostname === "onboarding") navigation.navigate("Onboarding", { id: path });
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
    initialRouteName='NotificationsScreen'
  >
    <Stack.Screen
      name="NotificationsScreen"
      component={NotificationsScreen}
      options={{ title: "Notifications" }}
    />
    <Stack.Screen
      name="Onboarding"
      component={OnboardingScreen}
    />
  </Stack.Navigator>
)};

export default NotificationsStack;