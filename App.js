import 'react-native-gesture-handler';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {TopTabBar_Pend_Paid} from './Source/navigation';
import NotifyService from './Source/NotificationConfig/NotifyService';
import LoadingIndicator from './Source/components/LoadingIndicator';
import {AppProvider} from './Source/components/Provider';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      asyncItem: {
        currency: 'USD',
        notification_sound: true,
        notification_on: true,
        notification_vibrate: true,
        currencySymbol: '$',
      },
      setAsyncFromConsumer: updateValueObject => {
        this.setState({
          asyncItem: {
            ...this.state.asyncItem,
            ...updateValueObject,
          },
        });
      },
    };
  }
  componentDidMount = async () => {
    this.getAysncData();
    NotifyService.clearNotifAndScheduleNotications();
  };

  getAysncData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_preferences');
      if (value === null) {
        await AsyncStorage.setItem(
          'user_preferences',
          JSON.stringify({
            currency: 'USD',
            notification_sound: true,
            notification_on: true,
            notification_vibrate: true,
            currencySymbol: '$',
          }),
        );

        this.setState({loading: false});
      } else {
        console.log('Valueeeeeeeeeee=>', value);
        this.setState({asyncItem: JSON.parse(value)});
        console.log('UPdated');
        this.setState({loading: false});
        // setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    console.log('Render App;');
    if (this.state.loading) {
      return <LoadingIndicator />;
    }
    return (
      <AppProvider.Provider value={this.state}>
        <TopTabBar_Pend_Paid />
      </AppProvider.Provider>
    );
  }
}

export default App;
