import {useNavigation} from '@react-navigation/core';
import React, {memo} from 'react';
import {useState} from 'react';
import {
  LayoutAnimation,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import moment from 'moment';
import DatePicker from '@react-native-community/datetimepicker';
import {Colors} from './Color';
import {BILL_IN_DETAIL, PARTICULAR_BILL} from './navigationTypes';
import {normalize} from './TextSize';
import {heightToDp} from './Responsive';
import {AntDesign, Entypo} from './Icons';
// import Animated, {
//   Easing,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const nativeModule = NativeModules.MoneyFormat;
const Card = ({item, isCallFromPaidScreen = false, over, deleteBill}) => {
  const [open, setOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [amountConverted, setAmountConvert] = useState(item.billAmount);
  const navigation = useNavigation();
  const goToParticularBillScreen = () => {
    navigation.navigate(PARTICULAR_BILL);
  };
  function openAccordion() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(!open);
  }
  function userTriesToSelectDate() {
    setDateOpen(true);
  }

  function goToBillInDetail(item) {
    navigation.navigate(BILL_IN_DETAIL, {
      item,
      over,
      callFromPaid: isCallFromPaidScreen,
    });
  }
  console.log(typeof item.dueDate);
  console.log(moment(String(20210518), 'YYYYMMDD').format('MMM D, YYYY'));

  // const _sharedValue = useSharedValue(item.billAmount);
  React.useState(() => {
    nativeModule.getCurrency(item.billAmount, 'USD', amount => {
      setAmountConvert(amount);
    });
    nativeModule.getLocaleCurrency(e => {
      // alert(e);
    });
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onLongPress={() => {
        deleteBill(item);
      }}
      style={[
        styles.container,
        {
          // borderWidth: item.overdue ? 0.5 : 0,
          borderColor: over ? Colors.tomato : Colors.primary,
          // backgroundColor: item.overdue ? Colors.lightTomato : 'white',
          // elevation: item.overdue ? 0 : 3,
          borderLeftWidth: 4,
        },
      ]}>
      {over && (
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.tomato,
            padding: 6,
            alignItems: 'center',
            alignSelf: 'flex-start',
            borderRadius: 8,
            elevation: 2,
            marginRight: 3,
          }}>
          <Entypo name="warning" color="white" />
          <Text
            style={{
              marginLeft: 2,
              color: 'white',
              fontSize: 9,
              fontFamily: 'Raleway-Bold',
            }}>
            Overdue
          </Text>
        </View>
      )}
      <View style={styles.titleAndDateContainer}>
        <Text
          style={{
            fontFamily: 'Raleway-SemiBold',
            color: Colors.textColor,
            fontSize: 16,
          }}>
          {item.billName}
          {'\n'}
          {item.type}
        </Text>
        <TouchableOpacity
          onPress={() => goToBillInDetail(item)}
          style={styles.markPaidContainer}>
          <Text
            style={{
              marginRight: 5,
              color: '#000',
              fontWeight: '700',
            }}>
            {isCallFromPaidScreen ? 'View' : 'Pay'}
          </Text>
          <AntDesign name="arrowright" size={15} color={'#000'} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderWidth: item.overdue ? 0.3 : 0.8,
          marginTop: 10,
          borderColor: item.overdue ? '#999' : '#eee',
        }}
      />
      <View style={styles.moneyAndMarkContainer}>
        <Text style={styles.dueDateText}>
          {isCallFromPaidScreen
            ? moment(item.paidOn, 'YYYYMMDD').format('MMM D , YYYY')
            : moment(item.dueDate, 'YYYYMMDD').format('MMM D , YYYY')}
        </Text>
        <View
          style={[
            styles.moneyContainer,
            {
              backgroundColor: isCallFromPaidScreen
                ? '#c5fad5'
                : Colors.lightTomato,
            },
          ]}>
          <Animated.Text style={styles.moneyText}>
            {amountConverted}
          </Animated.Text>
        </View>
      </View>
      {open && (
        <View style={styles.extraDataContainer}>
          <Text style={styles.paid}>Paid on</Text>
          <View style={styles.paidOnContainer}>
            <Text style={styles.paidText}>Today</Text>
            <Text style={styles.paidText}>Yesterday</Text>
            <TouchableOpacity activeOpacity={1} onPress={userTriesToSelectDate}>
              <Text style={styles.paidText}>Select Date</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {dateOpen && <DatePicker value={new Date()} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFF',
    // elevation: 2,
    // elevation: 5,
    marginBottom: 10,
    elevation: 1,
  },
  dueDateText: {
    color: '#222',
    fontSize: heightToDp('2.4%'),
    fontFamily: 'Raleway-Bold',
  },
  titleAndDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moneyAndMarkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  moneyContainer: {
    paddingHorizontal: 8,
    // backgroundColor: 'rgba(255, 203, 55, 0.2)',
    paddingVertical: 4,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 55,
    backgroundColor: Colors.lightTomato,
  },
  markPaidContainer: {
    backgroundColor: 'rgba(71,116,235,0.1)',
    paddingHorizontal: 15,
    borderRadius: 100,
    justifyContent: 'center',
    paddingVertical: 8,
    alignItems: 'center',

    flexDirection: 'row',
  },
  moneyText: {
    fontWeight: 'bold',
    fontSize: heightToDp('2.6%'),
    color: '#222',
  },
  markPaidText: {
    color: '#222',
    fontSize: heightToDp('2.3%'),
    fontWeight: 'bold',
    // fontFamily: 'Rubik-Regular',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    alignItems: 'center',
  },
  extraDataContainer: {
    paddingTop: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paidOnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  paidText: {
    borderRadius: 10,
    backgroundColor: '#eee',
    color: '#222',
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 8,
    fontSize: 15,
  },
  paid: {
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 12,
  },
});

export default memo(Card);
