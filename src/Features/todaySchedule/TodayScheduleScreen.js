import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import WeeklyCalendar from '../../components/calendar';
import TopNavBar from '../../components/topNavBar';

const NAVBAR_HEIGHT = '14%'; // Height of the top navigation bar

export default function TodaySchedule({ navigation }) {
  const handleDatePress = date => {
    if (date) {
      console.log('Selected date:', date.format('YYYY-MM-DD'));
    } else {
      console.log('Date cleared');
    }
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
        <View>
          <WeeklyCalendar onDatePress={handleDatePress} />
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.title}>Today's Schedule</Text>
          <Text style={styles.subtitle}>You have no appointments today.</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
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
});
