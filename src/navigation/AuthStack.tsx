import {createStackNavigator} from '@react-navigation/stack';
import LoginForm from '../components/LoginForm';
import DrawerNavigator from './DrawerNavigator';
import UserProfile from '../components/UserProfile';
import TabNavigator from './TabNavigator';
const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginForm"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoginForm" component={LoginForm} />
      {/* <Stack.Screen name="Tabs" component={TabNavigator} /> */}
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default AuthStack;
