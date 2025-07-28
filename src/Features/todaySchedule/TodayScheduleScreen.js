import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import WeeklyCalendar from '../../components/calendar';
import TopNavBar from '../../components/topNavBar';
import SegmentedTabs from '../../components/segmentedTaps';
import TodayScheduleCard from '../../components/todayScheduleCard';
import TimelineIndicator from '../../components/timeLineIndecator';
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
    {
      id: 1,
      name: 'Ali Mohamed Ali',
      date: '2025-07-28',
      status: 'New',
      method: 'faceToFace',
      startTime: '09:30',
      endTime: '10:30',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
    {
      id: 2,
      name: 'Sarah Hossam',
      date: '2025-07-28',
      status: 'Follow-up',
      method: 'online',
      startTime: '10:45',
      endTime: '11:30',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
    {
      id: 3,
      name: 'Kareem Saad',
      date: '2025-07-27',
      status: 'Appointment Confirmed',
      method: 'faceToFace',
      startTime: '15:00',
      endTime: '16:00',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
    {
      id: 4,
      name: 'Ahmed Amir',
      date: '2025-07-29',
      status: 'New',
      method: 'online',
      startTime: '16:30',
      endTime: '17:00',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
    {
      id: 5,
      name: 'Omar Khaled',
      date: '2025-07-28',
      status: 'New',
      method: 'faceToFace',
      startTime: '17:00',
      endTime: '18:00',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
    {
      id: 6,
      name: 'Mona Hassan',
      date: '2025-07-26',
      status: 'Follow-up',
      method: 'online',
      startTime: '09:00',
      endTime: '09:30',
      noShow: false,
      sessionEnded: true,
      sessionEndedEarly: false,
    },
    {
      id: 7,
      name: 'Tarek Nabil',
      date: '2025-07-28',
      status: 'New',
      method: 'online',
      startTime: '12:00',
      endTime: '12:30',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
    {
      id: 8,
      name: 'Laila Ahmed',
      date: '2025-07-30',
      status: 'New',
      method: 'faceToFace',
      startTime: '11:00',
      endTime: '12:00',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
    {
      id: 9,
      name: 'Hany Salah',
      date: '2025-07-28',
      status: 'Appointment Confirmed',
      method: 'faceToFace',
      startTime: '13:30',
      endTime: '14:00',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
    {
      id: 10,
      name: 'Nour Farid',
      date: '2025-07-25',
      status: 'Follow-up',
      method: 'online',
      startTime: '10:00',
      endTime: '10:45',
      noShow: true,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
    {
      id: 11,
      name: 'Samiha Ragab',
      date: '2025-07-29',
      status: 'New',
      method: 'faceToFace',
      startTime: '15:00',
      endTime: '15:45',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
    {
      id: 12,
      name: 'Khaled Osama',
      date: '2025-07-28',
      status: 'Follow-up',
      method: 'online',
      startTime: '18:30',
      endTime: '19:00',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
    {
      id: 13,
      name: 'Yasmine Adel',
      date: '2025-07-24',
      status: 'Follow-up',
      method: 'faceToFace',
      startTime: '08:30',
      endTime: '09:00',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: true,
    },
    {
      id: 14,
      name: 'Ola Sherif',
      date: '2025-07-30',
      status: 'New',
      method: 'online',
      startTime: '14:00',
      endTime: '14:30',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
    {
      id: 15,
      name: 'Mohamed Galal',
      date: '2025-07-27',
      status: 'New',
      method: 'faceToFace',
      startTime: '17:15',
      endTime: '18:00',
      noShow: false,
      sessionEnded: false,
      sessionEndedEarly: false,
    },
  ]);
  // Omitted for brevity

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
          {sortedAppointments.length > 0 ? (
            sortedAppointments.map((app, index) => {
              const now = moment();
              const sessionStart = moment(
                `${app.date} ${app.startTime}`,
                'YYYY-MM-DD HH:mm',
              );

              const isToday = moment(app.date).isSame(moment(), 'day');
              const waitingForOnlineStart =
                isToday &&
                app.method === 'online' &&
                now.isBefore(sessionStart);

              const isFirst = index === 0;
              const isLast = index === sortedAppointments.length - 1;

              const currentAppStart = moment(app.startTime, 'HH:mm');
              const currentAppEnd = moment(app.endTime, 'HH:mm');

              let gapDuration = 0;
              if (index > 0) {
                const prevApp = sortedAppointments[index - 1];
                const prevEnd = moment(prevApp.endTime, 'HH:mm');
                gapDuration = currentAppStart.diff(prevEnd, 'minutes');
              }

              return (
                <View
                  key={app.id}
                  style={{ flexDirection: 'row', alignItems: 'flex-start' }}
                >
                  <TimelineIndicator
                    startTime={currentAppStart.format('hh:mm A')}
                    endTime={currentAppEnd.format('hh:mm A')}
                    isFirst={isFirst}
                    isLast={isLast}
                    showGap={gapDuration > 0}
                    gapMinutes={gapDuration}
                  />
                  <View style={{ flex: 1 }}>
                    <TodayScheduleCard
                      id={app.id}
                      name={app.name}
                      status={app.status}
                      method={app.method}
                      startTime={app.startTime}
                      endTime={app.endTime}
                      noShow={app.noShow}
                      sessionEnded={app.sessionEnded}
                      sessionEndedEarly={app.sessionEndedEarly}
                      disableActions={!isToday}
                      waitingForOnlineStart={waitingForOnlineStart}
                      onStart={() => console.log('Started', app.name)}
                      onNoShow={() =>
                        updateAppointmentState(app.id, { noShow: true })
                      }
                      onEndSession={() =>
                        updateAppointmentState(app.id, { sessionEnded: true })
                      }
                      onEndEarly={() =>
                        updateAppointmentState(app.id, {
                          sessionEndedEarly: true,
                        })
                      }
                    />
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.messageContainer}>
              <Text style={styles.title}>Today's Schedule</Text>
              <Text style={styles.subtitle}>
                You have no appointments to show.
              </Text>
            </View>
          )}
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
