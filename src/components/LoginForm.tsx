import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigation, useTheme } from "@react-navigation/native";
import CustomButton from "./CustomButton";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { Colors } = useTheme() as any;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9._]{4,}$/; // At least 4 characters, allows letters, numbers, dot, underscore
    return usernameRegex.test(username);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = () => {
    setUsernameError("");
    setPasswordError("");

    if (!username) {
      setUsernameError("Please enter username");
      return;
    } else if (!validateUsername(username)) {
      setUsernameError(
        "Username must be at least 4 characters and contain only letters, numbers, dots, and underscores."
      );
      return;
    }

    if (!password) {
      setPasswordError("Please enter password");
      return;
    } else if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    const loginData = { username, password };

    dispatch(login(loginData))
      .unwrap()
      .then((data) => {
        console.log("data in login===", data);
        if (data) {
          Alert.alert("Login Successfully");
          navigation.navigate("DrawerNavigator");
        }
        console.log("Login successful:", data);
      })
      .catch((err) => {
        console.error("Login error:", err);
        Alert.alert("Login Failed", "Invalid credentials. Please try again.");
      });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.backgroundColor }]}
    >
      <Text style={styles.loginText}>Login</Text>

      <TextInput
        style={[
          styles.input,
          {
            borderColor: usernameError ? "red" : Colors.borderColor,
            backgroundColor: Colors.background,
          },
        ]}
        placeholder="Username"
        placeholderTextColor={Colors.placeholderTextColor}
        onChangeText={setUsername}
        value={username}
        autoCapitalize="none"
      />
      {usernameError ? <Text style={styles.error}>{usernameError}</Text> : null}

      <TextInput
        style={[
          styles.input,
          {
            borderColor: passwordError ? "red" : Colors.borderColor,
            backgroundColor: Colors.background,
          },
        ]}
        placeholder="Password"
        placeholderTextColor={Colors.placeholderTextColor}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        autoCapitalize="none"
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      <CustomButton style={styles.button} title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  loginText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "black",
  },
});

export default LoginForm;
