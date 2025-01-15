import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./HomeScreen"
import BlogScreen from "./BlogScreen"
import NewBlogScreen from "./NewBlogScreen"
import MyBlogsScreen from './MyBlogs';
import EditProfileScreen from "../account/EditProfileScreen";
import AllBlogsScreen from './AllBlogsScreen';
import ListScreen from "../app/ListScreen";

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
    initialRouteName='Home'
  >
    <Stack.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen 
      name="EditProfileScreen" 
      component={EditProfileScreen} 
      options={{
        title: "Personal Information"
      }}
    />
    <Stack.Screen 
      name="BlogScreen" 
      component={BlogScreen}
      options={{ title: "Blog" }}
    />
    <Stack.Screen 
      name="NewBlog" 
      component={NewBlogScreen}
      options={{ title: "New Blog" }}
    />
    <Stack.Screen 
      name="MyBlogs" 
      component={MyBlogsScreen}
      options={{ title: "My Blogs" }}
    />
    <Stack.Screen 
      name="AllBlogs" 
      component={AllBlogsScreen}
      options={{ title: "All Blogs" }}
    />
    <Stack.Screen 
      name="BlogTopics" 
      component={ListScreen}
    />
  </Stack.Navigator>
);

export default AccountStack;
