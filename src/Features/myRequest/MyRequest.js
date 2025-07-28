import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopNavBar from '../../components/topNavBar';

export default function MyRequestScreen() {
  return (
    <View style={styles.container}>
      <TopNavBar title="My Request" showBell={true} />
      <View style={styles.content}>
        <Text style={styles.text}>My Request Screen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, color: '#1E62A1' },
});
