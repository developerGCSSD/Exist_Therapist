import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import PrimaryButton from '../../components/primaryButton';
import SecondaryButton from '../../components/secondaryButton';
import TopNavBar from '../../components/topNavBar';
import RequestBox from '../../components/requestBox';
import SuccessModal from '../../components/successModal';

export default function DayOffRequestScreen() {
  const navigation = useNavigation();

  const [fromDate, setFromDate] = useState('Select date');
  const [toDate, setToDate] = useState('Select date');
  const [clientAction, setClientAction] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const clientOptions = [
    { label: 'Cancel', value: 'cancel' },
    { label: 'Reschedule', value: 'reschedule' },
  ];

  // ✅ Form validation
  const formValid =
    moment(fromDate, 'YYYY-MM-DD', true).isValid() &&
    moment(toDate, 'YYYY-MM-DD', true).isValid() &&
    !!clientAction;

  // modal control
  const [modalVisible, setModalVisible] = useState(false);
  const [activeField, setActiveField] = useState(null); // "from" or "to"

  // date picker state
  const today = moment();
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentYear] = useState(moment().year());
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const calendarDays = [];
  const startOfMonth = currentMonth.clone().startOf('month').startOf('week');
  const endOfMonth = currentMonth.clone().endOf('month').endOf('week');
  let day = startOfMonth.clone();
  while (day.isBefore(endOfMonth, 'day')) {
    calendarDays.push(day.clone());
    day.add(1, 'day');
  }

  const handleSelectDate = date => {
    if (activeField === 'from') {
      setFromDate(date.format('YYYY-MM-DD'));

      // If the 'to' date is before the new 'from' date, reset it
      if (
        moment(toDate, 'YYYY-MM-DD', true).isValid() &&
        moment(toDate).isBefore(date, 'day')
      ) {
        setToDate('Select date');
      }
    } else if (activeField === 'to') {
      if (!moment(fromDate, 'YYYY-MM-DD', true).isValid()) {
        alert('Please select the "From" date first.');
        return;
      }

      if (date.isBefore(moment(fromDate), 'day')) {
        alert('"To" date cannot be before the "From" date.');
        return;
      }
      setToDate(date.format('YYYY-MM-DD'));
    }

    setSelectedDate(date);
    setModalVisible(false);
  };

  return (
    <LinearGradient
      colors={['#0C3862', '#5AA5EE']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientBackground}
    >
      <TopNavBar
        title="Day off Request"
        onBackPress={() => navigation.goBack()}
        showBack={true}
      />

      <View style={styles.container}>
        <View style={styles.row}>
          {/* FROM */}
          <View style={styles.column}>
            <Text style={styles.label}>
              From <Text style={styles.required}>*</Text>
            </Text>
            <TouchableOpacity
              style={styles.dateBox}
              onPress={() => {
                setActiveField('from');
                setModalVisible(true);
              }}
            >
              <Text style={styles.dateText}>{fromDate}</Text>
              <Icon name="calendar-month" size={22} color="#555" />
            </TouchableOpacity>
          </View>

          {/* TO */}
          <View style={styles.column}>
            <Text style={styles.label}>
              To <Text style={styles.required}>*</Text>
            </Text>
            <TouchableOpacity
              style={styles.dateBox}
              onPress={() => {
                setActiveField('to');
                setModalVisible(true);
              }}
            >
              <Text style={styles.dateText}>{toDate}</Text>
              <Icon name="calendar-month" size={22} color="#555" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text style={styles.subLabel}>
            If you have clients during this period, you are recommended to:
          </Text>
          <RequestBox
            options={clientOptions}
            selected={clientAction}
            onSelect={setClientAction}
            horizontal
          />
        </View>
        <View style={styles.bottomButton}>
          <PrimaryButton
            title="Submit"
            onPress={() => {
              setShowSuccessModal(true);

              // Optional: Auto-close modal after 2.5 seconds and navigate back
              setTimeout(() => {
                setShowSuccessModal(false);
                navigation.goBack(); // or navigate somewhere else
              }, 2500);
            }}
            disabled={!formValid}
          />
        </View>
      </View>

      {/* Date Picker Modal */}
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
              {/* Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Date</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{ fontSize: 18 }}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Month Navigation */}
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

              {/* Year Dropdown */}
              {showYearDropdown && (
                <View style={styles.yearDropdown}>
                  <ScrollView style={{ maxHeight: 200 }}>
                    {Array.from(
                      { length: 30 },
                      (_, i) => currentYear - 15 + i,
                    ).map((year, idx, arr) => (
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
                          idx === arr.length - 1 && styles.lastYearOption, // remove divider from last
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

              {/* Calendar Grid */}
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
          </View>
        </View>
      </Modal>
      <SuccessModal visible={showSuccessModal} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: 10,
    paddingBottom: 80,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    marginTop: 20,
  },
  column: { flex: 1 },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  required: { color: 'red' },
  dateBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  dateText: { fontSize: 15, color: '#333' },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    height: '50%',
  },
  dragHandle: {
    alignSelf: 'center',
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  modalContentContainer: {
    paddingHorizontal: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 5,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  monthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E59D2',
  },
  arrow: {
    fontSize: 15,
    color: '#2E59D2',
  },
  yearDropdown: {
    position: 'absolute',
    top: 80,
    left: 140,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 999,
    paddingVertical: 8,
    maxHeight: 150,
    width: '40%',
  },
  yearOption: {
    padding: 10,
    borderBottomWidth: 2, // divider
    borderBottomColor: '#eee',
  },
  lastYearOption: {
    borderBottomWidth: 0, // no divider for last item
  },
  yearOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectedYearOption: {
    backgroundColor: '#E6F0FF',
  },
  selectedYearOptionText: {
    color: '#2E59D2',
    fontWeight: '600',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  weekDay: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    fontWeight: '700',
    color: '#999',
    marginBottom: 5,
  },
  calendarDay: {
    width: `${100 / 7}%`,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    borderRadius: 10,
  },
  selectedDay: {
    backgroundColor: '#2E59D2',
    borderRadius: 50,
  },
  todayHighlight: {
    borderWidth: 1,
    borderColor: '#2E59D2',
    borderRadius: 50,
  },
  dayText: {
    fontSize: 14,
  },
  selectedText: {
    color: '#fff',
  },
  todayTextColor: {
    color: '#2E59D2',
  },
  subLabel: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  bottomButton: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1.5,
    borderColor: '#E5E7EB',
  },
});
