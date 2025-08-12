import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TopNavBar from '../../components/topNavBar';
import ControlTabs from '../../components/controlTabs';
import RequestOptionCard from '../../components/requestOptionCard';
import RequestCard from '../../components/requestCard';
import DayOff from '../../assets/icons/dayOff';
import PeriodOff from '../../assets/icons/periodOff';
import { useNavigation } from '@react-navigation/native';

export default function MyRequestScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigation = useNavigation();

  const tabs = ['New', 'Pending', 'Completed'];

  // Dummy request data for demo
  const pendingRequests = [
    {
      id: 1,
      title: 'Day off request',
      clientName: 'John Doe',
      sessionFrequency: 'Weekly',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Period off request',
      clientName: 'Jane Smith',
      sessionFrequency: 'Monthly',
      status: 'pending',
    },
  ];

  const completedRequests = [
    {
      id: 3,
      title: 'Day off request',
      clientName: 'Alice Brown',
      sessionFrequency: 'Weekly',
      status: 'completed',
    },
  ];

  // helper function that decides which set of requests to display depending on the selected tab
  const renderRequests = () => {
    const data = selectedIndex === 1 ? pendingRequests : completedRequests;

    return (
      <ScrollView contentContainerStyle={styles.requestsList}>
        {data.map(req => (
          <RequestCard
            key={req.id}
            title={req.title}
            clientName={req.clientName}
            sessionFrequency={req.sessionFrequency}
            status={req.status}
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <LinearGradient
      colors={['#0C3862', '#5AA5EE']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientBackground}
    >
      <TopNavBar title="My Request" showBell={true} />

      <View style={styles.container}>
        <ControlTabs
          tabs={tabs}
          selectedIndex={selectedIndex}
          onTabPress={setSelectedIndex}
        />

        {selectedIndex === 0 ? (
          <View style={styles.cardsContainer}>
            <RequestOptionCard
              icon={<DayOff width={80} height={90} />}
              label="Day off Request"
              onPress={() => navigation.navigate('Day Off Request')}
            />
            <RequestOptionCard
              icon={<PeriodOff width={80} height={90} />}
              label="Period off Request"
              onPress={() => navigation.navigate('Period Off Request')}
            />
          </View>
        ) : (
          renderRequests()
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: 10,
    position: 'relative',
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
  },
  requestsList: {
    paddingVertical: 16,
    gap: 12,
    alignItems: 'center',
  },
});
