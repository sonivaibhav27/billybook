import 'react-native-gesture-handler';
import React from 'react';
import {TopTabBar_Pend_Paid} from './Source/navigation';
import {AddFundScreen} from './Source/Screens';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingIndicator from './Source/components/LoadingIndicator';
import {AppProvider} from './Source/components/Provider';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      asyncItem: null,
      setAsyncFromConsumer: (property, newValue) => {
        this.setState({
          asyncItem: {
            ...this.state.asyncItem,
            [property]: newValue,
          },
        });
      },
    };
  }
  componentDidMount = async () => {
    this.getAysncData();
  };

  getAysncData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_preference');
      if (value === null) {
        await AsyncStorage.setItem(
          'user_preference',
          JSON.stringify({
            currency: 'USD',
            notification_sound: true,
            notification_on: true,
            notification_vibrate: true,
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
