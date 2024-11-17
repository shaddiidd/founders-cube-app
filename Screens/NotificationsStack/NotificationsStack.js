import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationsScreen from './NotificationsScreen';
import OnboardingScreen from './OnboardingScreen';

const Stack = createNativeStackNavigator();

const NotificationsStack = () => (
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
);

export default NotificationsStack;