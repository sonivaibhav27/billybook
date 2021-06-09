import React from 'react';
import {Text, View} from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  ADD_NEW_BILL,
  BILL_IN_DETAIL,
  NEW_PAID_SCREEN,
  PENDING_BILL_SCREEN,
  SEARCH_SCREEN,
  SETTINGS_SCREEN,
} from '../components/navigationTypes';
import {
  BillInDetail,
  CreateBillScreen,
  PendingBillNew,
  PendingBillScreen,
  SearchBillScreen,
  Settings,
} from '../Screens';
import CreateDummy from '../Screens/PendingBills/CreateDummy';
import PaidScreen from '../Screens/PaidScreen';

const {Navigator, Screen} = createStackNavigator();
const PendingScreenStack = () => (
  <Navigator>
    <Screen
      options={{
        headerShown: false,
      }}
      name={PENDING_BILL_SCREEN}
      component={PendingBillNew}
    />
    <Screen
      options={{
        headerShown: false,
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
      }}
      name={NEW_PAID_SCREEN}
      component={PaidScreen}
    />
    <Screen
      options={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      name={SEARCH_SCREEN}
      component={SearchBillScreen}
    />
    <Screen
      options={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      name={SETTINGS_SCREEN}
      component={Settings}
    />
  </Navigator>
);

export default PendingScreenStack;
