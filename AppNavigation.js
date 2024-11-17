import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import BlogStack from "./Screens/BlogStack/BlogStack";
import AccountStack from "./Screens/AccountStack/AccountStack";
import CommunityStack from "./Screens/CommunityStack/CommunityStack";
import AuthStack from "./Screens/Auth/AuthStack";
import { useContext, useEffect } from "react";
import Context from "./Context";
import NotificationsStack from "./Screens/NotificationsStack/NotificationsStack";
import SubscribeStack from "./Screens/SubscribeStack/SubscribeStack";
import { Platform } from "react-native";

import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const { isAuthenticated, user, getUserData } = useContext(Context);
  const url = Linking.useURL();
  const navigation = useNavigation();
  useEffect(() => {
    if (url) {
      const { hostname, path } = Linking.parse(url);
      if (hostname === 'blog') {
        navigation.navigate('Blog', { screen: 'BlogScreen', params: { id: path } });
      } else if (hostname === 'member') {
        navigation.navigate('Community', { screen: 'Member', params: { id: path } });
      } else if (hostname === 'onboarding') {
        navigation.navigate('Notifications', { screen: 'Onboarding', params: { id: path } });
      } else if (hostname === 'reset-password') {
        navigation.navigate('Auth', { screen: 'ResetPassword', params: { verToken: path } });
      }
    }
  }, [url, isAuthenticated]);


  useEffect(() => {
    if (url) {
      const { path, queryParams } = Linking.parse(url);

      if (path && path.startsWith("blog/")) {
        const id = path.split("/")[1];
        navigation.navigate("BlogScreen", { params: { id } });
      }
    }
  }, [url, navigation]);

  useEffect(() => {
    if (isAuthenticated) getUserData();
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
        <Tab.Navigator
          screenOptions={{
            tabBarLabel: () => null,
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "black",
            tabBarStyle: {
              backgroundColor: "white",
              borderTopWidth: 0.5,
              borderColor: "#ccc",
              ...(Platform.OS === "android" && { height: 60 }),
            },
            headerShown: false,
          }}
        >
          {user?.type === "member" && (!user.expiry || user?.expiry - Date.now() <= 0) ? (
            <>
              <Tab.Screen
                name="Membership"
                component={SubscribeStack}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <Icon name="home" type="ionicon" color="black" size={30} />
                  ),
                }}
              />
            </>
          ) : (
            <>
              <Tab.Screen
                name="Blog"
                component={BlogStack}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <Icon
                      name={focused ? "home" : "home-outline"}
                      type="ionicon"
                      color="black"
                      size={30}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Community"
                component={CommunityStack}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <Icon
                      name={focused ? "people" : "people-outline"}
                      type="ionicon"
                      color="black"
                      size={33}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Notifications"
                component={NotificationsStack}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <Icon
                      name={focused ? "notifications" : "notifications-outline"}
                      type="ionicon"
                      color="black"
                      size={30}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Account"
                component={AccountStack}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <Icon
                      name={focused ? "person-circle" : "person-circle-outline"}
                      type="ionicon"
                      color="black"
                      size={30}
                    />
                  ),
                }}
              />
            </>
          )}
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default AppNavigation;
