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

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Calendar from './src/assets/icons/calendar';
import DashBoardAndTodo from './src/assets/icons/dashbord&todo';
import MyRequest from './src/assets/icons/myRequest';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#3463E9',
        tabBarInactiveTintColor: '#8A8AA3',
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
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={BottomTabs} />
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
