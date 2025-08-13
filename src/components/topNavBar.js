import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TopNavBar({
  title,
  showHamburger = false,
  showBack = false,
  showBell = false,
  onHamburgerPress,
  onBackPress,
  onBellPress,
}) {
  return (
    <LinearGradient
      colors={['#0C3862', '#5AA5EE']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            {/* Left icons */}
            <View style={styles.sideContainer}>
              {showHamburger && (
                <TouchableOpacity
                  onPress={onHamburgerPress}
                  style={styles.iconButton}
                >
                  <Ionicons name="menu" size={24} color="#fff" />
                </TouchableOpacity>
              )}
              {showBack && (
                <TouchableOpacity
                  onPress={onBackPress}
                  style={styles.iconButton}
                >
                  <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
              )}
            </View>

            {/* Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
            </View>

            {/* Right icons */}
            <View style={styles.sideContainer}>
              {showBell && (
                <TouchableOpacity
                  onPress={onBellPress}
                  style={styles.iconButton}
                >
                  <Ionicons name="notifications" size={24} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent',
  },
  container: {
    height: 65,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideContainer: {
    width: 60, // fixed width so title can truly be centered
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 4,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
  },
});
