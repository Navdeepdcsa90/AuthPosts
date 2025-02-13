import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout, fetchAuthUser, refreshToken } from "../store/authSlice";
import { useNavigation, useTheme } from "@react-navigation/native";
import CustomButton from "./CustomButton";

interface User {
  users: {
    firstName: string;
  }[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
}

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { Colors } = useTheme() as any;
  const authState: AuthState = useSelector((state) => state.auth);
  const { user, token, refreshToken: refreshTokenValue } = authState;

  React.useEffect(() => {
    if (token) {
      dispatch(fetchAuthUser(token));
    }
  }, [token, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleRefreshToken = () => {
    if (refreshTokenValue) {
      dispatch(refreshToken(refreshTokenValue))
        .unwrap()
        .then((data) => {
          if (data) {
            Alert.alert("Token refreshed successfully");
          }
          console.log("Token refreshed successfully:", data);
        })
        .catch((err) => {
          console.error("Failed to refresh token:", err);
        });
    } else {
      console.log("No refresh token available.");
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.profileBackground }]}
    >
      {user ? (
        <>
          <Text style={[styles.title, { color: Colors.titleColor }]}>
            Welcome, {user?.users[0]?.firstName}!
          </Text>
          <CustomButton
            style={styles.button}
            title="Logout"
            onPress={handleLogout}
          />
        </>
      ) : (
        <Text style={styles.title}>You are not logged in.</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
    width: "60%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  drawerText: {
    color: "blue",
    marginTop: 20,
    textDecorationLine: "underline",
    fontSize: 16,
  },
});

export default UserProfile;
