import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import WeeklyCalendar from '../../components/calendar';
import TopNavBar from '../../components/topNavBar';
import SegmentedTabs from '../../components/segmentedTaps';
import TodayScheduleCard from '../../components/todayScheduleCard';
import TimelineIndicator from '../../components/timeLineIndecator';
import AvailableTimeCard from '../../components/availableTimeCard';
import moment from 'moment';

const NAVBAR_HEIGHT = '14%';

export default function TodaySchedule({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('now');
  const [selectedDate, setSelectedDate] = useState(moment());

  const handleDatePress = date => {
    if (date) {
      console.log('Selected date:', date.format('YYYY-MM-DD'));
      setSelectedDate(date);
    } else {
      console.log('Date cleared');
      setSelectedDate(moment());
    }
  };

  const tabs = [
    { label: 'Now', value: 'now' },
    { label: 'Previous', value: 'previous' },
  ];

  const [appointments, setAppointments] = useState([
    // ✅ TODAY — 2025-07-29
    {
      id: 1,
      name: 'Ahmed Amir',
      date: '2025-07-29',
      status: 'New',
      method: 'online',
      startTime: '09:15',
      endTime: '10:00',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
    {
      id: 2,
      name: 'Rania Adel',
      date: '2025-07-29',
      status: 'Follow-up',
      method: 'faceToFace',
      startTime: '10:30',
      endTime: '11:30',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
    {
      id: 3,
      name: 'Samiha Ragab',
      date: '2025-07-29',
      status: 'New',
      method: 'faceToFace',
      startTime: '12:05',
      endTime: '12:45',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
    {
      id: 4,
      name: 'Nada Yasser',
      date: '2025-07-29',
      status: 'New',
      method: 'online',
      startTime: '15:00',
      endTime: '15:30',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
    {
      id: 5,
      name: 'Khaled Osama',
      date: '2025-07-29',
      status: 'Follow-up',
      method: 'online',
      startTime: '18:00',
      endTime: '18:45',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },

    // ✅ TOMORROW — 2025-07-30
    {
      id: 6,
      name: 'Laila Ahmed',
      date: '2025-07-30',
      status: 'New',
      method: 'faceToFace',
      startTime: '10:00',
      endTime: '10:30',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
    {
      id: 7,
      name: 'Ola Sherif',
      date: '2025-07-30',
      status: 'New',
      method: 'online',
      startTime: '12:00',
      endTime: '13:00',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
    {
      id: 8,
      name: 'Ziad Kamal',
      date: '2025-07-30',
      status: 'Appointment Confirmed',
      method: 'faceToFace',
      startTime: '14:30',
      endTime: '15:30',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
    {
      id: 9,
      name: 'Marwa Helmy',
      date: '2025-07-30',
      status: 'Follow-up',
      method: 'online',
      startTime: '17:00',
      endTime: '17:30',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
  ]);

  const updateAppointmentState = (id, newState) => {
    setAppointments(prev =>
      prev.map(app => (app.id === id ? { ...app, ...newState } : app)),
    );
  };

  const filteredAppointments = appointments.filter(app => {
    const isSameDate = moment(app.date).isSame(selectedDate, 'day');
    const now = moment();
    const start = moment(`${app.date} ${app.startTime}`, 'YYYY-MM-DD HH:mm');
    const end = moment(`${app.date} ${app.endTime}`, 'YYYY-MM-DD HH:mm');

    const isOnlineHistory =
      app.method === 'online' &&
      (app.noShow || app.sessionEnded || app.sessionEndedEarly);

    const isFaceToFaceHistory =
      app.method === 'faceToFace' && end.isBefore(now);

    const isHistory = isOnlineHistory || isFaceToFaceHistory;

    if (!isSameDate) return false;
    if (selectedTab === 'previous') return isHistory;
    if (selectedTab === 'now') return !isHistory;

    return true;
  });

  const sortedAppointments = [...filteredAppointments].sort((a, b) =>
    moment(a.startTime, 'HH:mm').diff(moment(b.startTime, 'HH:mm')),
  );

  //normalized hourly timeline that starts at the earliest appointment hour
  const generateHourlyTimeline = () => {
    if (sortedAppointments.length === 0) return [];

    const appointmentTimes = sortedAppointments.map(app => ({
      start: moment(app.startTime, 'HH:mm'),
      end: moment(app.endTime, 'HH:mm'),
      original: app,
    }));

    const earliestStart = moment.min(appointmentTimes.map(a => a.start));
    const minStart = earliestStart.clone().startOf('hour');
    const latestStart = moment.max(appointmentTimes.map(a => a.start));
    const maxEnd = latestStart.clone().endOf('hour'); // Only care about start times

    const blocks = [];
    let cursor = minStart.clone();
    while (cursor.isBefore(maxEnd)) {
      const nextHour = cursor.clone().add(1, 'hour');

      const match = appointmentTimes.find(
        a => a.start.isSameOrAfter(cursor) && a.start.isBefore(nextHour),
      );

      if (match) {
        blocks.push({
          type: 'appointment',
          startTime: cursor.format('HH:mm'),
          endTime: nextHour.format('HH:mm'),
          data: match.original,
        });
      } else {
        blocks.push({
          type: 'available',
          startTime: cursor.format('HH:mm'),
          endTime: nextHour.format('HH:mm'),
        });
      }

      cursor = nextHour;
    }

    return blocks;
  };

  return (
    <LinearGradient
      colors={['#0C3862', '#5AA5EE']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.root}
    >
      <View style={styles.navContainer}>
        <TopNavBar
          title="Today's Schedule"
          showBack={false}
          showBell={true}
          onBellPress={() => console.log('Notifications')}
        />
      </View>

      <View style={styles.contentContainer}>
        <WeeklyCalendar onDatePress={handleDatePress} />

        <SegmentedTabs
          tabs={tabs}
          selected={selectedTab}
          onSelect={setSelectedTab}
        />

        <ScrollView contentContainerStyle={styles.cardsContainer}>
          {generateHourlyTimeline().map((item, index, arr) => {
            if (selectedTab === 'previous' && item.type === 'available') {
              return null; // 👈 skip available time in "Previous" tab
            }
            const start = moment(item.startTime, 'HH:mm');
            const end = moment(item.endTime, 'HH:mm');

            return (
              <View
                key={index}
                style={{ flexDirection: 'row', alignItems: 'flex-start' }}
              >
                <TimelineIndicator
                  startTime={start.format('hh:00 A')} // always hour:00
                  endTime={end.format('hh:00 A')} // always hour:00
                  isFirst={index === 0}
                  isLast={index === arr.length - 1}
                  isGap={item.type === 'available'}
                />

                <View style={{ flex: 1 }}>
                  {item.type === 'appointment' ? (
                    <TodayScheduleCard
                      {...item.data}
                      disableActions={
                        !moment(item.data.date).isSame(moment(), 'day')
                      }
                      waitingForOnlineStart={
                        item.data.method === 'online' &&
                        moment(
                          item.data.date + ' ' + item.data.startTime,
                        ).isAfter(moment())
                      }
                      onStart={() => console.log('Started', item.data.name)}
                      onNoShow={() =>
                        updateAppointmentState(item.data.id, { noShow: true })
                      }
                      onEndSession={() =>
                        updateAppointmentState(item.data.id, {
                          sessionEnded: true,
                        })
                      }
                      onEndEarly={() =>
                        updateAppointmentState(item.data.id, {
                          sessionEndedEarly: true,
                        })
                      }
                    />
                  ) : (
                    <AvailableTimeCard
                      startTime={start.format('hh:mm A')}
                      endTime={end.format('hh:mm A')}
                    />
                  )}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  navContainer: {
    zIndex: 5,
    paddingBottom: 8,
    paddingHorizontal: 0,
  },
  contentContainer: {
    position: 'absolute',
    top: NAVBAR_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
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
  cardsContainer: {
    padding: 16,
    paddingBottom: 30,
  },
});
