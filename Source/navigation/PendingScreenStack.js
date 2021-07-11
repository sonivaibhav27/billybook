import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {
  ADD_NEW_BILL,
  BILL_IN_DETAIL,
  GENERATE_REPORT_SCREEN,
  NEW_PAID_SCREEN,
  PENDING_BILL_SCREEN,
  SEARCH_SCREEN,
  SETTINGS_SCREEN,
} from '../components/navigationTypes';
import {
  BillInDetail,
  PendingBillNew,
  SearchBillScreen,
  Settings,
} from '../Screens';
import CreateDummy from '../Screens/PendingBills/CreateDummy';
import PaidScreen from '../Screens/PaidScreen';
import GenerateReportScreen from '../Screens/PendingBills/GenerateReportScreen';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';

enableScreens();
const {Navigator, Screen} = createNativeStackNavigator();
const PendingScreenStack = () => (
  <NavigationContainer>
    <Navigator>
      <Screen
        options={{
          headerShown: false,
        }}
        name={PENDING_BILL_SCREEN}
        component={PendingBillNew}
      />
      <Screen
        options={({route}) => {
          console.log(route.params.title);
          return {
            headerShown: false,
            headerTitle: route.params.title,
          };
        }}
        name={ADD_NEW_BILL}
        component={CreateDummy}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name={BILL_IN_DETAIL}
        component={BillInDetail}
      />
      <Screen
        options={{
          headerShown: false,
          stackAnimation: 'slide_from_right',
        }}
        name={NEW_PAID_SCREEN}
        component={PaidScreen}
      />
      <Screen
        options={{
          headerShown: false,
          stackAnimation: 'slide_from_right',
        }}
        name={SEARCH_SCREEN}
        component={SearchBillScreen}
      />
      <Screen
        options={{
          headerShown: false,
          stackAnimation: 'slide_from_right',
        }}
        name={SETTINGS_SCREEN}
        component={Settings}
      />
      <Screen
        options={{
          headerShown: false,
          stackAnimation: 'slide_from_right',
        }}
        name={GENERATE_REPORT_SCREEN}
        component={GenerateReportScreen}
      />
    </Navigator>
  </NavigationContainer>
);

export default PendingScreenStack;
