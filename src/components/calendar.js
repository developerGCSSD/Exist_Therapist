import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import PrimaryButton from './primaryButton';
import SecondaryButton from './secondaryButton';

export default function WeeklyCalendar({ onDatePress }) {
  const today = moment();
  const [selectedDate, setSelectedDate] = useState(today);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(moment());
  const currentYear = moment().year();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    today.clone().startOf('week'),
  );
  const days = [...Array(7).keys()].map(i =>
    currentWeekStart.clone().add(i, 'days'),
  );

  const handleSelectDate = day => {
    setSelectedDate(day);
    setCurrentMonth(day.clone());
    setCurrentWeekStart(day.clone().startOf('week'));
    onDatePress?.(day);
  };

  const generateCalendar = month => {
    const start = month.clone().startOf('month').startOf('week');
    const end = month.clone().endOf('month').endOf('week');
    const days = [];
    let day = start.clone();
    while (day.isBefore(end)) {
      days.push(day.clone());
      day.add(1, 'day');
    }
    return days;
  };

  const handleClear = () => {
    const resetToToday = moment();
    setSelectedDate(resetToToday);
    setCurrentMonth(resetToToday.clone());
    setCurrentWeekStart(resetToToday.clone().startOf('week'));
    onDatePress?.(resetToToday);
    setModalVisible(false);
  };

  const handleApply = () => {
    onDatePress?.(selectedDate);
    setModalVisible(false);
  };

  const calendarDays = generateCalendar(currentMonth);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.monthButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.monthText}>
            {(selectedDate ?? today).format('MMMM YYYY')}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#2E59D2" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekRow}>
        {days.map(day => {
          const isSelected = day.isSame(selectedDate, 'day');
          const isPast = day.isBefore(today, 'day');
          const isToday = day.isSame(today, 'day');

          const containerStyles = [
            styles.dayContainer,
            isSelected && styles.todayContainer,
            isToday && !isSelected && styles.todayHighlight,
            isPast && !isSelected && styles.pastDayContainer,
          ];

          const dayNumberStyles = [
            styles.dayNumber,
            isSelected && styles.todayText,
            isToday && !isSelected && styles.todayTextColor,
            isPast && !isSelected && styles.pastDayText,
          ];

          const dayNameStyles = [
            styles.dayName,
            isSelected && styles.todayText,
            isToday && !isSelected && styles.todayTextColor,
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

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalSheet}>
            <View style={styles.dragHandle} />

            <View style={styles.modalContentContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filter by Date</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{ fontSize: 18 }}>✕</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.monthNav}>
                <TouchableOpacity
                  onPress={() =>
                    setCurrentMonth(prev => prev.clone().subtract(1, 'month'))
                  }
                >
                  <Text style={styles.arrow}>←</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.monthButton}
                  onPress={() => setShowYearDropdown(prev => !prev)}
                >
                  <Text style={styles.monthText}>
                    {currentMonth.format('MMMM YYYY')}
                  </Text>
                  <Ionicons
                    name={showYearDropdown ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color="#2E59D2"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    setCurrentMonth(prev => prev.clone().add(1, 'month'))
                  }
                >
                  <Text style={styles.arrow}>→</Text>
                </TouchableOpacity>
              </View>

              {showYearDropdown && (
                <View style={styles.yearDropdown}>
                  <ScrollView style={{ maxHeight: 200 }}>
                    {Array.from(
                      { length: 30 },
                      (_, i) => currentYear - 15 + i,
                    ).map(year => (
                      <TouchableOpacity
                        key={year}
                        onPress={() => {
                          setSelectedYear(year);
                          setCurrentMonth(prev => prev.clone().year(year));
                          setShowYearDropdown(false);
                        }}
                        style={[
                          styles.yearOption,
                          year === selectedYear && styles.selectedYearOption,
                        ]}
                      >
                        <Text
                          style={[
                            styles.yearOptionText,
                            year === selectedYear &&
                              styles.selectedYearOptionText,
                          ]}
                        >
                          {year}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              <View style={styles.calendarGrid}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <Text key={day} style={styles.weekDay}>
                    {day}
                  </Text>
                ))}
                {calendarDays.map((day, i) => {
                  const isToday = day.isSame(today, 'day');
                  const isSelected = day.isSame(selectedDate, 'day');

                  return (
                    <TouchableOpacity
                      key={i}
                      style={[
                        styles.calendarDay,
                        isSelected && styles.selectedDay,
                        isToday && !isSelected && styles.todayHighlight,
                      ]}
                      onPress={() => handleSelectDate(day)}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          isSelected && styles.selectedText,
                          isToday && !isSelected && styles.todayTextColor,
                        ]}
                      >
                        {day.date()}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.modalFooter}>
              <PrimaryButton title="Apply" onPress={handleApply} width="65%" />
              <SecondaryButton
                title="Clear"
                onPress={handleClear}
                width="35%"
              />
            </View>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 12,
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
  todayHighlight: {
    backgroundColor: '#EDF2FF',
  },
  todayText: {
    color: '#3463E9',
    fontWeight: '700',
  },
  todayTextColor: {
    color: '#3463E9',
    fontWeight: '600',
  },
  pastDayContainer: {
    borderColor: '#D1D1DB',
  },
  pastDayText: {
    color: '#B0B0B0',
  },
  overlay: {
    flex: 1,
    backgroundColor: '#00000077',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 20,
    height: '55%',
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    borderRadius: 2,
    marginBottom: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  arrow: {
    fontSize: 24,
    color: '#2E59D2',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  weekDay: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 4,
  },
  calendarDay: {
    width: `${100 / 7}%`,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 100,
    marginBottom: 6,
  },
  dayText: {
    color: '#000',
  },
  selectedDay: {
    backgroundColor: '#3463E9',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalFooter: {
    position: 'absolute',
    bottom: 40,
    left: 25,
    right: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  yearOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  selectedYearOption: {
    backgroundColor: '#EDF2FF',
  },
  yearOptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  selectedYearOptionText: {
    fontWeight: 'bold',
    color: '#2E59D2',
  },
  yearDropdown: {
    position: 'absolute',
    top: 100,
    left: 100,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 999,
    paddingVertical: 8,
    maxHeight: 150,
    width: '50%',
  },
});
