import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import WeeklyCalendar from '../../components/calendar'; // adjust path if needed

export default function TodaySchedule() {
  const handleDatePress = date => {
    console.log('Selected date:', date.format('YYYY-MM-DD'));
  };

  return (
    <View style={styles.container}>
      {/* Calendar at the top */}
      <View style={styles.calendarWrapper}>
        <WeeklyCalendar
          onDatePress={date => console.log('Selected date:', date.format())}
          onMonthPress={() =>
            console.log('Month clicked! Show picker or modal')
          }
        />
      </View>

      {/* Schedule message */}
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
