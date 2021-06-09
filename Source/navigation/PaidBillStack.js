import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PAID_BILL_SCREEN, PARTICULAR_BILL} from '../components/navigationTypes';
import {PaidBillScreen, ParticularBillScreen} from '../Screens';

const {Navigator, Screen} = createStackNavigator();
const PaidBillStack = () => (
  <Navigator>
    <Screen name={PARTICULAR_BILL} component={ParticularBillScreen} />
  </Navigator>
);

export default PaidBillStack;
