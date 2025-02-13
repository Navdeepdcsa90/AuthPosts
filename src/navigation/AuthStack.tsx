import { createStackNavigator } from "@react-navigation/stack";
import LoginForm from "../components/LoginForm";
import DrawerNavigator from "./DrawerNavigator";
import UserProfile from "../components/UserProfile";
import TabNavigator from "./TabNavigator";
import { useSelector } from "react-redux";
const Stack = createStackNavigator();
const AuthStack = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log('isAuthenticated===',isAuthenticated)
  return (
    <Stack.Navigator
      initialRouteName="LoginForm"
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen name="LoginForm" component={LoginForm} />
      ) : (
        <Stack.Screen name="UserProfile" component={UserProfile} />
      )}
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default AuthStack;
