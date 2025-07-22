import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './src/store/reduxStore';

import LoginScreen from './src/Features/auth/LoginScreen';
import TodaySchedule from './src/Features/todaySchedule/TodayScheduleScreen';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={TodaySchedule} />
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
