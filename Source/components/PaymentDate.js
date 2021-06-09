import React from 'react';
import {Keyboard, Text, TextInput, ToastAndroid, View} from 'react-native';
import {Colors} from './Color';
import {AntDesign} from './Icons';
import SelectionDate from './SelectionDate';
import moment from 'moment';
import DatePicker from '@react-native-community/datetimepicker';
const today = new Date(Date.now());
const PaymentDate = ({totalAmount}) => {
  const [selected, setSelected] = React.useState('Today');
  const [isOpen, setIsOpen] = React.useState(false);
  const [date, setDate] = React.useState(moment(today).format('MMM D, YYYY'));
  const [amountExceedError, setAmountExceedError] = React.useState(false);
  const [amount, setAmount] = React.useState('');
  const selectDate = select => {
    if (select == 'Select Date') {
      setIsOpen(true);
    } else if (select == 'Yesterday') {
      setDate(moment(today).subtract(1, 'days').format('MMMM D, YYYY'));
    } else {
      setDate(moment(today).format('MMM D, YYYY'));
    }
    setSelected(select);
  };

  // const getDate = () => {
  //   if (selected == 'Today') {
  //     return;
  //   } else if (selected == 'Yesterday') {
  //     console.log('Inside');
  //     return;
  //   } else {
  //   }
  // };

  const onChange = (e, s) => {
    const a = s || today;
    setIsOpen(false);
    setDate(moment(a).format('MMMM D, YYYY'));
  };
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          elevation: 2,
          padding: 15,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontFamily: 'Raleway-Bold',
          }}>
          Payment Details
        </Text>
        <View
          style={{
            borderWidth: 0.5,
            marginTop: 5,
            borderColor: '#eee',
          }}
        />
        {isOpen && (
          <DatePicker value={new Date(Date.now())} onChange={onChange} />
        )}
        <View style={{marginTop: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="calendar" color={Colors.primary} size={20} />
            <Text
              style={{
                marginLeft: 10,
                fontFamily: 'Raleway-SemiBold',
                fontSize: 18,
              }}>
              {date}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 0.5,
              marginTop: 5,
              borderColor: '#eee',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-evenly',
            }}>
            <SelectionDate
              isSelected={selected === 'Today'}
              onPress={selectDate}
              label={'Today'}
            />
            <SelectionDate
              isSelected={selected === 'Yesterday'}
              onPress={selectDate}
              label={'Yesterday'}
            />
            <SelectionDate
              isSelected={selected === 'Select Date'}
              onPress={selectDate}
              label={'Select Date'}
            />
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.primary,
              }}>
              Amount
            </Text>
            <Text
              style={{
                marginLeft: 10,
                fontFamily: 'Raleway-SemiBold',
                fontSize: 18,
              }}>
              {amount.length == 0 ? totalAmount : amount}
            </Text>
          </View>

          <View
            style={{
              borderWidth: 0.5,
              marginTop: 5,
              borderColor: '#eee',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
            }}>
            <SelectionDate
              onPress={() => {
                setAmount('');
              }}
              isFullSelected={amount.length == 0}
              label={'Paid In Full'}
            />
            <Text style={{marginLeft: 10}}>OR</Text>
            <TextInput
              onFocus={() => {}}
              focusable={!amountExceedError}
              onChangeText={e => {
                if (Number(e) <= totalAmount) {
                  setAmount(e);
                  setAmountExceedError(false);
                } else {
                  setAmount('');
                  setAmountExceedError(true);

                  ToastAndroid.showWithGravityAndOffset(
                    'Amount should be less than bill amount ' + totalAmount,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    0,
                    20,
                  );
                }
              }}
              // onStartEditing={() => {
              //   setIsFullSelected(false);
              // }}
              // onEndEditing={() => {
              //   if (amount.length == 0) {
              //     setIsFullSelected(true);
              //   }
              // }}
              value={amount}
              keyboardType="number-pad"
              placeholder={'Enter Amount'}
              // placeholderTextColor={amountExceedError ? Colors.tomato : '#888'}
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                marginLeft: 10,
                borderBottomColor: amountExceedError ? Colors.tomato : '#777',
                textAlign: 'center',
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentDate;
