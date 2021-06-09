import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ADD_NEW_BILL,
  PARTICULAR_BILL,
  PENDING_SCREEN_STACK,
} from '../components/navigationTypes';
import {CreateBillScreen, ParticularBillScreen} from '../Screens';
import {enableScreens} from 'react-native-screens';
import PendingScreenStack from './PendingScreenStack';

enableScreens();
const Stack = createStackNavigator();

const HomeTopTab = () => {
  return (
    <NavigationContainer>
      {/* <StatusBar backgroundColor={'#182055'} /> */}

      <Stack.Navigator
        screenOptions={{
          animationEnabled: true,
        }}>
        <Stack.Screen
          options={{headerShown: false}}
          name={PENDING_SCREEN_STACK}
          component={PendingScreenStack}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={ADD_NEW_BILL}
          component={CreateBillScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={PARTICULAR_BILL}
          component={ParticularBillScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeTopTab;
