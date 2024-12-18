import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MembersScreen from "./MembersScreen";
import MemberScreen from "./MemberScreen";
import ListScreen from "../ListScreen";
import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";

const Stack = createNativeStackNavigator();

const CommunityStack = () => {
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
    if (path && hostname === "member") navigation.navigate("Member", { id: path });
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
      initialRouteName="Members"
    >
      <Stack.Screen
        name="Members"
        component={MembersScreen}
        options={{
          headerTitle: "Members",
          headerBackTitle: "Community",
        }}
      />
      <Stack.Screen
        name="Member"
        component={MemberScreen}
        options={{
          headerBackTitle: "Members",
        }}
      />
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{
          headerBackTitle: "Members",
        }}
      />
    </Stack.Navigator>
  );
};

export default CommunityStack;
