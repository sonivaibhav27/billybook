import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {Colors} from './Color';
import {AntDesign} from './Icons';
import SelectionDate from './SelectionDate';
import DatePicker from '@react-native-community/datetimepicker';
const PaymentDate = ({
  totalAmount,
  selectedDate,
  onDateSelection,
  userSelectedDate,
  openDateModal,
  onModalDateSelection,
  payFullAmount,
  amount,
  partlyPaidFunction,
}) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
        zIndex: -10,
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          elevation: 2,
          padding: 15,
          borderRadius: 10,
          zIndex: -1,
        }}>
        <Text
          style={{
            fontFamily: 'OpenSans-Bold',
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
        {openDateModal && (
          <DatePicker
            value={new Date(Date.now())}
            onChange={onModalDateSelection}
          />
        )}
        <View style={{marginTop: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="calendar" color={Colors.primary} size={20} />
            <Text
              style={{
                marginLeft: 10,
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 18,
              }}>
              {userSelectedDate}
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
              isSelected={selectedDate === 'Today'}
              onPress={onDateSelection}
              label={'Today'}
            />
            <SelectionDate
              isSelected={selectedDate === 'Yesterday'}
              onPress={onDateSelection}
              label={'Yesterday'}
            />
            <SelectionDate
              isSelected={selectedDate === 'Select Date'}
              onPress={onDateSelection}
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
                fontSize: 28,
              }}>
              $
            </Text>
            <Text
              style={{
                marginLeft: 10,
                fontFamily: 'OpenSans-SemiBold',
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
              onPress={payFullAmount}
              isFullSelected={amount.length == 0}
              label={'Paid In Full'}
            />
            <Text style={{marginLeft: 10}}>OR</Text>
            <TextInput
              onChangeText={partlyPaidFunction}
              value={amount}
              keyboardType="number-pad"
              placeholder={'Enter Amount'}
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                marginLeft: 10,
                borderBottomColor: '#222',
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
