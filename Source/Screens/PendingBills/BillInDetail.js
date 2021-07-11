import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  UIManager,
  View,
  TouchableNativeFeedback,
  Alert,
} from 'react-native';
import moment from 'moment';
import {Colors} from '../../components/Color';
import Header from '../../components/Header';
import {AntDesign, Entypo} from '../../components/Icons';
import PaymentDate from '../../components/PaymentDate';
import {updateIsPaid} from '../../databases/helper';
import Loading from '../../components/Loading';
import PreviousPaymentHistory from '../../components/PreviousPaymentHistory';
import Button from '../../components/Button';
import ParticularBillClass from './ItemClass';
import {
  deleteBill,
  payBillHelper,
  UnPayBill,
} from '../../databases/realm.helper';
import BillSchema from '../../DB/NewSch';
UIManager.setLayoutAnimationEnabledExperimental(true);

const getFormateDate = momentObject => {
  return momentObject.format('MMMM D,YYYY');
};
const today = new Date(Date.now());
const BillInDetail = ({
  route: {
    params: {item, over, callFromPaid},
  },
  navigation,
}) => {
  const [selected, setSelected] = React.useState('Today');
  const [isOpen, setIsOpen] = React.useState(false);
  const [date, setDate] = React.useState(getFormateDate(moment(today)));
  const [amount, setAmount] = React.useState('');
  const [showPreviousHistory, setShowPreviousHistory] = React.useState(false);
  const [showDone, setShowDone] = React.useState(false);
  const [remainingBalance, setRemainingBalance] = React.useState(0);

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
    const amountToDeductFrom =
      remainingBalance != 0
        ? item.billAmount - remainingBalance
        : item.billAmount;
    if (Number(e) <= amountToDeductFrom) {
      setAmount(e);
    } else {
      setAmount('');
      ToastAndroid.showWithGravityAndOffset(
        'Amount should be less  than  or equal to bill amount ' +
          amountToDeductFrom,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        20,
      );
    }
  };

  // [12,232,432] - billAMount
  const isPaidBill = paidsAmount => {
    return item.billAmount == paidsAmount;
  };
  const onMarkPaidPress = () => {
    const fullOrExactAmount =
      amount != ''
        ? Number(amount)
        : remainingBalance != 0
        ? item.billAmount - remainingBalance
        : item.billAmount;

    const isPaid = isPaidBill(remainingBalance + fullOrExactAmount);
    // alert(isPaid);
    payBillHelper(item, BillSchema, date, fullOrExactAmount, isPaid, () => {
      setDate(moment().format('MMMM D, YYYY'));
      setSelected('Today');
    });
    ToastAndroid.showWithGravityAndOffset(
      'Mark as paid',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      20,
    );
  };

  const closeModal = React.useCallback(() => {
    setShowPreviousHistory(false);
    if (item.paidDates.length >= 0) {
      let remainingBalance = 0;
      item.paidDates.forEach(particularBill => {
        remainingBalance += particularBill.amount;
      });
      setRemainingBalance(remainingBalance);
    }
  }, [item.paidDates]);

  const deleteBillHelper = () => {
    Alert.alert(
      'Delete bill?',
      'Are you sure to delete the bill, this action is not reversible',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            deleteBill(item, BillSchema, () => {
              navigation.pop();
            });
          },
        },
      ],
    );
  };
  React.useEffect(() => {
    if (item.paidDates.length > 0) {
      let remainingBalance = 0;
      item.paidDates.forEach(particularBill => {
        remainingBalance += particularBill.amount;
      });
      setRemainingBalance(remainingBalance);
    }
  }, [item.paidDates]);

  const bill = new ParticularBillClass(item);
  const unpayBill = () => {
    UnPayBill(BillSchema, item);
    navigation.pop();
  };
  return (
    <View style={styles.container}>
      <Header headerText="payment detail " isBackable />
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
        <View
          style={{
            marginTop: 20,
            borderRadius: 10,
            marginHorizontal: 20,
            padding: 15,
            backgroundColor: '#fff',
            elevation: 2,
            borderLeftWidth: 4,
            borderColor: over ? Colors.tomato : Colors.primary,
            marginBottom: 10,
          }}>
          <View style={styles.rowAndCenter}>
            <View>
              <Text style={styles.labelText}>Bill Name</Text>
              <Text mul style={styles.actualTextStyle}>
                {bill.billName}
              </Text>
            </View>
            <View style={{marginRight: 10}}>
              <Text style={styles.labelText}>Type/Categories</Text>
              <Text style={styles.actualTextStyle}> {bill.type}</Text>
            </View>
          </View>
          <View style={styles.bottomBillDetails}>
            <View>
              <Text style={styles.labelText}>Due on</Text>
              <Text style={styles.actualTextStyle}>
                {' '}
                {moment(bill.due, 'YYYYMMDD').format('MMM D, YYYY')}
              </Text>
            </View>
            <View style={styles.billAmountContainer}>
              <Text style={[styles.labelText]}>Bill Amount</Text>
              <Text style={styles.actualTextStyle}>₹ {bill.billAmount}</Text>
            </View>
          </View>
          {bill.remark != null && <View style={styles.remarkSeparatorLine} />}
          {bill.remark != null && (
            <View style={{marginTop: 10}}>
              <Text style={styles.remarkTextStyle}>
                Remark:<Text> {bill.remark}</Text>
              </Text>
            </View>
          )}
        </View>
        {bill.paidDates.length != 0 && (
          <View style={styles.showPreviosPaymentButton}>
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
        )}

        {!callFromPaid && bill.isPaid === false && (
          <PaymentDate
            remainingBalance={item.billAmount - remainingBalance}
            selectedDate={selected}
            onDateSelection={selectDate}
            userSelectedDate={date}
            totalAmount={item.billAmount}
            openDateModal={isOpen}
            onModalDateSelection={onModalDateSelection}
            payFullAmount={payFullAmount}
            amount={amount}
            partlyPaidFunction={partlyPaidFunction}
            lastPaidDates={item.paidDates}
          />
        )}
      </ScrollView>

      {!showDone && bill.isPaid === false && !callFromPaid ? (
        <View
          style={{
            padding: 10,
            backgroundColor: '#eee',
            elevation: 0,
            zIndex: -300,
            flexDirection: 'row',
          }}>
          <Button
            containerStyle={{flex: 1}}
            backgroundColor={Colors.lightTomato}
            textColor={Colors.tomato}
            text="Delete"
            onPress={deleteBillHelper}
            style={{borderRadius: 40, maxWidth: 200}}
          />
          <Button
            containerStyle={{flex: 1}}
            backgroundColor={Colors.primary}
            textColor={'#fff'}
            text="Mark as Paid"
            onPress={onMarkPaidPress}
            style={{borderRadius: 40, flex: 1, maxWidth: 200}}
          />
        </View>
      ) : (
        <Button
          style={{
            borderRadius: 40,
            maxWidth: 250,
            alignSelf: 'center',
            marginBottom: 10,
          }}
          text="Mark as unpaid"
          backgroundColor={Colors.lightTomato}
          textColor={Colors.tomato}
          onPress={unpayBill}
        />
      )}
      {showPreviousHistory && (
        <PreviousPaymentHistory
          item={item}
          data={item.paidDates}
          closeModal={closeModal}
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
  rowAndCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomBillDetails: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billAmountContainer: {
    paddingHorizontal: 15,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    borderRadius: 3,
  },
  remarkSeparatorLine: {
    borderWidth: 0.5,
    marginTop: 5,
    borderColor: '#eee',
  },
  remarkTextStyle: {
    fontStyle: 'italic',
    fontSize: 13,
  },
  showPreviosPaymentButton: {
    marginHorizontal: 20,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 50,
  },
});
export default BillInDetail;
