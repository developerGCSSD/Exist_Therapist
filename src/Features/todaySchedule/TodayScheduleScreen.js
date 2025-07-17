import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function TodaySchedule() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Schedule</Text>
      <Text style={styles.subtitle}>You have no appointments today.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0C3862',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C6C89',
  },
});
