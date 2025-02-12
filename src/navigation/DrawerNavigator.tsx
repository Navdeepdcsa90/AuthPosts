import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Auth from '../components/LoginForm';
import LoginForm from '../components/LoginForm';
import UserProfile from '../components/UserProfile';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="UserProfile" // Start with the user profile
      screenOptions={{
        // ... (Optional drawer styling)
      }}>
      <Drawer.Screen name="UserProfile" component={UserProfile} />
      <Drawer.Screen name="Tabs" component={TabNavigator} /> 
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
