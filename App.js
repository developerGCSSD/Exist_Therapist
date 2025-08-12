import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import store from './src/store/reduxStore';

import LoginScreen from './src/Features/auth/LoginScreen';
import TodaySchedule from './src/Features/todaySchedule/TodayScheduleScreen';
import DashboardScreen from './src/Features/dashboard/DashBoard';
import ToDoScreen from './src/Features/todo/Todo';
import MyRequestScreen from './src/Features/myRequest/MyRequest';
import OnboardingScreen from './src/Features/onboarding/onboarding';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Calendar from './src/assets/icons/calendar';
import DashBoardAndTodo from './src/assets/icons/dashbord&todo';
import MyRequest from './src/assets/icons/myRequest';

import ChangeMethodRequestScreen from './src/Features/changeSessionMethod/changeSessionethod';
import RescheduleRequestScreen from './src/Features/reschedule/reschedule';
import ScheduleRequestScreen from './src/Features/scheduleUpcomingSession/scheduleUpcoming';
import TransferRequestScreen from './src/Features/transfer/transfer';
import CancelRequestScreen from './src/Features/cancelRequest/cancelReauest';

import DayOffRequestScreen from './src/Features/dayOffRequest/dayOff';
import PeriodOffRequestScreen from './src/Features/periodOffRequest/periodOff';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#3463E9',
        tabBarInactiveTintColor: '#8A8AA3',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0, // remove default border
          elevation: 8, // Android shadow
          shadowColor: '#000', // iOS shadow
          shadowOpacity: 0.2,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: -2 },
        },
        tabBarIcon: ({ focused }) => {
          const iconColor = focused ? '#3463E9' : '#8A8AA3';

          if (route.name === 'Schedule') {
            return <Calendar color={iconColor} filled={focused} />;
          }

          if (route.name === 'Dashboard' || route.name === 'To Do') {
            return <DashBoardAndTodo color={iconColor} />;
          }

          if (route.name === 'My Request') {
            return <MyRequest color={iconColor} />;
          }

          return null;
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Schedule" component={TodaySchedule} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="To Do" component={ToDoScreen} />
      <Tab.Screen name="My Request" component={MyRequestScreen} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={BottomTabs} />
      <Stack.Screen
        name="Change Method"
        component={ChangeMethodRequestScreen}
      />
      <Stack.Screen name="Reschedule" component={RescheduleRequestScreen} />
      <Stack.Screen
        name="Schedule Upcoming"
        component={ScheduleRequestScreen}
      />
      <Stack.Screen name="Transfer" component={TransferRequestScreen} />
      <Stack.Screen name="Cancel Request" component={CancelRequestScreen} />
      <Stack.Screen name="Day Off Request" component={DayOffRequestScreen} />
      <Stack.Screen
        name="Period Off Request"
        component={PeriodOffRequestScreen}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ActionSheetProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ActionSheetProvider>
    </Provider>
  );
}
