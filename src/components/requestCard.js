import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RequestCard({
  title,
  clientName,
  sessionFrequency,
  status = 'pending', // 'pending' or 'completed'
}) {
  const icon =
    status === 'pending' ? (
      <MaterialCommunityIcons name="clock-outline" size={20} color="red" />
    ) : (
      <MaterialCommunityIcons
        name="check-circle-outline"
        size={20}
        color="green"
      />
    );

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {icon}
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.label}>Client:</Text>
        <Text style={styles.label}>Session Frequency:</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.value}>{clientName}</Text>
        <Text style={styles.value}>{sessionFrequency}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    width: '98%',
    marginVertical: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textTransform: 'capitalize',
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  label: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});
