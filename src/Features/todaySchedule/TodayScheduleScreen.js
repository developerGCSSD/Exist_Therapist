import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WeeklyCalendar from '../../components/calendar';

export default function TodaySchedule() {
  const handleDatePress = date => {
    if (date) {
      console.log('Selected date:', date.format('YYYY-MM-DD'));
    } else {
      console.log('Date cleared');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.calendarWrapper}>
        <WeeklyCalendar onDatePress={handleDatePress} />
      </View>

      <View style={styles.messageContainer}>
        <Text style={styles.title}>Today's Schedule</Text>
        <Text style={styles.subtitle}>You have no appointments today.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  calendarWrapper: {
    marginTop: 100,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
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
