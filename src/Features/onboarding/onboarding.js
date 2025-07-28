import React from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PrimaryButton from '../../components/primaryButton';
import { useNavigation } from '@react-navigation/native';
import OnboardingDoc from '../../assets/images/onbordingDoc';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.replace('Login');
  };

  return (
    <LinearGradient
      colors={['#4978FF', '#FFFFFF', '#FFFFFF']}
      style={{ flex: 1 }}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5005, y: 0.9313 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topSection}>
          <OnboardingDoc width={'100%'} height={'90%'} />
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.title}>Welcome to Exist App</Text>
          <Text style={styles.subtitle}>
            An easy tool to manage your therapy sessions attendance, notes, and
            progress tracking, all in one place.
          </Text>

          <PrimaryButton title="Next" onPress={handleLogin} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  topSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-end', // Push content to bottom
    paddingBottom: 50, // Space below the button
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 25,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 22,
    fontStyle: 'italic',
  },
});
