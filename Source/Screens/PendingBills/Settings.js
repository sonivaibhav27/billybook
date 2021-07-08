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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Colors} from '../../components/Color';
import CurrencyModal from '../../components/CurrencyModal';
import Header from '../../components/Header';
import LoadingIndicator from '../../components/LoadingIndicator';
import {AppProvider} from '../../components/Provider';

const nativeModule = NativeModules.MoneyFormat;
const RowItem = ({title, onPress = () => {}, userPrefer}) => {
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.label}>Currency</Text>
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
          <Text style={styles.rowText}>Default {title}</Text>
          <Text style={[styles.rowText]}>{userPrefer} ></Text>
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
  const {
    asyncItem: {
      currency,
      notification_on,
      notification_sound,
      notification_vibrate,
    },
    setAsyncFromConsumer,
  } = React.useContext(AppProvider);
  console.log(notification_on);
  const selectCurrency = React.useCallback(newCurrency => {
    if (newCurrency !== currency) {
      setAsyncFromConsumer('currency', newCurrency);
    }
  }, []);
  const goToSetting = () => {
    Linking.openSettings().catch(er => {
      console.log(er);
    });
  };
  React.useEffect(() => {
    console.log(nativeModule);
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
    Linking.openURL('market://details?id=com.vidown');
  };
  return (
    <View style={styles.container}>
      <Header isBackable headerText="Settings" />
      <View style={{marginTop: 10}}>
        <RowItem
          title="Currency"
          userPrefer={currency}
          onPress={() => {
            setShowCurrencyPicker(true);
          }}
        />
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Notification</Text>
          <View>
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
    borderWidth: 1,
    borderColor: '#eee',
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
});

export default Settings;
