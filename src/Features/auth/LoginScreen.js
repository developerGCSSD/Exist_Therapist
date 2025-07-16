import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import InputField from '../../components/inputField';
import PrimaryButton from '../../components/primaryButton';
import logo from '../../assets/images/logo.png';

const { height } = Dimensions.get('window');

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = username.trim() && password.trim();

  const handleLogin = () => {
    // Proceed with login logic (e.g. API call)
  };

  return (
    <LinearGradient
      colors={['#0C3862', '#5AA5EE']}
      style={styles.gradientContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.wrapper}>
        {/* Logo at top */}
        <View style={styles.logoWrapper}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>

        {/* White card */}
        <View style={styles.cardContainer}>
          <View style={styles.greetingWrapper}>
            <Text style={styles.greetingTitle}>Hi There!</Text>
            <Text style={styles.greetingSubtitle}>
              Welcome back please enter your details
            </Text>
          </View>

          <View style={styles.inputSection}>
            <InputField
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
            />

            <InputField
              label="Password"
              placeholder="Enter your password"
              secure
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.forgotWrapper} onPress={() => {}}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonWrapper}>
            <PrimaryButton
              title="Login"
              onPress={handleLogin}
              disabled={!isFormValid}
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  logoWrapper: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  logo: {
    width: 250,
    height: 450,
  },
  cardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 8,
    elevation: 10,
    justifyContent: 'space-between',
    zIndex: 10,
  },
  buttonWrapper: {
    paddingBottom: 30,
  },
  greetingWrapper: {
    marginBottom: 20,
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 4,
    color: '#121217',
  },
  greetingSubtitle: {
    fontSize: 14,
    color: '#6C6C89',
  },
  forgotWrapper: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  forgotText: {
    color: '#2E59D2',
    textDecorationLine: 'underline',
    fontSize: 13,
    fontWeight: '400',
  },
});
