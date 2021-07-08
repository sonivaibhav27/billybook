import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  UIManager,
  View,
  TouchableNativeFeedback,
  Animated,
} from 'react-native';
import moment from 'moment';
import {Colors} from '../../components/Color';
import Header from '../../components/Header';
import {AntDesign, Entypo} from '../../components/Icons';
import PaymentDate from '../../components/PaymentDate';
import {updateIsPaid} from '../../databases/helper';
import Loading from '../../components/Loading';
import PreviousPaymentHistory from '../../components/PreviousPaymentHistory';
import {Easing} from 'react-native-reanimated';
import Button from '../../components/Button';
import ParticularBillClass from './ItemClass';
import {ParticularBillScreen} from '..';
UIManager.setLayoutAnimationEnabledExperimental(true);

const getFormateDate = momentObject => {
  return momentObject.format('MMMM D,YYYY');
};
const today = new Date(Date.now());
const BillInDetail = ({
  route: {
    params: {item, over, callFromPaid},
  },
}) => {
  const [selected, setSelected] = React.useState('Today');
  const [isOpen, setIsOpen] = React.useState(false);
  const [date, setDate] = React.useState(getFormateDate(moment(today)));
  const [amount, setAmount] = React.useState('');
  const [showPreviousHistory, setShowPreviousHistory] = React.useState(false);
  const [showDone, setShowDone] = React.useState(false);

  const toggleShowPayHistory = () => {
    setShowPreviousHistory(a => !a);
  };
  const selectDate = React.useCallback(select => {
    if (select == 'Select Date') {
      setIsOpen(true);
    } else if (select == 'Yesterday') {
      setDate(moment(today).subtract(1, 'days').format('MMMM D, YYYY'));
    } else {
      setDate(moment(today).format('MMM D, YYYY'));
    }
    setSelected(select);
  }, []);

  const onModalDateSelection = React.useCallback((e, s) => {
    const a = s || today;
    setIsOpen(false);
    setDate(moment(a).format('MMMM D, YYYY'));
  }, []);

  const payFullAmount = React.useCallback(() => {
    setAmount('');
  }, []);

  const partlyPaidFunction = e => {
    if (Number(e) <= item.billAmount) {
      setAmount(e);
      // setAmountExceedError(false);
    } else {
      setAmount('');
      // setAmountExceedError(true);

      ToastAndroid.showWithGravityAndOffset(
        'Amount should be less than bill amount ' + item.billAmount,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        20,
      );
    }
  };

  const onMarkPaidPress = () => {
    const data = JSON.stringify({
      amount: amount === '' ? item.billAmount : amount,
      name: item.billName,
      date: date,
    });
    alert(data);
  };

  const closeModal = React.useCallback(() => {
    setShowPreviousHistory(false);
  }, []);

  const bill = new ParticularBillClass(item);
  return (
    <View style={[styles.container]}>
      <Header headerText="payment detail " isBackable />
      <ScrollView
        style={{
          flex: 1,
          // marginBottom: 75,
        }}
        contentContainerStyle={{}}>
        <View
          style={{
            marginTop: 20,
            borderRadius: 10,
            marginHorizontal: 20,
            padding: 15,
            // backgroundColor: userPaid ? '#c5fad5' : 'rgba(243, 83, 105, 0.2)',
            // elevation: 1,
            backgroundColor: '#fff',
            elevation: 2,
            borderLeftWidth: 4,
            borderColor: over ? Colors.tomato : Colors.primary,
            marginBottom: 10,
          }}>
          {/* <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              backgroundColor: 'white',
              // zIndex: -4,
              // elevation: 5,
            }}
          /> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={styles.labelText}>Bill Name</Text>
              <Text mul style={styles.actualTextStyle}>
                {bill.billName}
              </Text>
            </View>
            <View style={{marginRight: 10}}>
              <Text style={[styles.labelText, {}]}>Type/Categories</Text>
              <Text style={styles.actualTextStyle}> {bill.type}</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{}}>
              <Text style={styles.labelText}>Due on</Text>
              <Text style={styles.actualTextStyle}>
                {' '}
                {moment(bill.due, 'YYYYMMDD').format('MMM D, YYYY')}
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 15,
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-start',
                paddingVertical: 6,
                borderRadius: 3,
                // elevation: 0.3,
              }}>
              <Text style={[styles.labelText]}>Bill Amount</Text>
              <Text style={styles.actualTextStyle}>₹ {bill.billAmount}</Text>
            </View>
          </View>
          {bill.remark != null && (
            <View
              style={{
                borderWidth: 0.5,
                marginTop: 5,
                borderColor: '#eee',
              }}
            />
          )}
          {bill.remark != null && (
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  fontStyle: 'italic',
                  fontSize: 13,
                }}>
                Remark:<Text> {bill.remark}</Text>
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: '#eee',
            padding: 10,
            borderRadius: 50,
            // overflow: 'hidden',
          }}>
          <TouchableNativeFeedback
            style={{flex: 1}}
            // background={TouchableNativeFeedback.Ripple('#000', true)}
            onPress={toggleShowPayHistory}>
            <Text
              style={{
                fontFamily: 'OpenSans-Bold',
                color: '#333',
                textAlign: 'center',
              }}>
              {showPreviousHistory ? 'Hide' : 'Show'} earlier payments{' '}
              <Entypo name="chevron-right" />
            </Text>
          </TouchableNativeFeedback>
        </View>

        {!callFromPaid && bill.isPaid === false && (
          <PaymentDate
            selectedDate={selected}
            onDateSelection={selectDate}
            userSelectedDate={date}
            totalAmount={item.billAmount}
            openDateModal={isOpen}
            onModalDateSelection={onModalDateSelection}
            payFullAmount={payFullAmount}
            amount={amount}
            partlyPaidFunction={partlyPaidFunction}
          />
        )}
      </ScrollView>

      {!showDone && bill.isPaid === false && !callFromPaid && (
        <View
          style={{
            padding: 10,
            backgroundColor: '#eee',
            elevation: 0,
            zIndex: -300,
            flexDirection: 'row',
          }}>
          <Button
            backgroundColor={Colors.lightTomato}
            textColor={Colors.tomato}
            text="Delete"
            style={{borderRadius: 40, maxWidth: 200}}
          />
          <Button
            backgroundColor={Colors.primary}
            textColor={'#fff'}
            text="Mark as Paid"
            style={{borderRadius: 40, flex: 1, maxWidth: 200}}
          />
        </View>
      )}
      {item.isPaid === false && showPreviousHistory && (
        <PreviousPaymentHistory closeModal={closeModal} />
      )}
      {showDone && (
        <Loading
          closed={() => {
            setShowDone(false);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.backgroundColor},
  labelText: {
    fontSize: 12,
    color: '#777',
    // fontFamily: 'Raleway-Regular',
  },
  actualTextStyle: {
    fontSize: 18,
    maxWidth: 150,
    marginLeft: 2,
    // fontFamily: 'Raleway-SemiBold',
    // fontWeight: '700',
    letterSpacing: 0.3,
    color: '#111',
    fontWeight: '900',
    // textAlign: 'center',
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
    paddingHorizontal: 15,
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
export default BillInDetail;
