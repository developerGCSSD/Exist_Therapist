/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import InputField from '../../components/inputField';
import PrimaryButton from '../../components/primaryButton';
import ExistLogo from '../../assets/images/logo';

const { height } = Dimensions.get('window');

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const isFormValid = username.trim() && password.trim();

  const handleLogin = () => {
    // Proceed with login logic (e.g. API call)
  };

  // Listen to keyboard events
  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardOpen(true),
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardOpen(false),
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <LinearGradient
      colors={['#0C3862', '#5AA5EE']}
      style={styles.gradientContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo at top */}
          {!keyboardOpen && (
            <View style={styles.logoWrapper}>
              <ExistLogo width={'236'} height={'133'} />
            </View>
          )}

          {/* White card */}
          <View
            style={[
              styles.cardContainer,
              keyboardOpen && styles.cardContainerExpanded,
            ]}
          >
            <View
              style={[
                styles.greetingWrapper,
                keyboardOpen && styles.greetingWrapperExpanded,
              ]}
            >
              <Text style={styles.greetingTitle}>Hi There!</Text>
              <Text style={styles.greetingSubtitle}>
                Welcome back please enter your details
              </Text>
            </View>

            <View style={[styles.inputSection]}>
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

            <View style={[styles.buttonWrapper]}>
              <PrimaryButton
                title="Login"
                onPress={handleLogin}
                disabled={!isFormValid}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 201,
    paddingHorizontal: 102,
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
  cardContainerExpanded: {
    position: 'relative',
    flex: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingTop: 60,
    zIndex: 10,
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
  inputSection: {
    marginBottom: 20,
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
  buttonWrapper: {
    paddingBottom: 30,
  },
  greetingWrapperExpanded: {
    marginTop: 100,
  },
});
