//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
import {Provider} from 'react-redux';
import store from './src/store/store';
import AuthStack from './src/navigation/AuthStack';
import { useColorScheme } from "react-native";
import { DarkTheme, LightTheme } from './src/constants/color';
// create a component
const App = () => {
  const theme = useColorScheme();
  return (
    <Provider store={store}>
      <NavigationContainer
      theme={theme === "dark" ? DarkTheme : LightTheme}
      >
        {/* <DrawerNavigator /> */}
        {/* <TabNavigator /> */}
        <AuthStack />
      </NavigationContainer>
    </Provider>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default App;
