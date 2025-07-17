import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

export default function WeeklyCalendar({ onDatePress, onMonthPress }) {
  const today = moment();
  const [selectedDate, setSelectedDate] = useState(today);

  const startOfWeek = today.clone().startOf('week'); // Sunday
  const days = [...Array(7).keys()].map(i =>
    startOfWeek.clone().add(i, 'days'),
  );

  const monthYear = selectedDate.format('MMMM YYYY');
  const fullDayText = selectedDate.format('dddd, D');

  const handleSelectDate = day => {
    setSelectedDate(day);
    onDatePress?.(day);
  };

  return (
    <View style={styles.container}>
      {/* Header Row: Full Day on Left, Month-Year + Arrow on Right */}
      <View style={styles.headerRow}>
        <Text style={styles.fullDateText}>{fullDayText}</Text>

        <TouchableOpacity style={styles.monthButton} onPress={onMonthPress}>
          <Text style={styles.monthText}>{monthYear}</Text>
          <Ionicons name="chevron-down" size={18} color="#2E59D2" />
        </TouchableOpacity>
      </View>

      {/* Week Row */}
      <View style={styles.weekRow}>
        {days.map(day => {
          const isSelected = day.isSame(selectedDate, 'day');
          const isPast = day.isBefore(today, 'day');
          const containerStyles = [
            styles.dayContainer,
            isSelected && styles.todayContainer,
            isPast && !isSelected && styles.pastDayContainer,
          ];

          const dayNumberStyles = [
            styles.dayNumber,
            isSelected && styles.todayText,
            isPast && !isSelected && styles.pastDayText,
          ];

          const dayNameStyles = [
            styles.dayName,
            isSelected && styles.todayText,
            isPast && !isSelected && styles.pastDayText,
          ];

          return (
            <TouchableOpacity
              key={day.format('YYYY-MM-DD')}
              onPress={() => handleSelectDate(day)}
              style={containerStyles}
            >
              <Text style={dayNumberStyles}>{day.format('D')}</Text>
              <Text style={dayNameStyles}>{day.format('ddd')}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  fullDateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#121217',
  },
  monthButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E59D2',
    marginRight: 4,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: 44,
    height: 64,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D1DB',
    backgroundColor: '#fff',
  },
  dayName: {
    fontSize: 14,
    color: '#121217',
    fontWeight: '500',
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: '#121217',
    marginBottom: 5,
  },
  todayContainer: {
    borderColor: '#3463E9',
    borderWidth: 2,
    shadowColor: '#3463E9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: '#DCE7FD',
  },
  todayText: {
    color: '#3463E9',
    fontWeight: '700',
  },
  pastDayContainer: {
    borderColor: '#D1D1DB',
  },
  pastDayText: {
    color: '#B0B0B0',
  },
});
