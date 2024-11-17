import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MembersScreen from './MembersScreen';
import MemberScreen from './MemberScreen';
import ListScreen from "../ListScreen";

const Stack = createNativeStackNavigator();

const CommunityStack = () => (
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
    initialRouteName='Members'
  >
    <Stack.Screen
      name="Members"
      component={MembersScreen} 
      options={{
        headerTitle: "Members",
        headerBackTitle: "Community"
      }}
    />
    <Stack.Screen
      name="Member"
      component={MemberScreen} 
      options={{
        headerBackTitle: "Members"
      }}
    />
    <Stack.Screen
      name="List"
      component={ListScreen} 
      options={{
        headerBackTitle: "Members"
      }}
    />
    </Stack.Navigator>
);

export default CommunityStack;