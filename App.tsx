import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from './theme';
import { AppProvider, useApp } from './AppContext';
import { RootStackParamList } from './NavigationTypes';

import { BottomTabNavigator } from './BottomTabNavigator';
import { PhoneScreen } from './PhoneScreen';
import { OTPScreen } from './OTPScreen';
import { RegisterScreen } from './RegisterScreen';
import { KYCScreen } from './KYCScreen';
import { JobDetailScreen } from './JobDetailScreen';
import { ActiveDeliveryScreen } from './ActiveDeliveryScreen';
import { ChatScreen } from './ChatScreen';
import { RatingScreen } from './RatingScreen';
import { NotificationsScreen } from './NotificationsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { appState } = useApp();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      {appState === 'auth' ? (
        <>
          <Stack.Screen name="Phone" component={PhoneScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : appState === 'kyc' ? (
        <Stack.Screen name="KYC" component={KYCScreen} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
          <Stack.Screen name="JobDetail" component={JobDetailScreen} />
          <Stack.Screen name="ActiveDelivery" component={ActiveDeliveryScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen
            name="Rating"
            component={RatingScreen}
            options={{ animation: 'slide_from_bottom' }}
          />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <AppProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
};

export default App;
