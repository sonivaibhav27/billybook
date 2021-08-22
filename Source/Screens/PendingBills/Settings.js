import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  TouchableNativeFeedback,
  Linking,
  NativeModules,
  ToastAndroid,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import {Colors} from '../../components/Color';
import CurrencyModal from '../../components/CurrencyModal';
import Header from '../../components/Header';
import {AppProvider} from '../../components/Provider';

const nativeModule = NativeModules.MoneyFormat;
const RowItem = ({title, onPress = () => {}, userPrefer}) => {
  return (
    <View style={{}}>
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
            // paddingHorizontal: 10,
          }}
          onPress={onPress}
          activeOpacity={1}>
          <Text style={styles.rowText}>{title}</Text>
          <Text style={[styles.rowText, styles.userPreferText]}>
            {userPrefer}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const RowWithSwitch = ({onValueChange, value, label}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        marginTop: 5,
      }}>
      <Text
        style={{
          fontSize: 16,
          color: '#111',
        }}>
        {label}
      </Text>
      <Switch
        thumbColor={Colors.primary}
        trackColor={'#000'}
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );
};
const Settings = () => {
  const [showCurrencyPicker, setShowCurrencyPicker] = React.useState(false);
  const [notificationVibrate, setNotificationVibrate] =
    React.useState(notification_vibrate);
  const [notificationSound, setNotificationSound] =
    React.useState(notification_sound);
  const [androidVersion, setAndroidVersion] = React.useState(null);
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [userPreferTime, setUserPreferTime] = React.useState(null);
  const {
    asyncItem: {
      currency,
      notification_on,
      notification_sound,
      notification_vibrate,
      currencySymbol,
    },
    setAsyncFromConsumer,
  } = React.useContext(AppProvider);

  console.log('Currency Symbol', currencySymbol);
  React.useEffect(() => {
    (async function () {
      const getTimeFromStorage = await AsyncStorage.getItem(
        'User-Notification-Time',
      );
      console.log(getTimeFromStorage);
      if (getTimeFromStorage) {
        setUserPreferTime(JSON.parse(getTimeFromStorage));
      }
    })();
  }, []);
  const selectCurrency = React.useCallback(
    (newCurrency, newCurrencySymbol) => {
      console.log(newCurrencySymbol);
      if (newCurrency !== currency) {
        setAsyncFromConsumer({
          currencySymbol: newCurrencySymbol,
          currency: newCurrency,
        });
      }
    },
    [currency],
  );
  const goToSetting = () => {
    Linking.openSettings().catch(er => {
      console.log(er);
    });
  };
  React.useEffect(() => {
    try {
      nativeModule.getAndroidVersion(version => {
        if (version != null) {
          setAndroidVersion(version);
        }
      });
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }, []);

  const openGmail = () => {
    // alert('a');
    Linking.openURL('mailto:vidowndownload@gmail.com').catch(er => {
      alert(er);
    });
  };
  const openPlayStore = () => {
    try {
      Linking.openURL('market://details?id=com.vidown');
    } catch (_) {}
  };

  const onNotificationTimeClicked = () => {
    setShowTimePicker(!showTimePicker);
  };
  const onChangeTime = (_, time: Date) => {
    if (time) {
      userPreferNotificationTime(time);
      setUserPreferTime(time);
    }
    setShowTimePicker(false);
  };

  const userPreferNotificationTime = async (time: Date) => {
    try {
      await AsyncStorage.setItem(
        'User-Notification-Time',
        JSON.stringify(time),
      );
    } catch (err) {
      //show err to user;
    }
  };

  const toHourandMinute = () => {
    if (userPreferTime) {
      const date = new Date(userPreferTime);
      const minuteFormat =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      return `${date.getHours()}:${minuteFormat}`;
    }
  };

  return (
    <View style={styles.container}>
      <Header isBackable headerText="Settings" />
      <View
        style={{
          marginTop: 10,
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#eee',
            padding: 10,
            marginBottom: 10,
          }}>
          <Text style={styles.label}>Currency</Text>
          <RowItem
            title="Currency"
            userPrefer={currency}
            onPress={() => {
              setShowCurrencyPicker(true);
            }}
          />
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.label}>Notification</Text>
          <View>
            <RowItem
              title="Notification Time"
              onPress={onNotificationTimeClicked}
              userPrefer={userPreferTime ? `${toHourandMinute()}` : '5:00'}
            />
            <RowWithSwitch
              label="Notification Sound"
              value={notificationSound}
              onValueChange={v => {
                // setNotificationSound(v);
                setAsyncFromConsumer('notification_sound', v);
                setNotificationSound(v);
              }}
            />
            <RowWithSwitch
              label="Vibrate"
              onValueChange={e => {
                setNotificationVibrate(e);
              }}
              value={notificationVibrate}
            />
            <TouchableNativeFeedback
              onPress={goToSetting}
              style={{marginTop: 5}}>
              <View style={{paddingVertical: 5}}>
                <Text style={styles.rowText}>Turn on/off notifications</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>To Developer</Text>
        <TouchableNativeFeedback onPress={openGmail}>
          <View style={{paddingVertical: 5}}>
            <Text style={styles.rowText}>
              Suggest a new feature / Report Bug
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Liked our app?</Text>
        <Text style={[styles.rowText, {fontSize: 12, textAlign: 'center'}]}>
          Please rate us at play store, as it will help the app to get more
          downloads
        </Text>
        <TouchableNativeFeedback
          style={{marginTop: 10}}
          onPress={openPlayStore}>
          <View
            style={{
              backgroundColor: Colors.primary,
              padding: 10,
              marginTop: 10,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
              Rate us
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      {androidVersion != null && (
        <View>
          <Text style={styles.androidVersionText}>
            version: {androidVersion} 🚀
          </Text>
        </View>
      )}
      {showCurrencyPicker && (
        <CurrencyModal
          closeModal={() => {
            setShowCurrencyPicker(false);
          }}
          setCurrency={selectCurrency}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          onChange={onChangeTime}
          value={new Date()}
          mode="time"
          is24Hour
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
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
    // marginTop: 10,
    // paddingVertical: 5,

    // justifyContent: 'space-between',
    // alignItems: 'center',
    // flexDirection: 'row',
  },
  rowText: {
    fontSize: 17,
    color: '#222',
  },
  label: {
    fontSize: 14,
    color: '#222',
    fontFamily: 'OpenSans-Regular',
  },
  androidVersionText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 15,
    color: '#222',
    fontWeight: '600',
  },
  userPreferText: {
    color: Colors.primary,
    fontFamily: 'OpenSans-Bold',
  },
});

export default Settings;
