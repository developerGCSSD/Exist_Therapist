// ScheduleRequestScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CancelRequestScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cancel Request</Text>
      {/* Add your form or content here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' },
});
