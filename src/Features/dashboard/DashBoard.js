import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopNavBar from '../../components/topNavBar';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <TopNavBar title="Dashboard" showBell={true} />
      <View style={styles.content}>
        <Text style={styles.text}>Dashboard Screen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, color: '#1E62A1' },
});
