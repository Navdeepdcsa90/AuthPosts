import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '../store/authSlice';
import {useNavigation, useTheme} from '@react-navigation/native';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {Colors} = useTheme() as any;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    setUsernameError('');
    setPasswordError('');

    if (!username) {
      setUsernameError('Please enter username');
      return;
    } else if (!password) {
      setPasswordError('Please enter password');
      return;
    }
    const loginData = {username, password};

    dispatch(login(loginData))
      .unwrap()
      .then(data => {
        if (data) {
          Alert.alert('Login Successfully');
          navigation.navigate('DrawerNavigator');
        }
        console.log('Login successful:', data);
      })
      .catch(err => {
        console.error('Login error:', err);
      });
  };

  return (
    <View style={[styles.container, {backgroundColor: Colors.backgroundColor}]}>
      <TextInput
        style={[
          styles.input,
          {borderColor: Colors.borderColor, backgroundColor: Colors.background},
        ]}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      {usernameError ? <Text style={styles.error}>{usernameError}</Text> : null}

      <TextInput
        style={[
          styles.input,
          {borderColor: Colors.borderColor, backgroundColor: Colors.background},
        ]}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginForm;
