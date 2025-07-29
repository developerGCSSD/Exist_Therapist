// components/TimelineIndicator.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TimelineIndicator({
  startTime = '10:00',
  endTime = '10:30',
  isFirst = false,
  isLast = false,
  isGap = false,
}) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.timeText}>{startTime}</Text>
      <View style={styles.timeline}>
        <View
          style={[
            styles.line,
            { backgroundColor: isGap ? '#3CB371' : '#C7C7CC' }, // green if free time
          ]}
        />

        <View
          style={[
            styles.dot,
            { backgroundColor: isGap ? '#3CB371' : '#007AFF' },
          ]}
        />
        <View
          style={[
            styles.line,
            { backgroundColor: isGap ? '#3CB371' : '#C7C7CC' }, // green if free time
          ]}
        />
      </View>
      <Text style={styles.timeText}>{endTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 35, // ⬅️ small width
    alignItems: 'center',
    paddingVertical: 8,
  },
  timeText: {
    fontSize: 10,
    color: '#333',
    marginVertical: 2,
    textAlign: 'center',
  },
  timeline: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: 2,
    height: 20,
    backgroundColor: '#C7C7CC',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginVertical: 2,
  },
});
