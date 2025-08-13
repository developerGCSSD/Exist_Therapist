import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import WeeklyCalendar from '../../components/calendar';
import TopNavBar from '../../components/topNavBar';
import SegmentedTabs from '../../components/segmentedTaps';
import TodayScheduleCard from '../../components/todayScheduleCard';
import TimelineIndicator from '../../components/timeLineIndecator';
import AvailableTimeCard from '../../components/availableTimeCard';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTherapistSchedule } from '../todaySchedule/scheduleSlice';
import { retrieveToken } from '../../storage/asyncStorage';

const NAVBAR_HEIGHT = '14%';

export default function TodaySchedule({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('now');
  const [selectedDate, setSelectedDate] = useState(moment());
  const [completedOnlineClientIds, setCompletedOnlineClientIds] = useState([]);
  const [noShowClientIds, setNoShowClientIds] = useState([]);
  const [endedEarlyClientIds, setEndedEarlyClientIds] = useState([]);
  const [endedClientIds, setEndedClientIds] = useState([]);

  // console.log('🔍 Selected Date:', selectedDate.format('MM/DD/YYYY'));

  const profileId = useSelector(state => state.user.profileId);

  const therapistName = useSelector(
    state => state.therapistSchedule.therapistName,
  );
  // console.log('🔍 Therapist Name:', therapistName);

  const dispatch = useDispatch();
  const therapistSchedule = useSelector(state => state.therapistSchedule);

  const clientBookings = useSelector(
    state => state.therapistSchedule?.clientBookings || [],
  );

  useEffect(() => {
    // console.log('🔍 Full therapistSchedule:', therapistSchedule);
  }, [therapistSchedule]);

  useEffect(() => {
    if (selectedDate) {
      dispatch(fetchTherapistSchedule(selectedDate));
    }
  }, [selectedDate]);

  useEffect(() => {
    console.log('Client Bookings:', clientBookings);
  }, [clientBookings]);

  const handleDatePress = date => {
    if (date) {
      // console.log('Selected date:', date.format('MM/DD/YYYY'));
      setSelectedDate(date);
    } else {
      // console.log('Date cleared');
      setSelectedDate(moment());
    }
  };
  const markAsCompleted = clientId => {
    setCompletedOnlineClientIds(prev => [...new Set([...prev, clientId])]);
  };

  const tabs = [
    { label: 'Now', value: 'now' },
    { label: 'Previous', value: 'previous' },
  ];

  const nowTime = moment();

  const filteredAppointments = clientBookings.filter(app => {
    const start = moment(
      `${selectedDate.format('M/D/YYYY')} ${app.from}`,
      'M/D/YYYY hh:mm A',
    );

    const end = moment(
      `${selectedDate.format('M/D/YYYY')} ${app.to}`,
      'M/D/YYYY hh:mm A',
    );

    const method = app.method?.toLowerCase();
    const isCompletedOnline = completedOnlineClientIds.includes(app.clientId);

    const isPastDate = selectedDate.isBefore(moment(), 'day');
    const isToday = selectedDate.isSame(moment(), 'day');
    const isFutureDate = selectedDate.isAfter(moment(), 'day');
    const hasEnded = end.isBefore(nowTime);

    if (selectedTab === 'now') {
      if (isToday) {
        return !hasEnded && !isCompletedOnline;
      } else if (isFutureDate) {
        return !isCompletedOnline;
      }
      return false;
    }

    if (selectedTab === 'previous') {
      return (
        isPastDate ||
        (isToday && hasEnded) ||
        noShowClientIds.includes(app.clientId) ||
        endedClientIds.includes(app.clientId) ||
        endedEarlyClientIds.includes(app.clientId) ||
        completedOnlineClientIds.includes(app.clientId)
      );
    }

    return false;
  });

  const sortedAppointments = [...filteredAppointments].sort((a, b) =>
    moment(a.from, 'hh:mm A').diff(moment(b.from, 'hh:mm A')),
  );

  const generateHourlyTimeline = appointments => {
    if (appointments.length === 0) return [];

    const appointmentTimes = appointments.map(app => ({
      start: moment(app.from, 'hh:mm A'),
      end: moment(app.to, 'hh:mm A'),
      original: app,
    }));

    const earliestStart = moment.min(appointmentTimes.map(a => a.start));
    const minStart = earliestStart.clone().startOf('hour');

    const latestStart = moment.max(appointmentTimes.map(a => a.start));
    const maxEnd = latestStart.clone().endOf('hour');

    const blocks = [];
    let cursor = minStart.clone();
    while (cursor.isBefore(maxEnd)) {
      const nextHour = cursor.clone().add(1, 'hour');

      const match = appointmentTimes.find(
        a => a.start.isBefore(nextHour) && a.end.isAfter(cursor),
      );

      if (match) {
        blocks.push({
          type: 'appointment',
          startTime: cursor.format('hh:mm A'),
          endTime: nextHour.format('hh:mm A'),
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
          showHamburger={true}
        />
      </View>

      <View style={styles.contentContainer}>
        <WeeklyCalendar onDatePress={handleDatePress} />

        {/* <Text
          style={{
            color: '#5AA5EE',
            fontSize: 10,
            textAlign: 'center',
            marginVertical: 8,
          }}
        >
          Therapist ID: {profileId}
        </Text> */}

        <SegmentedTabs
          tabs={tabs}
          selected={selectedTab}
          onSelect={setSelectedTab}
        />

        <ScrollView contentContainerStyle={styles.cardsContainer}>
          {sortedAppointments.length === 0 ? (
            <Text
              style={{
                color: '#6C6C89',
                textAlign: 'center',
                marginTop: 20,
                fontStyle: 'italic',
              }}
            >
              {selectedTab === 'now'
                ? 'No sessions available right now.'
                : 'No previous sessions to show.'}
            </Text>
          ) : (
            generateHourlyTimeline(sortedAppointments).map(
              (item, index, arr) => {
                if (selectedTab === 'previous' && item.type === 'available') {
                  return null;
                }

                const start = moment(item.startTime, 'HH:mm');
                const end = moment(item.endTime, 'HH:mm');

                return (
                  <View
                    key={index}
                    style={{ flexDirection: 'row', alignItems: 'flex-start' }}
                  >
                    <TimelineIndicator
                      startTime={start.format('hh:00 A')}
                      endTime={end.format('hh:00 A')}
                      isFirst={index === 0}
                      isLast={index === arr.length - 1}
                      isGap={item.type === 'available'}
                    />

                    <View style={{ flex: 1 }}>
                      {item.type === 'appointment' ? (
                        <>
                          {/* {console.log(
                            '🧪 Rendering appointment:',
                            item.data.clientName,
                            item.data.method,
                          )} */}
                          <TodayScheduleCard
                            date={selectedDate}
                            therapistName={therapistName}
                            id={item.data.clientId}
                            reservationStatus={item.data.reservationStatus}
                            showReservationStatus={selectedTab === 'previous'}
                            name={item.data.clientName}
                            method={item.data.method}
                            startTime={item.data.from}
                            endTime={item.data.to}
                            status={item.data.sessionType}
                            currentArea={item.data.currentArea}
                            disableActions={
                              !moment(
                                therapistSchedule.date,
                                'M/D/YYYY',
                              ).isSame(moment(), 'day')
                            }
                            waitingForOnlineStart={
                              item.data.method?.toLowerCase() === 'online' &&
                              moment(
                                `${therapistSchedule.date} ${item.data.from}`,
                                'M/D/YYYY hh:mm A',
                              ).isAfter(moment())
                            }
                            noShow={noShowClientIds.includes(
                              item.data.clientId,
                            )}
                            sessionEnded={endedClientIds.includes(
                              item.data.clientId,
                            )}
                            sessionEndedEarly={endedEarlyClientIds.includes(
                              item.data.clientId,
                            )}
                            onStart={() =>
                              console.log('Started', item.data.clientName)
                            }
                            onNoShow={() => {
                              setNoShowClientIds(prev => [
                                ...new Set([...prev, item.data.clientId]),
                              ]);
                            }}
                            onEndSession={() => {
                              setEndedClientIds(prev => [
                                ...new Set([...prev, item.data.clientId]),
                              ]);
                              if (item.data.method.toLowerCase() === 'online') {
                                markAsCompleted(item.data.clientId);
                              }
                            }}
                            onEndEarly={duration => {
                              setEndedEarlyClientIds(prev => [
                                ...new Set([...prev, item.data.clientId]),
                              ]);
                              if (item.data.method.toLowerCase() === 'online') {
                                markAsCompleted(item.data.clientId);
                              }
                            }}
                          />
                        </>
                      ) : (
                        <AvailableTimeCard
                          startTime={start.format('hh:mm A')}
                          endTime={end.format('hh:mm A')}
                        />
                      )}
                    </View>
                  </View>
                );
              },
            )
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
    paddingHorizontal: 0,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: 10,
    position: 'relative',
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
