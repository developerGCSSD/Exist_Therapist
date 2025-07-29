// AvailableTimeCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AvailableTimeCard({ startTime, endTime }) {
  return (
    <View style={styles.card}>
      <Text style={styles.availableText}>Available Time</Text>
      {/* <Text style={styles.timeText}>
        {startTime} - {endTime}
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EEFBF4',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#17663A',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 2,
    width: '95%',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    marginVertical: 8,
  },
  availableText: {
    color: '#17663A',
    fontWeight: '600',
    fontSize: 16,
  },
  timeText: {
    color: '#17663A',
    fontWeight: '500',
    fontSize: 13,
    marginTop: 4,
  },
});
