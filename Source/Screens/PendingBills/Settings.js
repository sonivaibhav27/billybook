import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Switch} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Colors} from '../../components/Color';
import CurrencyModal from '../../components/CurrencyModal';
import Header from '../../components/Header';
import LoadingIndicator from '../../components/LoadingIndicator';
import {AppProvider} from '../../components/Provider';

const RowItem = ({title, onPress = () => {}, userPrefer}) => {
  return (
    <View style={styles.rowContainer}>
      <Text>Currency</Text>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
            paddingHorizontal: 10,
          }}
          onPress={onPress}
          activeOpacity={1}>
          <Text style={styles.rowText}>Default {title}</Text>
          <Text style={[styles.rowText]}>{userPrefer} ></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Settings = () => {
  const [showCurrencyPicker, setShowCurrencyPicker] = React.useState(false);
  const [notificationOn, setNotificationOn] = React.useState(notification_on);
  const [notificationSound, setNotificationSound] = React.useState();
  const {
    asyncItem: {currency, notification_on},
    setAsyncFromConsumer,
  } = React.useContext(AppProvider);
  console.log(notification_on);
  const selectCurrency = React.useCallback(newCurrency => {
    if (newCurrency !== currency) {
      setAsyncFromConsumer('currency', newCurrency);
    }
  }, []);
  return (
    <View style={styles.container}>
      <Header isBackable headerText="Settings" />
      <View>
        <RowItem
          title="Currency"
          userPrefer={currency}
          onPress={() => {
            setShowCurrencyPicker(true);
          }}
        />
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 14}}>Notification</Text>
          <View style={{marginTop: 10, backgroundColor: '#fff', padding: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#FFF',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#111',
                }}>
                Enable Notification
              </Text>
              <Switch
                thumbColor={Colors.primary}
                trackColor={'#000'}
                value={notificationOn}
                onValueChange={v => {
                  // setNotificationOn(v);
                  setNotificationOn(v => !v);
                  setAsyncFromConsumer('notification_on', notificationOn);
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#FFF',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#111',
                }}>
                Notification Sound
              </Text>
              <Switch
                thumbColor={Colors.primary}
                trackColor={'#000'}
                value={notificationOn}
                onValueChange={v => {
                  setNotificationOn(v);
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#FFF',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#111',
                }}>
                Vibration
              </Text>
              <Switch
                thumbColor={Colors.primary}
                trackColor={'#000'}
                value={notificationOn}
                onValueChange={v => {
                  setNotificationOn(v);
                }}
              />
            </View>
          </View>
        </View>
      </View>
      {showCurrencyPicker && (
        <CurrencyModal
          closeModal={() => {
            setShowCurrencyPicker(false);
          }}
          setCurrency={selectCurrency}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    // paddingHorizontal: 20,
  },
  rowContainer: {
    // marginHorizontal: 20,
    backgroundColor: '#fff',
    // marginTop: 10,
    // paddingVertical: 5,
    padding: 10,
    marginTop: 10,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // flexDirection: 'row',
  },
  rowText: {
    fontSize: 15,
    color: '#222',
  },
});

export default Settings;
