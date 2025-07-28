import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TopNavBar({
  title,
  showBack = false,
  showBell = false,
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
            {/* Back icon */}
            {showBack && (
              <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
            )}

            {/* Title */}
            <Text
              style={[
                styles.title,
                !showBack && !showBell && styles.titleCentered,
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>

            {/* Bell icon */}
            {showBell && (
              <TouchableOpacity onPress={onBellPress} style={styles.iconButton}>
                <Ionicons name="notifications" size={24} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 4,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginHorizontal: 8,
  },
  titleCentered: {
    // textAlign: 'center',
  },
});
