import * as React from 'react';
import {
  Keyboard,
  NativeModules,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import {createBillInDatabase} from '../../databases/realm.helper';
import DatePicker from '@react-native-community/datetimepicker';
import {Colors} from '../../components/Color';
import {Entypo} from '../../components/Icons';
import FormComponent from '../../components/Form';
import Header from '../../components/Header';
import Button from '../../components/Button';
// import Animated, {
//   Easing,
//   interpolate,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
import {saveToDatabase} from '../../databases/helper';
import BillSchema from '../../DB/NewSch';
import {normalize} from '../../components/TextSize';
import TypeModal from '../../components/TypeModal';
import LoadingIndicator from '../../components/LoadingIndicator';
const nativeModule = NativeModules.MoneyFormat;
export default () => {
  const [billName, setBillName] = React.useState('');
  const [billAmount, setBillAmount] = React.useState('');
  const [billType, setBillType] = React.useState('Others');
  const [billDue, setBillDue] = React.useState(new Date(Date.now()));
  const [datePicker, setDatePicker] = React.useState(false);
  const [billRemark, setBillRemark] = React.useState('');
  const [startCreatingBills, setStartCreatingBills] = React.useState(false);
  const [isCheckBoxChecked, setIsCheckBoxChecked] = React.useState(false);
  const [selectedRepeat, setSelectedRepeat] = React.useState('days');
  const [openModal, setOpenModal] = React.useState(false);
  const [frequencyForHowManyTimes, setFrequencyForHowManyTimes] =
    React.useState('');
  // const _keyBoardSharedValue = useSharedValue(0);

  React.useEffect(() => {
    const removeShowListener = Keyboard.addListener('keyboardDidShow', () => {
      // _keyBoardSharedValue.value = withTiming(1, {
      //   duration: 200,
      //   easing: Easing.inOut(Easing.ease),
      // });
    });
    const removeHideListener = Keyboard.addListener('keyboardDidHide', () => {
      // _keyBoardSharedValue.value = withTiming(0, {
      //   duration: 200,
      //   easing: Easing.inOut(Easing.ease),
      // });
    });

    return () => {
      removeHideListener.remove();
      removeShowListener.remove();
    };
  }, []);

  // const buttonAnimatedStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateY: interpolate(
  //           _keyBoardSharedValue.value,
  //           [0, 1],
  //           [0, btnHeight],
  //         ),
  //       },
  //     ],
  //   };

  // });

  const createBill = () => {
    console.log(billAmount, billName, billType, billDue);

    // saveToDatabase(billName, Number(billAmount), billDue, billRemark, billType);
    // this.setState({showAnimation: false});
    if (!billAmount || !billName || !billType || !billDue) {
      ToastAndroid.showWithGravityAndOffset(
        'Please fill the required field',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        100,
      );
      return;
    }
    setStartCreatingBills(true);
    createBillInDatabase(
      billName,
      billAmount,
      billDue,
      billRemark,
      billType,
      {count: 20},
      BillSchema,
    ).then(() => {
      setStartCreatingBills(false);
      alert('Done');
    });
  };

  const setType = React.useCallback(item => {
    setBillType(item);
  });

  const onCheckBoxPress = () => {
    setIsCheckBoxChecked(checkbox => !checkbox);
  };

  return (
    <View style={styles.container}>
      <Header headerText="Create Bill" isBackable />

      <ScrollView style={styles.scrollContainer}>
        {/* Bill Name */}
        <FormComponent
          value={billName}
          onChangeText={e => {
            setBillName(e);
          }}
          // maxLength={15}
          label="Bill Name"
          isCompulsoryField
        />
        {/* Bill Type */}
        <FormComponent
          value={billType}
          onChangeText={e => {
            setBillType(e);
          }}
          // maxLength
          label="Type"
          isCompulsoryField
          onPress={() => {
            setOpenModal(open => !open);
          }}
        />

        <FormComponent
          value={billAmount}
          onChangeText={e => {
            setBillAmount(e);
          }}
          // maxLength
          keyboardType="number-pad"
          label="Amount"
          isCompulsoryField
          maxLength={10}
          onEndEditing={() => {}}
        />
        <FormComponent
          value={moment(billDue).format('MMM D, YYYY')}
          // onChangeText={e => {
          //   this.setState({remark: e});
          // }}
          // maxLength
          label="Due on"
          date
          onPress={() => {
            setDatePicker(true);
          }}
          isCompulsoryField
        />
        <TouchableOpacity
          hitSlop={{
            left: 10,
            right: 10,
            bottom: 10,
            top: 10,
          }}
          activeOpacity={0.9}
          onPress={onCheckBoxPress}
          style={styles.checkBoxContainer}>
          <View
            style={[
              styles.checboxInnerContainer,
              {
                backgroundColor: isCheckBoxChecked
                  ? Colors.primary
                  : 'transparent',
                borderWidth: isCheckBoxChecked ? 0 : 1,
              },
            ]}>
            {isCheckBoxChecked && (
              <Entypo name="check" size={12} color={'white'} />
            )}
          </View>
          <Text style={styles.repeatText}>Repeat</Text>
        </TouchableOpacity>
        {isCheckBoxChecked && (
          <View
            style={{
              marginHorizontal: 20,
              marginBottom: 20,
              flexDirection: 'row',
            }}>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: Colors.primary,
                marginLeft: 5,
                borderRadius: 20,
                alignSelf: 'stretch',
              }}
            />
            <View
              style={{
                paddingVertical: 5,
                paddingHorizontal: 6,
                backgroundColor: '#fff',
                elevation: 1,
                borderRadius: 8,
                marginTop: 10,
                flex: 1,
                marginLeft: 10,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#666',
                  // fontFamily: 'Raleway-SemiBold',
                  letterSpacing: 0.8,
                  paddingVertical: 8,
                }}>
                Frequency
              </Text>
              <View
                style={{
                  borderWidth: 0.8,
                  borderColor: '#eee',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{}}>Every</Text>
                  <TextInput
                    textAlignVertical="top"
                    keyboardType="number-pad"
                    style={{
                      marginLeft: 5,
                      height: 40,
                      width: 40,
                      textAlign: 'center',
                      borderBottomWidth: 1,
                    }}
                    defaultValue="1"
                    maxLength={3}
                  />
                </View>
                <Picker
                  mode="dropdown"
                  style={{marginLeft: 20, width: 150, padding: 0}}
                  selectedValue={selectedRepeat}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedRepeat(itemValue)
                  }>
                  <Picker.Item
                    fontFamily="Raleway-SemiBold"
                    value="day"
                    label="day(s)"
                  />
                  <Picker.Item
                    fontFamily="Raleway-SemiBold"
                    value="week"
                    label="week(s)"
                  />
                  <Picker.Item
                    fontFamily="Raleway-SemiBold"
                    value="month"
                    label="month(s)"
                  />
                  <Picker.Item
                    fontFamily="Raleway-SemiBold"
                    value="year"
                    label="year(s)"
                  />
                </Picker>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  alignItems: 'center',
                }}>
                {/* <Text>Hello</Text> */}
                <Text>For</Text>
                <TextInput
                  value={frequencyForHowManyTimes}
                  onChangeText={e => {
                    if (e.length == 1 && Number(e) >= 2) {
                      ToastAndroid.showWithGravityAndOffset(
                        'Number should betweeen 1 and 12',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        0,
                        20,
                      );
                    } else if (Number(e) >= 12) {
                      ToastAndroid.showWithGravityAndOffset(
                        'Number should betweeen 1 and 12',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        0,
                        20,
                      );
                      setFrequencyForHowManyTimes('');
                    } else {
                      setFrequencyForHowManyTimes(e);
                    }
                  }}
                  textAlignVertical="top"
                  keyboardType="number-pad"
                  style={{
                    marginLeft: 5,
                    height: 40,
                    width: 40,
                    textAlign: 'center',
                    borderBottomWidth: 1,
                  }}
                  defaultValue={'1'}
                  maxLength={2}
                />
                <Text style={{marginLeft: 10, textTransform: 'capitalize'}}>
                  {selectedRepeat}
                </Text>
              </View>
            </View>
          </View>
        )}
        <FormComponent
          value={billRemark}
          onChangeText={e => {
            setBillRemark(e);
          }}
          maxLength={50}
          label="Remark"
        />
      </ScrollView>

      {datePicker && (
        <DatePicker
          value={billDue}
          onChange={(e, i) => {
            setDatePicker(false);
            setBillDue(i || billDue);
          }}
        />
      )}

      <View style={[styles.btnContainer]}>
        <Button
          onPress={createBill}
          backgroundColor={Colors.primary}
          textColor={'#fff'}
          text="Create Bill"
          containerStyle={{width: 250, alignSelf: 'center'}}
        />
      </View>
      {openModal && (
        <TypeModal
          closeModal={() => {
            setOpenModal(false);
          }}
          setType={setType}
          style={{
            top: 20,
            bottom: 20,
          }}
        />
      )}
      {startCreatingBills && (
        <LoadingIndicator title={`Creating Bill,${'\n'} Please wait...`} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  scrollContainer: {
    marginTop: 10,
    flex: 1,
  },
  btnContainer: {
    paddingVertical: 5,
    elevation: 2,
    backgroundColor: '#fff',
  },
  checkBoxContainer: {
    marginHorizontal: 20,
    // marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checboxInnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 15,
    width: 15,
    borderWidth: 0.5,
  },
  repeatText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
});
