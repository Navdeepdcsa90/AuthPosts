import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Post from '../components/Post';
import LoginForm from '../components/LoginForm';
import UserProfile from '../components/UserProfile';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen options={{ headerShown: false }}  name="User  Profile" component={UserProfile} />
      <Tab.Screen options={{ headerShown: false }}  name="Posts" component={Post} />
      {/* <Tab.Screen name="Login" component={LoginForm} />
      <Tab.Screen name="Posts" component={Post} /> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;